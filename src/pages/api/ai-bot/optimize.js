import { getSupabaseServer } from '../../../lib/supabaseServer';
import { normalizeBlocks, blocksToPlainText } from '../../../lib/contentBlocks';

function safeJsonParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function optimizeWithGitHubModels({ title, content, comment }) {
  const token = process.env.GITHUB_TOKEN;
  const model = process.env.GITHUB_MODEL || 'gpt-4.1';
  if (!token) throw new Error('Missing GITHUB_TOKEN');

  const prompt = `You are editing a blog post based on reviewer comments. Return strict JSON only with keys: title, blocks.

Current title: ${title}
Current content:\n${content}

Reviewer comment:\n${comment}

Requirements:
- Traditional Chinese (Hong Kong style)
- Human-like writing voice
- Keep practical and concrete
- blocks can include heading/paragraph/link/code`;

  const resp = await fetch('https://models.inference.ai.azure.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are a senior content editor.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`GitHub Models error ${resp.status}: ${text.slice(0, 300)}`);
  }

  const data = await resp.json();
  const parsed = safeJsonParse(data?.choices?.[0]?.message?.content || '{}');
  if (!parsed) throw new Error('Failed to parse optimize JSON');

  const blocks = normalizeBlocks(Array.isArray(parsed.blocks) ? parsed.blocks : []);
  if (!blocks.length) throw new Error('AI optimize returned empty blocks');

  return {
    title: String(parsed.title || title || '').trim(),
    blocks,
    content: blocksToPlainText(blocks),
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { submissionId, comment } = req.body || {};
  if (!submissionId || !comment) {
    return res.status(422).json({ error: 'submissionId and comment are required' });
  }

  const { client, error } = getSupabaseServer();
  if (!client) return res.status(500).json({ error });

  const { data: row, error: rowErr } = await client
    .from('writer_submissions')
    .select('id,title,content')
    .eq('id', submissionId)
    .single();

  if (rowErr || !row) return res.status(404).json({ error: rowErr?.message || 'Submission not found' });

  try {
    const draft = await optimizeWithGitHubModels({
      title: row.title,
      content: row.content,
      comment,
    });

    const { data: updated, error: upErr } = await client
      .from('writer_submissions')
      .update({
        title: draft.title,
        content: draft.content,
        content_blocks: draft.blocks,
      })
      .eq('id', submissionId)
      .select('id,title,updated_at')
      .single();

    if (upErr) throw upErr;
    return res.status(200).json({ ok: true, data: updated });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
}
