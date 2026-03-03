#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const { contentToBlocks, blocksToPlainText } = require('../src/lib/contentBlocks');
const { loadLocalEnv } = require('./load-env');

loadLocalEnv();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function cleanLegacyText(s = '') {
  return String(s)
    .replace(/function\s+\w+\s*\([^)]*\)\s*\{?/gi, '')
    .replace(/return\s*\(/gi, '')
    .replace(/[{}]/g, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\b(import|export default|const|let|var)\b[\s\S]*?(;|$)/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function needsRepair(row) {
  const c = String(row.content || '');
  const blocks = Array.isArray(row.content_blocks) ? row.content_blocks : [];
  if (/function\s+\w+\s*\(/i.test(c)) return true;
  if (/return\s*\(/i.test(c)) return true;
  if (blocks.length <= 1) return true;
  if (c.trim().length < 400) return true;
  return false;
}

async function main() {
  const { data, error } = await supabase
    .from('writer_submissions')
    .select('id,title,content,content_blocks,author_email,source_slug')
    .eq('author_email', 'migration@simpleinfo.local')
    .order('created_at', { ascending: false })
    .limit(500);

  if (error) throw error;

  let fixed = 0;
  for (const row of data || []) {
    if (!needsRepair(row)) continue;

    const cleaned = cleanLegacyText(row.content || '');
    const withHeading = `## ${row.title || '文章內容'}\n\n${cleaned}`;
    const blocks = contentToBlocks(withHeading);
    const content = blocksToPlainText(blocks);

    const { error: up } = await supabase
      .from('writer_submissions')
      .update({ content, content_blocks: blocks })
      .eq('id', row.id);

    if (!up) {
      fixed += 1;
      console.log('[repair:ok]', row.id, row.source_slug || '-');
    } else {
      console.log('[repair:fail]', row.id, up.message);
    }
  }

  console.log(`[repair] done fixed=${fixed}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
