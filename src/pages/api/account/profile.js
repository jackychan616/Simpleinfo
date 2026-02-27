import { getSupabaseServer } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  const { client, error } = getSupabaseServer();
  if (!client) return res.status(500).json({ error });

  const userId = req.headers['x-user-id'];
  const userEmail = req.headers['x-user-email'];
  if (!userId) return res.status(401).json({ error: 'Missing user id' });

  if (req.method === 'GET') {
    const { data, error: qErr } = await client.from('profiles').select('*').eq('id', userId).single();
    if (qErr) return res.status(404).json({ error: qErr.message });
    return res.status(200).json({ data });
  }

  if (req.method === 'POST') {
    const { username, birthday } = req.body || {};
    const { data, error: upErr } = await client
      .from('profiles')
      .upsert({
        id: userId,
        email: userEmail || null,
        username: username || null,
        birthday: birthday || null,
      })
      .select('*')
      .single();

    if (upErr) return res.status(500).json({ error: upErr.message });
    return res.status(200).json({ data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
