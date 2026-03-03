#!/usr/bin/env node

/**
 * Phase-1 migration helper:
 * Scan JS files under src/pages/content and output slug mapping JSON.
 *
 * This does NOT delete legacy pages yet (safe mode).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'src/pages/content');
const OUT = path.join(ROOT, 'src/data/content-slug-map.generated.json');

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full, acc);
      continue;
    }
    if (!name.endsWith('.js')) continue;
    if (name === 'index.js') continue;
    acc.push(full);
  }
  return acc;
}

function toSlug(filePath) {
  const rel = path.relative(CONTENT_DIR, filePath).replace(/\\/g, '/');
  return rel.replace(/\.js$/, '');
}

function titleFromSlug(slug) {
  const tail = slug.split('/').pop() || slug;
  return tail
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (s) => s.toUpperCase());
}

function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('content dir not found:', CONTENT_DIR);
    process.exit(1);
  }

  const files = walk(CONTENT_DIR);
  const rows = files
    .map((f) => {
      const slug = toSlug(f);
      return {
        slug,
        legacyPath: `/content/${slug}`,
        sourceFile: path.relative(ROOT, f).replace(/\\/g, '/'),
        title: titleFromSlug(slug),
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), count: rows.length, items: rows }, null, 2));

  console.log(`[content-slug-migrate] generated: ${OUT}`);
  console.log(`[content-slug-migrate] items: ${rows.length}`);
}

main();
