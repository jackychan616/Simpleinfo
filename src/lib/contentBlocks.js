export const BLOCK_TYPES = ['paragraph', 'heading', 'image', 'link', 'code', 'embed'];

export function normalizeBlock(raw = {}) {
  const type = BLOCK_TYPES.includes(raw.type) ? raw.type : 'paragraph';
  const base = {
    id: raw.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
  };

  if (type === 'heading') {
    return { ...base, level: Number(raw.level) || 2, text: String(raw.text || '').trim() };
  }
  if (type === 'image') {
    return { ...base, src: String(raw.src || '').trim(), alt: String(raw.alt || '').trim(), caption: String(raw.caption || '').trim() };
  }
  if (type === 'link') {
    return { ...base, href: String(raw.href || '').trim(), text: String(raw.text || '').trim() };
  }
  if (type === 'code') {
    return { ...base, language: String(raw.language || 'plaintext').trim(), code: String(raw.code || '') };
  }
  if (type === 'embed') {
    return { ...base, provider: String(raw.provider || 'youtube').trim(), url: String(raw.url || '').trim(), title: String(raw.title || '').trim() };
  }

  return { ...base, text: String(raw.text || '').trim() };
}

export function normalizeBlocks(blocks) {
  if (!Array.isArray(blocks)) return [];
  return blocks.map((b) => normalizeBlock(b)).filter((b) => {
    if (b.type === 'image') return Boolean(b.src);
    if (b.type === 'code') return Boolean(String(b.code || '').trim());
    if (b.type === 'link') return Boolean(b.href || b.text);
    if (b.type === 'embed') return Boolean(b.url);
    return Boolean(String(b.text || '').trim());
  });
}

export function blocksToPlainText(blocks) {
  return normalizeBlocks(blocks)
    .map((b) => {
      if (b.type === 'heading' || b.type === 'paragraph') return b.text;
      if (b.type === 'link') return `${b.text || 'Link'} ${b.href || ''}`.trim();
      if (b.type === 'code') return b.code;
      if (b.type === 'image') return b.caption || b.alt || '';
      if (b.type === 'embed') return b.title || b.url;
      return '';
    })
    .filter(Boolean)
    .join('\n\n')
    .trim();
}

export function contentToBlocks(content = '') {
  const chunks = String(content)
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);
  return chunks.map((text, idx) => normalizeBlock({ id: `legacy-${idx}`, type: 'paragraph', text }));
}

export function getBlocksFromSubmission(row) {
  const blocks = normalizeBlocks(row?.content_blocks);
  if (blocks.length > 0) return blocks;
  return contentToBlocks(row?.content || '');
}

export function summarizeBlocks(blocks, maxLen = 160) {
  const plain = blocksToPlainText(blocks);
  return plain.slice(0, maxLen);
}
