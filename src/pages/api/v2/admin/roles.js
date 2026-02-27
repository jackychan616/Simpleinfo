import { getSupabaseServer } from '../../../../lib/supabaseServer';
import { hasMinRole, resolveRoleByEmail } from '../../../../lib/rbac';

export default async function handler(req, res) {
  const requesterEmail = String(req.headers['x-user-email'] || '').toLowerCase();
  const requesterRole = await resolveRoleByEmail(requesterEmail);

  if (!hasMinRole(requesterRole, 'admin')) {
    return res.status(403).json({ error: 'admin role required' });
  }

  const { client, error } = getSupabaseServer();
  if (!client) return res.status(500).json({ error });

  if (req.method === 'GET') {
    const { data, error: qErr } = await client.from('user_roles').select('*').order('created_at', { ascending: false });
    if (qErr) return res.status(500).json({ error: qErr.message });
    return res.status(200).json({ data: data || [] });
  }

  if (req.method === 'POST') {
    const { email, role } = req.body || {};
    const safeEmail = String(email || '').trim().toLowerCase();
    const safeRole = String(role || '').trim();

    if (!safeEmail || !safeRole) return res.status(422).json({ error: 'email and role are required' });
    if (!['admin', 'editor', 'writer', 'user'].includes(safeRole)) {
      return res.status(422).json({ error: 'invalid role' });
    }

    const { data, error: upErr } = await client
      .from('user_roles')
      .upsert({ email: safeEmail, role: safeRole }, { onConflict: 'email' })
      .select('*')
      .single();

    if (upErr) return res.status(500).json({ error: upErr.message });
    return res.status(200).json({ data });
  }

  if (req.method === 'DELETE') {
    const email = String(req.query.email || '').trim().toLowerCase();
    if (!email) return res.status(422).json({ error: 'email is required' });

    const { error: delErr } = await client.from('user_roles').delete().eq('email', email);
    if (delErr) return res.status(500).json({ error: delErr.message });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
