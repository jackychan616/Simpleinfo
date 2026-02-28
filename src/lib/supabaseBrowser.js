import { createClient } from '@supabase/supabase-js';

let client;

export function getSupabaseBrowser() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    if (typeof window !== 'undefined') {
      console.warn('Supabase browser client disabled: missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
    return null;
  }

  client = createClient(url, anon);
  return client;
}

export async function getAccessToken() {
  const supabase = getSupabaseBrowser();
  if (!supabase) return null;

  const { data } = await supabase.auth.getSession();
  return data.session?.access_token || null;
}
