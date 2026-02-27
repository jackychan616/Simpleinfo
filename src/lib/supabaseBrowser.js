import { createClient } from '@supabase/supabase-js';

let browserClient;

export function getSupabaseBrowser() {
  if (typeof window === 'undefined') return null;

  if (browserClient) return browserClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  browserClient = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return browserClient;
}

export async function getAccessToken() {
  const supabase = getSupabaseBrowser();
  if (!supabase) return null;

  const { data } = await supabase.auth.getSession();
  return data.session?.access_token || null;
}
