import { getSupabaseServer } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { submissionId, comment } = req.body || {};
  if (!submissionId || !comment) {
    return res.status(422).json({ error: 'submissionId and comment are required' });
  }

  const { client, error } = getSupabaseServer();
  if (!client) return res.status(500).json({ error });

  const { data, error: insertErr } = await client
    .from('ai_optimize_queue')
    .insert({
      submission_id: submissionId,
      comment,
      status: 'pending',
    })
    .select('id,submission_id,status,created_at')
    .single();

  if (insertErr) return res.status(500).json({ error: insertErr.message });
  return res.status(200).json({ ok: true, data });
}
