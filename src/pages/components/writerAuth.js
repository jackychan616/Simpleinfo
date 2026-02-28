import { Button, Group, Text, TextInput } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { buildLoginUrl } from '../../lib/authRedirect';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';
import { useSupabaseSession } from '../../lib/useSupabaseSession';

export default function WriterAuth({ redirectPath = '/writer' }) {
  const router = useRouter();
  const { session } = useSupabaseSession();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const loginHref = useMemo(() => buildLoginUrl(router.asPath || redirectPath, 'manual_login'), [router.asPath, redirectPath]);

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
        emailRedirectTo: `${window.location.origin}${redirectPath}`,
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
        <Button size="xs" variant="outline" onClick={logout}>
          Logout
        </Button>
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
      <Button component={Link} href={loginHref} variant="subtle">
        Full login page
      </Button>
      {msg ? <Text size="sm">{msg}</Text> : null}
    </Group>
  );
}
