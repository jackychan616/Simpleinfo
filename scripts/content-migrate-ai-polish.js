#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const { normalizeBlocks, blocksToPlainText, contentToBlocks } = require('../src/lib/contentBlocks');
const { loadLocalEnv } = require('./load-env');

loadLocalEnv();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function safeJsonParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function callOllama(messages) {
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
    format: 'json',
  });

  return String(response?.message?.content || '{}');
}

async function polishOne(row) {
  const prompt = `Rewrite and polish this legacy blog content into a professional, clear Traditional Chinese (Hong Kong style) article.

Title: ${row.title}
Category: ${row.category || 'tech'}
Legacy content:
${String(row.content || '').slice(0, 12000)}

Return STRICT JSON with:
- title: string
- blocks: array (heading/paragraph/link/code/list/table)
- content: optional string

Rules:
- Must include at least 1 H2 and 2 H3 headings.
- Must be practical and easy to read.
- No JSX, no source code wrappers, no markdown fences.
- Keep factual tone, remove template noise.`;

  const raw = await callOllama([
    { role: 'system', content: 'You are a senior Chinese tech editor.' },
    { role: 'user', content: prompt },
  ]);

  const parsed = safeJsonParse(raw);
  if (!parsed) throw new Error('AI JSON parse failed');

  let blocks = normalizeBlocks(Array.isArray(parsed.blocks) ? parsed.blocks : []);
  if (!blocks.length && parsed.content) blocks = normalizeBlocks(contentToBlocks(String(parsed.content)));
  const content = (blocksToPlainText(blocks) || String(parsed.content || '')).trim();

  if (!blocks.length || content.length < 600) {
    throw new Error('AI output below quality threshold');
  }

  const nextTitle = String(parsed.title || row.title || '').trim() || row.title;

  const { error } = await supabase
    .from('writer_submissions')
    .update({
      title: nextTitle,
      content,
      content_blocks: blocks,
    })
    .eq('id', row.id);

  if (error) throw new Error(error.message);
}

async function main() {
  const limit = Math.max(1, Number(process.argv.includes('--limit') ? process.argv[process.argv.indexOf('--limit') + 1] : 20));

  const { data, error } = await supabase
    .from('writer_submissions')
    .select('id,title,category,content,content_blocks,author_email,source_slug,created_at')
    .eq('author_email', 'migration@simpleinfo.local')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  let ok = 0;
  let fail = 0;

  for (const row of data || []) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await polishOne(row);
      ok += 1;
      console.log('[ai-polish:ok]', row.id, row.source_slug || '-');
    } catch (e) {
      fail += 1;
      console.log('[ai-polish:fail]', row.id, e.message || e);
    }
  }

  console.log(`[ai-polish] done ok=${ok} fail=${fail}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
