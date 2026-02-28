import { getSupabaseServer } from '../../../../lib/supabaseServer';
import { hasMinRole, resolveRoleByEmail } from '../../../../lib/rbac';
import { checkRateLimit } from '../../../../lib/rateLimit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function denyRateLimit(res, resetAt) {
  res.setHeader('Retry-After', Math.ceil((resetAt - Date.now()) / 1000));
  return res.status(429).json({ error: 'Too many requests, slow down' });
}

export default async function handler(req, res) {
  const requesterEmail = String(req.headers['x-user-email'] || '').trim().toLowerCase();
  const requesterRole = await resolveRoleByEmail(requesterEmail);

  if (!hasMinRole(requesterRole, 'admin')) {
    return res.status(403).json({ error: 'admin role required' });
  }

  const { client, error } = getSupabaseServer();
  if (!client) return res.status(500).json({ error });

  if (req.method === 'GET') {
    const [{ data: roles, error: rolesErr }, { data: logs, error: logsErr }] = await Promise.all([
      client.from('user_roles').select('*').order('created_at', { ascending: false }),
      client.from('role_audit_logs').select('*').order('created_at', { ascending: false }).limit(50),
    ]);

    if (rolesErr) return res.status(500).json({ error: rolesErr.message });
    if (logsErr) return res.status(500).json({ error: logsErr.message });

    return res.status(200).json({ data: roles || [], logs: logs || [] });
  }

  if (req.method === 'POST') {
    const rl = checkRateLimit(`admin:roles:post:${requesterEmail}`, { windowMs: 60_000, max: 20 });
    if (!rl.allowed) return denyRateLimit(res, rl.resetAt);

    const { email, role } = req.body || {};
    const safeEmail = String(email || '').trim().toLowerCase();
    const safeRole = String(role || '').trim();

    if (!safeEmail || !safeRole) return res.status(422).json({ error: 'email and role are required' });
    if (!EMAIL_RE.test(safeEmail)) return res.status(422).json({ error: 'invalid email format' });
    if (!['admin', 'editor', 'writer', 'user'].includes(safeRole)) {
      return res.status(422).json({ error: 'invalid role' });
    }

    const { data: before } = await client.from('user_roles').select('role').eq('email', safeEmail).single();

    if (safeEmail === requesterEmail && safeRole !== 'admin') {
      return res.status(422).json({ error: 'cannot self-demote from admin' });
    }

    const { data, error: upErr } = await client
      .from('user_roles')
      .upsert({ email: safeEmail, role: safeRole }, { onConflict: 'email' })
      .select('*')
      .single();

    if (upErr) return res.status(500).json({ error: upErr.message });

    await client.from('role_audit_logs').insert({
      actor_email: requesterEmail,
      target_email: safeEmail,
      action: 'upsert',
      previous_role: before?.role || null,
      new_role: safeRole,
    });

    return res.status(200).json({ data });
  }

  if (req.method === 'DELETE') {
    const rl = checkRateLimit(`admin:roles:delete:${requesterEmail}`, { windowMs: 60_000, max: 20 });
    if (!rl.allowed) return denyRateLimit(res, rl.resetAt);

    const email = String(req.query.email || '').trim().toLowerCase();
    if (!email) return res.status(422).json({ error: 'email is required' });
    if (!EMAIL_RE.test(email)) return res.status(422).json({ error: 'invalid email format' });
    if (email === requesterEmail) return res.status(422).json({ error: 'cannot remove your own admin role' });

    const { data: before } = await client.from('user_roles').select('role').eq('email', email).single();
    const { error: delErr } = await client.from('user_roles').delete().eq('email', email);
    if (delErr) return res.status(500).json({ error: delErr.message });

    await client.from('role_audit_logs').insert({
      actor_email: requesterEmail,
      target_email: email,
      action: 'delete',
      previous_role: before?.role || null,
      new_role: null,
    });

    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
