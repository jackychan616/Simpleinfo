import { Button, Group, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';
import { useSupabaseSession } from '../../lib/useSupabaseSession';

export default function WriterAuth() {
  const { session } = useSupabaseSession();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMagicLink() {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setMsg('Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    setLoading(true);
    setMsg('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/writer`,
      },
    });

    setLoading(false);
    if (error) {
      setMsg(`登入連結發送失敗：${error.message}`);
      return;
    }

    setMsg('Magic link 已發送，請到電郵收信登入。');
  }

  async function logout() {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    await supabase.auth.signOut();
    setMsg('已登出');
  }

  if (session?.user?.email) {
    return (
      <Group>
        <Text size="sm">已登入：{session.user.email}</Text>
        <Button size="xs" variant="outline" onClick={logout}>Logout</Button>
      </Group>
    );
  }

  return (
    <Group align="end">
      <TextInput
        label="Email login"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <Button onClick={sendMagicLink} disabled={!email || loading}>
        {loading ? 'Sending...' : 'Send Magic Link'}
      </Button>
      {msg ? <Text size="sm">{msg}</Text> : null}
    </Group>
  );
}
