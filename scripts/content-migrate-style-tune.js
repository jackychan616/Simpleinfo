#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const { normalizeBlocks } = require('../src/lib/contentBlocks');
const { loadLocalEnv } = require('./load-env');

loadLocalEnv();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function preferredWidth(category, index) {
  if (category === 'news') return index === 0 ? 680 : 620;
  if (category === 'sport') return index === 0 ? 720 : 660;
  if (category === 'ai' || category === 'tech') return index === 0 ? 760 : 700;
  return index === 0 ? 720 : 660;
}

async function main() {
  const limitArg = process.argv.includes('--limit') ? Number(process.argv[process.argv.indexOf('--limit') + 1]) : 200;
  const limit = Number.isFinite(limitArg) ? Math.max(1, limitArg) : 200;

  const { data, error } = await supabase
    .from('writer_submissions')
    .select('id,category,content_blocks,author_email')
    .eq('author_email', 'migration@simpleinfo.local')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  let updated = 0;
  for (const row of data || []) {
    const blocks = normalizeBlocks(Array.isArray(row.content_blocks) ? row.content_blocks : []);
    let imgIdx = 0;
    let touched = false;

    const next = blocks.map((b) => {
      if (b.type !== 'image') return b;
      imgIdx += 1;
      const want = preferredWidth(row.category, imgIdx - 1);
      if (Number(b.maxWidth) === want) return b;
      touched = true;
      return { ...b, maxWidth: want };
    });

    if (!touched) continue;

    // eslint-disable-next-line no-await-in-loop
    const { error: upErr } = await supabase.from('writer_submissions').update({ content_blocks: next }).eq('id', row.id);
    if (!upErr) {
      updated += 1;
      console.log('[style-tune:ok]', row.id);
    }
  }

  console.log(`[style-tune] done updated=${updated}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
