import { getSupabaseServer } from '../../../../lib/supabaseServer';

export default async function handler(req, res) {
  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await client
      .from('writer_submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
  }

  if (req.method === 'PATCH') {
    const { status } = req.body || {};
    if (!id || !status) return res.status(422).json({ error: 'id and status are required' });

    const { data, error } = await client
      .from('writer_submissions')
      .update({ status })
      .eq('id', id)
      .select('*')
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
