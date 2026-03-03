#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { normalizeBlocks } = require('../src/lib/contentBlocks');
const { loadLocalEnv } = require('./load-env');

loadLocalEnv();

const ROOT = path.resolve(__dirname, '..');
const MAP_FILE = path.join(ROOT, 'src/data/content-slug-map.generated.json');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function extractImageUrls(source) {
  const urls = new Set();
  const patterns = [
    /src\s*=\s*"(https?:\/\/[^"\s]+|\/img\/[^"\s]+)"/g,
    /img\s*:\s*"(https?:\/\/[^"\s]+|\/img\/[^"\s]+)"/g,
    /image\s*:\s*"(https?:\/\/[^"\s]+|\/img\/[^"\s]+)"/g,
    /cover\s*:\s*"(https?:\/\/[^"\s]+|\/img\/[^"\s]+)"/g,
  ];

  for (const re of patterns) {
    let m;
    while ((m = re.exec(source)) !== null) {
      const u = String(m[1] || '').trim();
      if (u) urls.add(u);
    }
  }

  return [...urls];
}

async function main() {
  const mapRaw = read(MAP_FILE);
  const map = JSON.parse(mapRaw || '{"items":[]}');

  let fixed = 0;
  for (const item of map.items || []) {
    const source = read(path.join(ROOT, item.sourceFile));
    if (!source) continue;

    const images = extractImageUrls(source);
    if (!images.length) continue;

    const { data: row, error } = await supabase
      .from('writer_submissions')
      .select('id,title,content_blocks,source_slug')
      .eq('source_slug', item.slug)
      .single();

    if (error || !row) continue;

    const blocks = normalizeBlocks(Array.isArray(row.content_blocks) ? row.content_blocks : []);
    const hasImage = blocks.some((b) => b.type === 'image' && b.src);
    if (hasImage) continue;

    const imgBlocks = images.slice(0, 3).map((src, idx) => ({
      type: 'image',
      src,
      alt: `${row.title || 'image'} ${idx + 1}`,
      caption: idx === 0 ? '文章配圖' : '',
    }));

    const nextBlocks = normalizeBlocks([...imgBlocks, ...blocks]);

    const { error: upErr } = await supabase
      .from('writer_submissions')
      .update({ content_blocks: nextBlocks })
      .eq('id', row.id);

    if (!upErr) {
      fixed += 1;
      console.log('[repair-image:ok]', item.slug);
    }
  }

  console.log(`[repair-image] done fixed=${fixed}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
