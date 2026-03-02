import { getSupabaseServer } from '../../../lib/supabaseServer';
import { normalizeBlocks, blocksToPlainText } from '../../../lib/contentBlocks';
import { buildDraftFromTopic } from '../../../lib/aiBotDraft';

function safeJsonParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function generateDraftWithGitHubModels({ topic, tone, length, category }) {
  const token = process.env.GITHUB_TOKEN;
  const model = process.env.GITHUB_MODEL || 'gpt-4.1';
  const timeoutMs = Math.max(8_000, Number(process.env.AI_BOT_HTTP_TIMEOUT_MS || 25_000));

  if (!token) throw new Error('Missing GITHUB_TOKEN');

  const targetWords = length === 'long' ? 1000 : length === 'short' ? 400 : 700;
  const prompt = `Generate a practical Traditional Chinese (Hong Kong) blog draft as strict JSON only.

Topic: ${topic}
Tone: ${tone || 'professional'}
Length: ${length || 'medium'}
Category: ${category || 'ai'}
Target words: around ${targetWords}

Return strict JSON with:
- title (string)
- description (string)
- category (string)
- blocks (array)

blocks allowed types:
- heading: {"type":"heading","level":2|3,"text":"..."}
- paragraph: {"type":"paragraph","text":"..."}
- link: {"type":"link","href":"https://...","text":"..."}
- code: {"type":"code","language":"bash|js|python|plaintext","code":"..."}

Quality requirements:
- No generic filler opening.
- Include concrete steps, examples, and pitfalls.
- Useful for real execution, not abstract summary.
- No markdown fences. JSON only.`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let resp;
  try {
    resp = await fetch('https://models.inference.ai.azure.com/chat/completions', {
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
          { role: 'system', content: 'You are an expert SEO content writer for HK readers.' },
          { role: 'user', content: prompt },
        ],
      }),
      signal: controller.signal,
    });
  } catch (e) {
    if (e?.name === 'AbortError') {
      throw new Error(`GitHub Models timeout after ${timeoutMs}ms`);
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`GitHub Models error ${resp.status}: ${text.slice(0, 300)}`);
  }

  const data = await resp.json();
  const raw = data?.choices?.[0]?.message?.content || '{}';
  const parsed = safeJsonParse(raw);

  if (!parsed?.title) throw new Error('AI response parse failed');

  const blocks = normalizeBlocks(Array.isArray(parsed.blocks) ? parsed.blocks : []);
  if (!blocks.length) throw new Error('AI produced empty blocks');

  return {
    title: String(parsed.title || '').trim(),
    description: String(parsed.description || '').trim(),
    category: String(parsed.category || category || 'ai').trim(),
    blocks,
    content: blocksToPlainText(blocks),
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const minChars = Number(req.body?.minChars || 0);

  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  const nowIso = new Date().toISOString();
  const staleMinutes = Math.max(5, Number(process.env.AI_BOT_STALE_MINUTES || 15));
  const staleAt = new Date(Date.now() - staleMinutes * 60 * 1000).toISOString();

  await client
    .from('ai_blog_queue')
    .update({ status: 'pending', error_message: 'auto-reset stale processing job' })
    .eq('status', 'processing')
    .lt('updated_at', staleAt);

  const { data: item, error: pickError } = await client
    .from('ai_blog_queue')
    .select('*')
    .eq('status', 'pending')
    .or(`scheduled_at.is.null,scheduled_at.lte.${nowIso}`)
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  if (pickError || !item) {
    return res.status(200).json({ ok: true, message: 'No pending jobs' });
  }

  await client.from('ai_blog_queue').update({ status: 'processing' }).eq('id', item.id);

  try {
    let draft;
    try {
      draft = await generateDraftWithGitHubModels({
        topic: item.topic,
        tone: item.tone,
        length: item.length,
        category: item.category,
      });
    } catch (aiErr) {
      if (!process.env.AI_BOT_ALLOW_TEMPLATE_FALLBACK) throw aiErr;
      draft = buildDraftFromTopic({ topic: item.topic, tone: item.tone, length: item.length, category: item.category });
    }

    if (minChars > 0 && String(draft.content || '').length < minChars) {
      throw new Error(`Generated content below minChars (${minChars})`);
    }

    const { data: submission, error: insertError } = await client
      .from('writer_submissions')
      .insert({
        title: draft.title,
        category: draft.category,
        content: draft.content,
        content_blocks: draft.blocks,
        status: 'pending_review',
        author_email: 'ai-bot@simpleinfo.local',
      })
      .select('id,title,status,created_at')
      .single();

    if (insertError) throw new Error(insertError.message);

    await client
      .from('ai_blog_queue')
      .update({
        status: 'done',
        generated_submission_id: submission.id,
        processed_at: new Date().toISOString(),
      })
      .eq('id', item.id);

    return res.status(200).json({ ok: true, queueId: item.id, submission });
  } catch (e) {
    await client
      .from('ai_blog_queue')
      .update({ status: 'failed', error_message: String(e.message || e), processed_at: new Date().toISOString() })
      .eq('id', item.id);

    return res.status(500).json({ error: String(e.message || e) });
  }
}
