import { getSupabaseServer } from '../../../../../lib/supabaseServer';
import { hasMinRole, resolveRoleByEmail } from '../../../../../lib/rbac';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const email = req.headers['x-user-email'];
  const role = await resolveRoleByEmail(email);
  if (!hasMinRole(role, 'editor')) {
    return res.status(403).json({ error: 'editor role required to publish' });
  }

  const { client, error } = getSupabaseServer();
  if (!client) return res.status(500).json({ error });

  const { id } = req.query;
  const { data, error: updErr } = await client
    .from('posts')
    .update({ status: 'published', published_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();

  if (updErr) return res.status(500).json({ error: updErr.message });
  return res.status(200).json({ data });
}
