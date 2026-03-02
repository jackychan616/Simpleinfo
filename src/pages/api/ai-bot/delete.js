import { getSupabaseServer } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  const { id } = req.body || {};
  if (!id) return res.status(422).json({ error: 'id is required' });

  const { data: row, error: findErr } = await client
    .from('ai_blog_queue')
    .select('id,status')
    .eq('id', id)
    .single();

  if (findErr || !row) return res.status(404).json({ error: findErr?.message || 'Queue item not found' });
  if (row.status !== 'pending') return res.status(422).json({ error: 'Only pending item can be deleted' });

  const { error } = await client.from('ai_blog_queue').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ ok: true, id });
}
