#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const { buildDraftFromTopic } = require('../src/lib/aiBotDraft');
const { normalizeBlocks, blocksToPlainText } = require('../src/lib/contentBlocks');
const { loadLocalEnv } = require('./load-env');

loadLocalEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

function safeJsonParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function generateDraftWithAI({ topic, tone, length, category }) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4.1';

  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY (required for AI generation)');
  }

  const prompt = `Generate a Traditional Chinese (zh-HK) blog draft as JSON only.

Topic: ${topic}
Tone: ${tone || 'professional'}
Length: ${length || 'medium'}
Category: ${category || 'ai'}

Return strictly valid JSON with fields:
- title (string)
- description (string)
- category (string)
- blocks (array of content blocks: heading/paragraph/link/code)

Rules:
- Use Traditional Chinese, Hong Kong style writing.
- Include practical steps and examples.
- Keep content professional and useful.
- No markdown fences, no extra commentary.`;

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are a professional SEO content writer.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`OpenAI error ${resp.status}: ${text.slice(0, 300)}`);
  }

  const data = await resp.json();
  const raw = data?.choices?.[0]?.message?.content || '{}';
  const parsed = safeJsonParse(raw);

  if (!parsed || !parsed.title) {
    throw new Error('AI response parse failed');
  }

  const blocks = normalizeBlocks(Array.isArray(parsed.blocks) ? parsed.blocks : []);

  return {
    title: String(parsed.title).trim(),
    description: String(parsed.description || '').trim(),
    category: String(parsed.category || category || 'ai').trim(),
    blocks,
    content: blocksToPlainText(blocks),
  };
}

async function processOne() {
  const nowIso = new Date().toISOString();
  const { data: item, error } = await supabase
    .from('ai_blog_queue')
    .select('*')
    .eq('status', 'pending')
    .or(`scheduled_at.is.null,scheduled_at.lte.${nowIso}`)
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  if (error || !item) {
    console.log('[ai-bot] no pending jobs');
    return false;
  }

  await supabase.from('ai_blog_queue').update({ status: 'processing' }).eq('id', item.id);

  try {
    let draft;

    try {
      draft = await generateDraftWithAI({
        topic: item.topic,
        tone: item.tone,
        length: item.length,
        category: item.category,
      });
    } catch (aiErr) {
      if (!process.argv.includes('--fallback-template')) {
        throw aiErr;
      }

      console.warn('[ai-bot] AI generation failed, fallback to template:', aiErr.message || aiErr);
      draft = buildDraftFromTopic({
        topic: item.topic,
        tone: item.tone,
        length: item.length,
        category: item.category,
      });
    }

    const { data: submission, error: insertErr } = await supabase
      .from('writer_submissions')
      .insert({
        title: draft.title,
        category: draft.category,
        content: draft.content,
        content_blocks: draft.blocks,
        status: 'pending_review',
        author_email: 'ai-bot@simpleinfo.local',
      })
      .select('id,title')
      .single();

    if (insertErr) throw insertErr;

    await supabase
      .from('ai_blog_queue')
      .update({ status: 'done', generated_submission_id: submission.id, processed_at: new Date().toISOString() })
      .eq('id', item.id);

    console.log(`[ai-bot] done queue=${item.id} submission=${submission.id}`);
    return true;
  } catch (e) {
    await supabase
      .from('ai_blog_queue')
      .update({ status: 'failed', error_message: String(e.message || e), processed_at: new Date().toISOString() })
      .eq('id', item.id);

    console.error('[ai-bot] failed', e.message || e);
    return false;
  }
}

function arg(name, fallback = '') {
  const index = process.argv.findIndex((a) => a === `--${name}`);
  if (index < 0) return fallback;
  return process.argv[index + 1] || fallback;
}

async function main() {
  const isLoop = process.argv.includes('--loop');
  const intervalMs = Math.max(5_000, Number(arg('interval', '60000')) || 60_000);

  if (!isLoop) {
    await processOne();
    return;
  }

  console.log(`[ai-bot] loop mode started (interval=${intervalMs}ms, model=${process.env.OPENAI_MODEL || 'gpt-4.1'})`);
  while (true) {
    await processOne();
    await new Promise((r) => setTimeout(r, intervalMs));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
