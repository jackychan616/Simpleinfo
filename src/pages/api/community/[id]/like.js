import { getSupabaseServer } from '../../../../lib/supabaseServer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  const { id } = req.query;
  if (!id) return res.status(422).json({ error: 'id is required' });

  const { data: row, error: getError } = await client
    .from('writer_submissions')
    .select('id,status,like_count')
    .eq('id', id)
    .single();

  if (getError) return res.status(500).json({ error: getError.message });
  if (row.status !== 'approved') return res.status(403).json({ error: 'Only approved post can be liked' });

  const nextLikeCount = Number(row.like_count || 0) + 1;

  const { data, error } = await client
    .from('writer_submissions')
    .update({ like_count: nextLikeCount })
    .eq('id', id)
    .select('id, like_count')
    .single();

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ data });
}
