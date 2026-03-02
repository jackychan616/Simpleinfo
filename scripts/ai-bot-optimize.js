#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const { normalizeBlocks, blocksToPlainText, contentToBlocks } = require('../src/lib/contentBlocks');
const { loadLocalEnv } = require('./load-env');

loadLocalEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const token = process.env.GITHUB_TOKEN;
const model = process.env.GITHUB_MODEL || 'gpt-4.1';

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}
if (!token) {
  console.error('Missing GITHUB_TOKEN');
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

async function optimizeWithGitHubModels({ title, content, comment }) {
  const prompt = `You are editing a blog post based on reviewer comments. Return strict JSON only with keys: title, blocks.\n\nCurrent title: ${title}\nCurrent content:\n${content}\n\nReviewer comment:\n${comment}\n\nRequirements:\n- Traditional Chinese (Hong Kong style)\n- Human-like writing voice\n- Keep practical and concrete\n- Return at least 6 non-empty blocks`; 

  const resp = await fetch('https://models.inference.ai.azure.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are a senior content editor.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`GitHub Models error ${resp.status}: ${text.slice(0, 300)}`);
  }

  const data = await resp.json();
  const parsed = safeJsonParse(data?.choices?.[0]?.message?.content || '{}');
  if (!parsed) return null;

  let blocks = normalizeBlocks(Array.isArray(parsed.blocks) ? parsed.blocks : []);
  if (!blocks.length && parsed.content) {
    blocks = normalizeBlocks(contentToBlocks(String(parsed.content)));
  }
  if (!blocks.length) return null;

  return {
    title: String(parsed.title || title || '').trim(),
    blocks,
    content: blocksToPlainText(blocks),
  };
}

async function main() {
  const submissionId = arg('submissionId');
  const comment = arg('comment');
  if (!submissionId || !comment) {
    console.error('Usage: npm run ai:bot:optimize -- --submissionId <id> --comment "your review"');
    process.exit(1);
  }

  const { data: row, error: rowErr } = await supabase
    .from('writer_submissions')
    .select('id,title,content')
    .eq('id', submissionId)
    .single();

  if (rowErr || !row) throw new Error(rowErr?.message || 'Submission not found');

  let draft = null;
  for (let i = 0; i < 2; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    draft = await optimizeWithGitHubModels({ title: row.title, content: row.content, comment });
    if (draft?.blocks?.length) break;
  }

  if (!draft?.blocks?.length) throw new Error('AI optimize returned empty blocks after retry');

  const { data: updated, error: upErr } = await supabase
    .from('writer_submissions')
    .update({
      title: draft.title,
      content: draft.content,
      content_blocks: draft.blocks,
    })
    .eq('id', submissionId)
    .select('id,title,updated_at')
    .single();

  if (upErr) throw upErr;

  console.log('[ai-optimize] done', updated.id, updated.title);
}

main().catch((e) => {
  console.error('[ai-optimize] failed', e.message || e);
  process.exit(1);
});
