const { normalizeBlocks, blocksToPlainText } = require('./contentBlocks');

function buildDraftFromTopic({ topic, tone = 'professional', length = 'medium', category = 'ai' }) {
  const safeTopic = String(topic || 'Untitled Topic').trim();
  const targetWords = length === 'long' ? 900 : length === 'short' ? 300 : 550;

  const blocks = normalizeBlocks([
    { type: 'heading', level: 2, text: `${safeTopic}：重點速覽` },
    {
      type: 'paragraph',
      text: `這篇文章用 ${tone} 風格整理 ${safeTopic}，目標約 ${targetWords} 字，幫你快速理解重點同落地方法。`,
    },
    { type: 'heading', level: 3, text: '1) 背景與核心問題' },
    {
      type: 'paragraph',
      text: `${safeTopic} 近年熱度上升，但多數人仍停留喺概念層。真正落地要先定清晰目標，再定可量化指標。`,
    },
    { type: 'heading', level: 3, text: '2) 實作步驟' },
    { type: 'code', language: 'bash', code: 'echo "define objective -> ship MVP -> measure -> iterate"' },
    {
      type: 'link',
      href: 'https://simpleinfohk.me/community',
      text: '延伸閱讀：Simpleinfo 社群投稿',
    },
    {
      type: 'paragraph',
      text: '建議先用小流量場景試跑，再逐步放大，避免一次過投入太大資源。',
    },
  ]);

  return {
    title: `${safeTopic}｜實戰教學與最佳做法`,
    description: `快速掌握 ${safeTopic}：由概念到實作，附落地步驟與常見錯誤。`,
    category,
    blocks,
    content: blocksToPlainText(blocks),
  };
}

module.exports = {
  buildDraftFromTopic,
};
