export const BLOCK_TYPES = ['paragraph', 'heading', 'image', 'link', 'code', 'embed', 'list', 'table', 'chart'];

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
    const text = String(raw.text || '').trim();
    let href = String(raw.href || '').trim();

    if (href && !/^https?:\/\//i.test(href)) {
      if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(href)) {
        href = `https://${href}`;
      }
    }

    return { ...base, href, text };
  }
  if (type === 'code') {
    return { ...base, language: String(raw.language || 'plaintext').trim(), code: String(raw.code || '') };
  }
  if (type === 'embed') {
    return { ...base, provider: String(raw.provider || 'youtube').trim(), url: String(raw.url || '').trim(), title: String(raw.title || '').trim() };
  }
  if (type === 'list') {
    const items = Array.isArray(raw.items) ? raw.items.map((x) => String(x || '').trim()).filter(Boolean) : [];
    const ordered = Boolean(raw.ordered);
    return { ...base, ordered, items };
  }
  if (type === 'table') {
    const headers = Array.isArray(raw.headers) ? raw.headers.map((x) => String(x || '').trim()) : [];
    const rows = Array.isArray(raw.rows)
      ? raw.rows.map((r) => (Array.isArray(r) ? r.map((c) => String(c || '').trim()) : [])).filter((r) => r.some(Boolean))
      : [];
    return { ...base, headers, rows };
  }
  if (type === 'chart') {
    const chartType = String(raw.chartType || 'pie').trim().toLowerCase();
    const labels = Array.isArray(raw.labels) ? raw.labels.map((x) => String(x || '').trim()).filter(Boolean) : [];
    const values = Array.isArray(raw.values) ? raw.values.map((x) => Number(x)).filter((n) => Number.isFinite(n)) : [];
    const title = String(raw.title || '').trim();
    return { ...base, chartType, labels, values, title };
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
    if (b.type === 'list') return Array.isArray(b.items) && b.items.length > 0;
    if (b.type === 'table') return Array.isArray(b.rows) && b.rows.length > 0;
    if (b.type === 'chart') return Array.isArray(b.labels) && Array.isArray(b.values) && b.labels.length > 0 && b.labels.length === b.values.length;
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
      if (b.type === 'list') return (b.items || []).join('\n');
      if (b.type === 'table') return (b.rows || []).map((r) => r.join(' | ')).join('\n');
      if (b.type === 'chart') return `${b.title || 'chart'} ${(b.labels || []).join(', ')}`.trim();
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
  let listBuffer = [];
  let listOrdered = false;
  let tableBuffer = [];

  function flushParagraph() {
    const text = paraBuffer.join('\n').trim();
    if (text) {
      blocks.push(normalizeBlock({ id: `legacy-${idx++}`, type: 'paragraph', text }));
    }
    paraBuffer = [];
  }

  function flushList() {
    if (listBuffer.length) {
      blocks.push(normalizeBlock({ id: `legacy-${idx++}`, type: 'list', ordered: listOrdered, items: listBuffer }));
    }
    listBuffer = [];
    listOrdered = false;
  }

  function flushTable() {
    if (tableBuffer.length >= 2) {
      const headers = tableBuffer[0].map((x) => x.trim());
      const rows = tableBuffer.slice(2).map((r) => r.map((x) => x.trim())).filter((r) => r.some(Boolean));
      if (rows.length) {
        blocks.push(normalizeBlock({ id: `legacy-${idx++}`, type: 'table', headers, rows }));
      }
    }
    tableBuffer = [];
  }

  function flushCode() {
    const code = codeBuffer.join('\n');
    if (code.trim()) {
      const isChartLang = ['chart', 'pie', 'bar', 'line'].includes(String(codeLang || '').toLowerCase());
      if (isChartLang) {
        const lines = code.split('\n').map((s) => s.trim()).filter(Boolean);
        const pairs = lines
          .map((line) => {
            const m = line.match(/^(.+?)\s*[:=]\s*(-?\d+(?:\.\d+)?)$/);
            return m ? [m[1].trim(), Number(m[2])] : null;
          })
          .filter(Boolean);

        if (pairs.length >= 2) {
          blocks.push(normalizeBlock({
            id: `legacy-${idx++}`,
            type: 'chart',
            chartType: codeLang.toLowerCase() === 'chart' ? 'pie' : codeLang.toLowerCase(),
            labels: pairs.map((p) => p[0]),
            values: pairs.map((p) => p[1]),
            title: 'Data Chart',
          }));
        } else {
          blocks.push(normalizeBlock({ id: `legacy-${idx++}`, type: 'code', language: codeLang, code }));
        }
      } else {
        blocks.push(normalizeBlock({ id: `legacy-${idx++}`, type: 'code', language: codeLang, code }));
      }
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
      flushList();
      flushTable();
      blocks.push(normalizeBlock({ id: `legacy-${idx++}`, type: 'heading', level: h[1].length, text: h[2].trim() }));
      continue;
    }

    const imageOnly = line.match(/^!\[(.*)\]\((https?:\/\/[^)]+)\)$/);
    if (imageOnly) {
      flushParagraph();
      flushList();
      flushTable();
      blocks.push(normalizeBlock({ id: `legacy-${idx++}`, type: 'image', src: imageOnly[2].trim(), alt: imageOnly[1].trim() }));
      continue;
    }

    const linkOnly = line.match(/^\[(.+)\]\((https?:\/\/[^)]+)\)$/);
    if (linkOnly) {
      flushParagraph();
      flushList();
      flushTable();
      blocks.push(normalizeBlock({ id: `legacy-${idx++}`, type: 'link', text: linkOnly[1].trim(), href: linkOnly[2].trim() }));
      continue;
    }

    const ul = line.match(/^[-*]\s+(.+)$/);
    const ol = line.match(/^\d+\.\s+(.+)$/);
    if (ul || ol) {
      flushParagraph();
      flushTable();
      const ordered = Boolean(ol);
      const item = (ul?.[1] || ol?.[1] || '').trim();
      if (listBuffer.length && listOrdered !== ordered) {
        flushList();
      }
      listOrdered = ordered;
      if (item) listBuffer.push(item);
      continue;
    }

    if (/^\|.+\|$/.test(line.trim())) {
      flushParagraph();
      flushList();
      const cells = line.trim().split('|').slice(1, -1).map((x) => x.trim());
      tableBuffer.push(cells);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }

    flushList();
    flushTable();
    paraBuffer.push(line);
  }

  if (inCode) flushCode();
  flushParagraph();
  flushList();
  flushTable();

  return normalizeBlocks(blocks);
}

function hasMarkdownHints(text = '') {
  const s = String(text || '');
  return /(^|\n)#{1,6}\s+/.test(s)
    || /(^|\n)(-|\*)\s+/.test(s)
    || /(^|\n)\d+\.\s+/.test(s)
    || /```/.test(s)
    || /(^|\n)\|.+\|/.test(s);
}

export function getBlocksFromSubmission(row) {
  const blocks = normalizeBlocks(row?.content_blocks);
  const content = String(row?.content || '');

  if (blocks.length > 0) {
    const rich = blocks.some((b) => ['heading', 'list', 'table', 'code', 'link'].includes(b.type));
    if (rich) return blocks;

    const merged = blocksToPlainText(blocks) || content;
    if (hasMarkdownHints(merged)) {
      const reparsed = contentToBlocks(merged);
      if (reparsed.length) return reparsed;
    }

    return blocks;
  }

  return contentToBlocks(content);
}

export function summarizeBlocks(blocks, maxLen = 160) {
  const plain = blocksToPlainText(blocks);
  return plain.slice(0, maxLen);
}
