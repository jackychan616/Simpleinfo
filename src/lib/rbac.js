import { getSupabaseServer } from './supabaseServer';

const ROLE_LEVEL = {
  user: 1,
  writer: 2,
  editor: 3,
  admin: 4,
};

export async function resolveRoleByEmail(email) {
  if (!email) return 'user';
  const { client } = getSupabaseServer();
  if (!client) return 'user';

  const { data } = await client
    .from('user_roles')
    .select('role')
    .eq('email', String(email).toLowerCase())
    .single();

  return data?.role || 'user';
}

export function hasMinRole(currentRole, requiredRole) {
  const a = ROLE_LEVEL[currentRole] || 0;
  const b = ROLE_LEVEL[requiredRole] || 99;
  return a >= b;
}
