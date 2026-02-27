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
