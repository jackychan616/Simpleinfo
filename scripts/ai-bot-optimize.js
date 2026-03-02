#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
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

function arg(name, fallback = '') {
  const idx = process.argv.findIndex((a) => a === `--${name}`);
  if (idx < 0) return fallback;
  return process.argv[idx + 1] || fallback;
}

function safeJsonParse(raw) {
  try { return JSON.parse(raw); } catch { return null; }
}

async function callModel(messages, responseFormat = true) {
  const provider = (process.env.AI_PROVIDER || 'github').toLowerCase();

  if (provider === 'ollama') {
    const { Ollama } = await import('ollama');
    const host = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const model = process.env.OLLAMA_MODEL || 'gpt-oss';
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
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ model, temperature: 0.7, response_format: responseFormat ? { type: 'json_object' } : undefined, messages }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`GitHub Models error ${resp.status}: ${text.slice(0, 300)}`);
  }

  const data = await resp.json();
  return String(data?.choices?.[0]?.message?.content || '{}');
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

async function optimizeWithAI({ title, content, comment }) {
  const prompt = `You are editing a blog post based on reviewer comments. Return strict JSON only with keys: title, blocks, content.\n\nCurrent title: ${title}\nCurrent content:\n${content}\n\nReviewer comment:\n${comment}\n\nRequirements:\n- Traditional Chinese (Hong Kong style)\n- Human-like writing voice\n- Keep practical and concrete\n- Return at least 1 H2 and 2 H3 headings\n- Return at least 6 non-empty blocks`;
  const raw = await callModel([
    { role: 'system', content: 'You are a senior content editor.' },
    { role: 'user', content: prompt },
  ], true);

  const parsed = safeJsonParse(raw);
  if (!parsed) return null;

  let blocks = normalizeBlocks(Array.isArray(parsed.blocks) ? parsed.blocks : []);
  if (!blocks.length && parsed.content) blocks = normalizeBlocks(contentToBlocks(String(parsed.content)));
  blocks = ensureHeadingStructure(blocks, parsed.title || title || '文章重點');
  const finalContent = (blocksToPlainText(blocks) || String(parsed.content || '')).trim();
  const minChars = Math.max(300, Number(process.env.AI_BOT_MIN_CONTENT_CHARS || 700));
  if (!finalContent || finalContent.length < minChars) return null;

  return {
    title: String(parsed.title || title || '').trim(),
    blocks: blocks.length ? blocks : normalizeBlocks(contentToBlocks(finalContent)),
    content: finalContent,
  };
}

async function optimizeOne({ submissionId, comment }) {
  const { data: row, error: rowErr } = await supabase
    .from('writer_submissions')
    .select('id,title,content')
    .eq('id', submissionId)
    .single();

  if (rowErr || !row) throw new Error(rowErr?.message || 'Submission not found');

  let draft = null;
  for (let i = 0; i < 2; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    draft = await optimizeWithAI({ title: row.title, content: row.content, comment });
    if (draft?.blocks?.length) break;
  }

  if (!draft?.blocks?.length) throw new Error('AI optimize returned invalid/short content after retry');

  const { data: updated, error: upErr } = await supabase
    .from('writer_submissions')
    .update({ title: draft.title, content: draft.content, content_blocks: draft.blocks })
    .eq('id', submissionId)
    .select('id,title,updated_at')
    .single();

  if (upErr) throw upErr;
  console.log('[ai-optimize] done', updated.id, updated.title);
}

async function processQueueOne() {
  const { data: job, error } = await supabase
    .from('ai_optimize_queue')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  if (error || !job) {
    console.log('[ai-optimize] no pending jobs');
    return false;
  }

  await supabase.from('ai_optimize_queue').update({ status: 'processing' }).eq('id', job.id);

  try {
    await optimizeOne({ submissionId: job.submission_id, comment: job.comment });
    await supabase.from('ai_optimize_queue').update({ status: 'done', processed_at: new Date().toISOString() }).eq('id', job.id);
    return true;
  } catch (e) {
    await supabase
      .from('ai_optimize_queue')
      .update({ status: 'failed', error_message: String(e.message || e), processed_at: new Date().toISOString() })
      .eq('id', job.id);
    console.error('[ai-optimize] failed', e.message || e);
    return false;
  }
}

async function main() {
  const submissionId = arg('submissionId');
  const comment = arg('comment');
  const isLoop = process.argv.includes('--loop');
  const intervalMs = Math.max(5000, Number(arg('interval', '15000')) || 15000);

  if (submissionId && comment) {
    await optimizeOne({ submissionId, comment });
    return;
  }

  if (!isLoop) {
    await processQueueOne();
    return;
  }

  console.log(`[ai-optimize] loop mode started (interval=${intervalMs}ms)`);
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    await processQueueOne();
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, intervalMs));
  }
}

main().catch((e) => {
  console.error('[ai-optimize] failed', e.message || e);
  process.exit(1);
});
