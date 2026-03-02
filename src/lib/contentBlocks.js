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
  const raw = String(content || '').replace(/\r\n/g, '\n');
  if (!raw.trim()) return [];

  const lines = raw.split('\n');
  const blocks = [];
  let idx = 0;
  let inCode = false;
  let codeLang = 'plaintext';
  let codeBuffer = [];
  let paraBuffer = [];

  function flushParagraph() {
    const text = paraBuffer.join('\n').trim();
    if (text) {
      blocks.push(normalizeBlock({ id: `legacy-${idx++}`, type: 'paragraph', text }));
    }
    paraBuffer = [];
  }

  function flushCode() {
    const code = codeBuffer.join('\n');
    if (code.trim()) {
      blocks.push(normalizeBlock({ id: `legacy-${idx++}`, type: 'code', language: codeLang, code }));
    }
    codeBuffer = [];
    codeLang = 'plaintext';
  }

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      if (!inCode) {
        flushParagraph();
        inCode = true;
        codeLang = line.trim().slice(3).trim() || 'plaintext';
      } else {
        flushCode();
        inCode = false;
      }
      continue;
    }

    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    const h = line.match(/^(#{1,6})\s+(.+)$/);
    if (h) {
      flushParagraph();
      blocks.push(normalizeBlock({ id: `legacy-${idx++}`, type: 'heading', level: h[1].length, text: h[2].trim() }));
      continue;
    }

    const linkOnly = line.match(/^\[(.+)\]\((https?:\/\/[^)]+)\)$/);
    if (linkOnly) {
      flushParagraph();
      blocks.push(normalizeBlock({ id: `legacy-${idx++}`, type: 'link', text: linkOnly[1].trim(), href: linkOnly[2].trim() }));
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      continue;
    }

    paraBuffer.push(line);
  }

  if (inCode) flushCode();
  flushParagraph();

  return normalizeBlocks(blocks);
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
