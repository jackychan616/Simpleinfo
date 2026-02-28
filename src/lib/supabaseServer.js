import { createClient } from '@supabase/supabase-js';

export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return { client: null, error: 'Missing Supabase env vars' };
  }

  return {
    client: createClient(url, key, { auth: { persistSession: false } }),
    error: null,
  };
}

export async function getUserFromRequest(req) {
  const { client, error } = getSupabaseServer();
  if (!client) return { user: null, error };

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return { user: null, error: 'Missing bearer token' };

  const { data, error: authError } = await client.auth.getUser(token);
  if (authError) return { user: null, error: authError.message };

  return { user: data.user || null, error: null };
}

export function isAdminEmail(email) {
  const allow = getAdminAllowlist();
  return allow.includes(String(email || '').toLowerCase());
}

export async function isAdminEmailWithDb(email, clientArg) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!normalizedEmail) return false;
  if (isAdminEmail(normalizedEmail)) return true;

  const client = clientArg || getSupabaseServer().client;
  if (!client) return false;

  const { data, error } = await client
    .from('admin_roles')
    .select('email, role')
    .eq('email', normalizedEmail)
    .limit(1);

  if (error) return false;

  return (data || []).some((item) => {
    const role = String(item?.role || '').toLowerCase();
    return role === '' || role === 'admin';
  });
}

export function getAdminAllowlist() {
  const allowRaw = process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAILS || '';
  return allowRaw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}
