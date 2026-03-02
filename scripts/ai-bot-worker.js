#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const { buildDraftFromTopic } = require('../src/lib/aiBotDraft');
const { normalizeBlocks, blocksToPlainText, contentToBlocks } = require('../src/lib/contentBlocks');
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
  try { return JSON.parse(raw); } catch { return null; }
}

function ensureHeadingStructure(blocks = [], fallbackTitle = '重點整理') {
  const normalized = normalizeBlocks(blocks);
  const hasHeading = normalized.some((b) => b.type === 'heading');
  if (hasHeading) return normalized;

  const paragraphs = normalized.filter((b) => b.type === 'paragraph' && String(b.text || '').trim());
  if (!paragraphs.length) return normalized;

  const next = [];
  next.push({ type: 'heading', level: 2, text: String(fallbackTitle || '重點整理') });
  paragraphs.forEach((p, i) => {
    if (i > 0 && i % 3 === 0) {
      next.push({ type: 'heading', level: 3, text: `重點段落 ${Math.floor(i / 3) + 1}` });
    }
    next.push(p);
  });
  return normalizeBlocks(next);
}

function toValidDraft(parsed, fallback = {}) {
  if (!parsed) return null;
  let blocks = normalizeBlocks(Array.isArray(parsed.blocks) ? parsed.blocks : []);
  if (!blocks.length && parsed.content) blocks = normalizeBlocks(contentToBlocks(String(parsed.content)));
  blocks = ensureHeadingStructure(blocks, parsed.title || fallback.title || '文章重點');
  const content = (blocksToPlainText(blocks) || String(parsed.content || '')).trim();
  const minChars = Math.max(300, Number(process.env.AI_BOT_MIN_CONTENT_CHARS || 700));
  if (!content || content.length < minChars) return null;
  if (!String(parsed.title || fallback.title || '').trim()) return null;
  return {
    title: String(parsed.title || fallback.title).trim(),
    description: String(parsed.description || '').trim(),
    category: String(parsed.category || fallback.category || 'ai').trim(),
    blocks: blocks.length ? blocks : normalizeBlocks(contentToBlocks(content)),
    content,
  };
}

async function callModel(messages, responseFormat = true) {
  const provider = (process.env.AI_PROVIDER || 'github').toLowerCase();

  if (provider === 'ollama') {
    const { Ollama } = await import('ollama');
    const host = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const model = process.env.OLLAMA_MODEL || 'gpt-oss:120b';
    const apiKey = process.env.OLLAMA_API_KEY || '';

    const ollama = new Ollama({
      host,
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : undefined,
    });

    const response = await ollama.chat({
      model,
      messages,
      stream: false,
      format: responseFormat ? 'json' : undefined,
    });

    return String(response?.message?.content || '{}');
  }

  const token = process.env.GITHUB_TOKEN;
  const model = process.env.GITHUB_MODEL || 'gpt-4.1';
  if (!token) throw new Error('Missing GITHUB_TOKEN');

  const resp = await fetch('https://models.inference.ai.azure.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: responseFormat ? { type: 'json_object' } : undefined,
      messages,
    }),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`GitHub Models error ${resp.status}: ${text.slice(0, 300)}`);
  }
  const data = await resp.json();
  return String(data?.choices?.[0]?.message?.content || '{}');
}

async function fetchWebContext(topic) {
  if (String(process.env.AI_BOT_WEB_SEARCH || '').toLowerCase() !== '1') return '';

  const braveKey = process.env.BRAVE_API_KEY;
  if (!braveKey) return '';

  try {
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(topic)}&count=5&search_lang=zh&country=HK`;
    const resp = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'X-Subscription-Token': braveKey,
      },
    });

    if (!resp.ok) return '';
    const data = await resp.json();
    const items = (data?.web?.results || []).slice(0, 5).map((r, i) => `${i + 1}. ${r.title}\n${r.description || ''}\n${r.url}`).join('\n\n');
    return items ? `\n\nWeb references (latest search):\n${items}` : '';
  } catch {
    return '';
  }
}

async function generateDraftWithAI({ topic, tone, length, category }) {
  const webContext = await fetchWebContext(topic);
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
- content (optional string)

Rules:
- Use Traditional Chinese, Hong Kong style writing.
- Include practical steps and examples.
- Keep content professional and useful.
- If web references are provided, use them as context and avoid making up facts.${webContext}`;

  const raw = await callModel([
    { role: 'system', content: 'You are a professional SEO content writer.' },
    { role: 'user', content: prompt },
  ], true);

  const parsed = safeJsonParse(raw);
  const draft = toValidDraft(parsed, { title: topic, category });
  if (!draft) throw new Error('AI produced invalid/short content');
  return draft;
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
    let lastError = null;
    for (let i = 0; i < 2; i += 1) {
      try {
        // eslint-disable-next-line no-await-in-loop
        draft = await generateDraftWithAI({ topic: item.topic, tone: item.tone, length: item.length, category: item.category });
        break;
      } catch (aiErr) {
        lastError = aiErr;
      }
    }

    if (!draft) {
      if (!process.argv.includes('--fallback-template')) throw lastError || new Error('AI generation failed');
      console.warn('[ai-bot] AI generation failed, fallback to template:', lastError?.message || lastError);
      draft = buildDraftFromTopic({ topic: item.topic, tone: item.tone, length: item.length, category: item.category });
    }

    const minChars = Math.max(300, Number(process.env.AI_BOT_MIN_CONTENT_CHARS || 700));
    if (!String(draft.content || '').trim() || String(draft.content || '').trim().length < minChars) {
      throw new Error(`Generated content below quality threshold (${minChars})`);
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
  const provider = (process.env.AI_PROVIDER || 'github').toLowerCase();

  if (!isLoop) {
    await processOne();
    return;
  }

  console.log(`[ai-bot] loop mode started (interval=${intervalMs}ms, provider=${provider})`);
  while (true) {
    await processOne();
    await new Promise((r) => setTimeout(r, intervalMs));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
