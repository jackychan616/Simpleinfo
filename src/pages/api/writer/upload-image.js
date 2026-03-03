import { getSupabaseServer, getUserFromRequest } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  const { user, error: authError } = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: authError || 'Unauthorized' });

  const { filename, contentType, dataUrl } = req.body || {};
  if (!dataUrl || !filename) return res.status(422).json({ error: 'filename and dataUrl are required' });

  const m = String(dataUrl).match(/^data:(.*?);base64,(.*)$/);
  if (!m) return res.status(422).json({ error: 'Invalid dataUrl format' });

  const mime = contentType || m[1] || 'image/png';
  const base64 = m[2];

  const ext = String(filename).split('.').pop() || 'png';
  const safeEmail = String(user.email || 'user').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const key = `writer/${safeEmail}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const buffer = Buffer.from(base64, 'base64');

  const { error: upErr } = await client.storage
    .from('blog-images')
    .upload(key, buffer, { contentType: mime, upsert: false });

  if (upErr) return res.status(500).json({ error: upErr.message });

  const { data } = client.storage.from('blog-images').getPublicUrl(key);
  return res.status(200).json({ url: data.publicUrl, path: key });
}
