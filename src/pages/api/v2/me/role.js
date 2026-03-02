import { getSupabaseServer } from '../../../../lib/supabaseServer';

export default async function handler(req, res) {
  const email = String(req.headers['x-user-email'] || req.query.email || '').trim().toLowerCase();

  if (!email) {
    return res.status(200).json({ email: null, role: 'user', source: 'missing_email' });
  }

  const { client, error } = getSupabaseServer();
  if (!client) {
    return res.status(200).json({
      email,
      role: 'user',
      source: 'no_server_client',
      hint: error || 'SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_URL might be missing',
    });
  }

  const { data, error: queryError } = await client
    .from('user_roles')
    .select('role')
    .eq('email', email)
    .single();

  if (queryError) {
    const isNotFound = /0 rows|no rows|PGRST116/i.test(String(queryError.message || ''));
    if (isNotFound) {
      return res.status(200).json({ email, role: 'user', source: 'not_found' });
    }

    return res.status(200).json({
      email,
      role: 'user',
      source: 'query_error',
      hint: queryError.message,
    });
  }

  return res.status(200).json({ email, role: data?.role || 'user', source: 'db' });
}
