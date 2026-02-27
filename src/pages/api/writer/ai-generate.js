import { normalizeBlocks } from '../../../lib/contentBlocks';

function fallbackDraft({ topic, tone, length }) {
  const safeTopic = topic || 'Untitled topic';
  const safeTone = tone || 'professional';
  const targetWords = length === 'long' ? 700 : length === 'short' ? 250 : 450;

  return {
    title: `${safeTopic}: 快速指南`,
    description: `一篇 ${safeTone} 風格、約 ${targetWords} 字的文章草稿。`,
    blocks: normalizeBlocks([
      { type: 'heading', level: 2, text: `${safeTopic} 是什麼？` },
      { type: 'paragraph', text: `${safeTopic} 近年成為熱門話題。本文會用 ${safeTone} 方式整理背景、實戰與常見錯誤。` },
      { type: 'heading', level: 2, text: '核心重點' },
      { type: 'paragraph', text: '先釐清問題，再拆成步驟執行，並用可量化指標評估成效。' },
      { type: 'code', language: 'bash', code: 'echo "start with one measurable objective"' },
      { type: 'link', href: 'https://simpleinfohk.me', text: '延伸閱讀：SimpleInfo' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200', alt: `${safeTopic} illustration`, caption: `${safeTopic} 概念圖` },
    ]),
  };
}

async function callOpenAI(payload) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.7,
      messages: payload,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) return null;

  const body = await res.json();
  const text = body?.choices?.[0]?.message?.content;
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { topic, tone = 'professional', length = 'medium', action = 'draft', existingBlocks = [] } = req.body || {};

  if (!topic && action === 'draft') return res.status(422).json({ error: 'topic is required' });

  const system = 'You are a blog writing assistant. Return JSON only with keys: title, description, blocks. blocks should be array of objects using supported type: paragraph|heading|image|link|code|embed.';
  const user = action === 'draft'
    ? `Create a ${tone} ${length} blog draft about: ${topic}. Must include at least one heading, paragraph, code, link and image block.`
    : `Rewrite existing blog blocks with action: ${action}. Existing blocks: ${JSON.stringify(existingBlocks).slice(0, 4000)}. Return improved title/description and rewritten blocks.`;

  const aiJson = await callOpenAI([
    { role: 'system', content: system },
    { role: 'user', content: user },
  ]);

  if (!aiJson) {
    const fallback = fallbackDraft({ topic, tone, length });

    if (action !== 'draft') {
      return res.status(200).json({
        data: {
          ...fallback,
          title: action === 'improve_seo' ? `${topic || '文章'}｜完整教學與實用技巧` : fallback.title,
          description: action === 'improve_seo' ? `重點整理 ${topic || '主題'}，包含步驟、範例與常見問題。` : fallback.description,
        },
        fallback: true,
      });
    }

    return res.status(200).json({ data: fallback, fallback: true });
  }

  const data = {
    title: String(aiJson.title || topic || 'AI Draft').slice(0, 120),
    description: String(aiJson.description || '').slice(0, 200),
    blocks: normalizeBlocks(aiJson.blocks || []),
  };

  if (data.blocks.length === 0) {
    data.blocks = fallbackDraft({ topic, tone, length }).blocks;
  }

  return res.status(200).json({ data, fallback: false });
}
