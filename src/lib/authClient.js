import { getSupabaseBrowser } from './supabaseBrowser';

export async function getCurrentUserSafe() {
  const supabase = getSupabaseBrowser();
  if (!supabase) return null;

  const { data } = await supabase.auth.getUser();
  if (data.user) return data.user;

  const { data: refreshed } = await supabase.auth.refreshSession();
  return refreshed.user || null;
}

export async function getCurrentRoleSafe(email) {
  if (!email) return 'user';
  try {
    const res = await fetch(`/api/v2/me/role?email=${encodeURIComponent(email)}`);
    const body = await res.json().catch(() => ({}));
    return body?.role || 'user';
  } catch {
    return 'user';
  }
}

export function onAuthStateChange(callback) {
  const supabase = getSupabaseBrowser();
  if (!supabase) return () => {};
  const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
  return () => sub.subscription.unsubscribe();
}
