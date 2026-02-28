import { getSupabaseServer } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  const { id } = req.body || {};
  if (!id) return res.status(422).json({ error: 'id is required' });

  const { data, error } = await client
    .from('ai_blog_queue')
    .update({ status: 'pending', error_message: null, processed_at: null })
    .eq('id', id)
    .select('*')
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ data });
}
