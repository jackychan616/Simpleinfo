#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { contentToBlocks, blocksToPlainText } = require('../src/lib/contentBlocks');
const { loadLocalEnv } = require('./load-env');

loadLocalEnv();

const ROOT = path.resolve(__dirname, '..');
const MAP_FILE = path.join(ROOT, 'src/data/content-slug-map.generated.json');
const SOURCE_BASE = path.join(ROOT, 'src/pages/content');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function extractFirst(re, text) {
  const m = text.match(re);
  return m ? m[1].trim() : '';
}

function inferCategory(slug) {
  const top = String(slug || '').split('/')[0] || '';
  if (top === 'ai-tutorial') return 'ai';
  if (['card-game', 'toy'].includes(top)) return 'gaming';
  if (['code-tutorial', 'web3'].includes(top)) return 'tech';
  return 'tech';
}

async function upsertOne(item) {
  const full = path.join(ROOT, item.sourceFile);
  const src = read(full);
  if (!src) return { ok: false, reason: 'empty_source' };

  const title =
    extractFirst(/<ConTitle[^>]*order=\{1\}[^>]*>([^<]+)<\/ConTitle>/, src) ||
    extractFirst(/property:\s*['\"]og:title['\"][\s\S]*?content:\s*['\"]([^'\"]+)['\"]/, src) ||
    item.title ||
    item.slug;

  const description =
    extractFirst(/name:\s*['\"]description['\"][\s\S]*?content:\s*['\"]([^'\"]+)['\"]/, src) ||
    `${title} - legacy migration`;

  const textDump = src
    .replace(/import[\s\S]*?;\n/g, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/\{`([\s\S]*?)`\}/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const blocks = contentToBlocks(textDump);
  const content = blocksToPlainText(blocks).trim();

  const payload = {
    title,
    category: inferCategory(item.slug),
    content: content || description,
    content_blocks: blocks,
    status: 'approved',
    author_email: 'migration@simpleinfo.local',
    source_slug: item.slug,
  };

  const { error } = await supabase
    .from('writer_submissions')
    .upsert(payload, { onConflict: 'source_slug' });

  if (error) return { ok: false, reason: error.message };
  return { ok: true };
}

async function main() {
  const mapRaw = read(MAP_FILE);
  if (!mapRaw) {
    console.error('Missing slug map, run: npm run content:slug:migrate');
    process.exit(1);
  }

  const map = JSON.parse(mapRaw);
  const items = map.items || [];
  let ok = 0;
  let fail = 0;

  for (const item of items) {
    // eslint-disable-next-line no-await-in-loop
    const res = await upsertOne(item);
    if (res.ok) {
      ok += 1;
      console.log('[migrate:ok]', item.slug);
    } else {
      fail += 1;
      console.log('[migrate:fail]', item.slug, res.reason);
    }
  }

  console.log(`[migrate] done ok=${ok} fail=${fail}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
