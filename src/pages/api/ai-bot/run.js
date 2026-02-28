import { getSupabaseServer } from '../../../lib/supabaseServer';
import { buildDraftFromTopic } from '../../../lib/aiBotDraft';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const minChars = Number(req.body?.minChars || 0);

  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  const nowIso = new Date().toISOString();

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
    const draft = buildDraftFromTopic({
      topic: item.topic,
      tone: item.tone,
      length: item.length,
      category: item.category,
    });

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
