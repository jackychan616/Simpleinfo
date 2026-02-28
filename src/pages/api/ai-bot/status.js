import { getSupabaseServer } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  const [{ data, error }, { data: latest, error: latestErr }] = await Promise.all([
    client.from('ai_blog_queue').select('status'),
    client.from('ai_blog_queue').select('id,topic,status,scheduled_at,processed_at').order('created_at', { ascending: false }).limit(20),
  ]);

  if (error) return res.status(500).json({ error: error.message });
  if (latestErr) return res.status(500).json({ error: latestErr.message });

  const counts = (data || []).reduce((acc, row) => {
    acc[row.status] = (acc[row.status] || 0) + 1;
    return acc;
  }, {});

  return res.status(200).json({ counts, latest: latest || [] });
}
