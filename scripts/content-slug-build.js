#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'src/pages/content');
const MAP_PATH = path.join(ROOT, 'src/data/content-slug-map.generated.json');
const OUT = path.join(ROOT, 'src/data/content-articles.generated.json');

function read(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
}

function extractFirst(re, text) {
  const m = text.match(re);
  return m ? m[1].trim() : '';
}

function build() {
  const map = JSON.parse(read(MAP_PATH) || '{"items":[]}');
  const items = (map.items || []).map((it) => {
    const full = path.join(ROOT, it.sourceFile);
    const src = read(full);

    const title =
      extractFirst(/<ConTitle[^>]*order=\{1\}[^>]*>([^<]+)<\/ConTitle>/, src) ||
      extractFirst(/content:\s*['\"]([^'\"]+)['\"][\s\S]*og:title/, src) ||
      it.title;

    const description =
      extractFirst(/name:\s*['\"]description['\"][\s\S]*?content:\s*['\"]([^'\"]+)['\"]/, src) ||
      '內容遷移中，請稍後查看完整新版文章。';

    const image =
      extractFirst(/property:\s*['\"]og:image['\"][\s\S]*?content:\s*['\"]([^'\"]+)['\"]/, src) ||
      '/img/simple_info.png';

    return {
      slug: it.slug,
      title,
      description,
      image,
      legacyPath: it.legacyPath,
    };
  });

  fs.writeFileSync(
    OUT,
    JSON.stringify({ generatedAt: new Date().toISOString(), count: items.length, items }, null, 2)
  );

  console.log(`[content-slug-build] generated: ${OUT}`);
  console.log(`[content-slug-build] items: ${items.length}`);
}

build();
