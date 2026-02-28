import { Button, Card, Container, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { getSupabaseBrowser } from '../lib/supabaseBrowser';
import { useSupabaseSession } from '../lib/useSupabaseSession';

function safeNextPath(next) {
  if (!next || typeof next !== 'string') return '/writer';
  if (!next.startsWith('/')) return '/writer';
  if (next.startsWith('//')) return '/writer';
  return next;
}

export default function LoginPage() {
  const router = useRouter();
  const { session, ready } = useSupabaseSession();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const nextPath = useMemo(() => safeNextPath(router.query.next), [router.query.next]);
  const reason = useMemo(() => String(router.query.reason || ''), [router.query.reason]);

  useEffect(() => {
    if (ready && session?.user) {
      router.replace(nextPath);
    }
  }, [ready, session, router, nextPath]);

  async function sendMagicLink() {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setMsg('Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    setLoading(true);
    setMsg('');

    const redirectTo = `${window.location.origin}${nextPath}`;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    setLoading(false);
    if (error) {
      setMsg(`登入連結發送失敗：${error.message}`);
      return;
    }

    setMsg('Magic link 已發送，請到電郵收信登入。');
  }

  return (
    <Container size="sm" py="xl">
      <Card withBorder radius="md" shadow="sm">
        <Stack spacing="md">
          <Title order={1}>Login</Title>
          {reason === 'session_expired' ? (
            <Text color="orange">你的登入狀態已過期，請重新登入後繼續。</Text>
          ) : null}
          <Text color="dimmed">登入後會自動返回：{nextPath}</Text>

          <TextInput
            label="Email login"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Group>
            <Button onClick={sendMagicLink} disabled={!email || loading}>
              {loading ? 'Sending...' : 'Send Magic Link'}
            </Button>
            <Button component={Link} href="/writer" variant="light">
              Back to writer
            </Button>
          </Group>

          {msg ? <Text size="sm">{msg}</Text> : null}
        </Stack>
      </Card>
    </Container>
  );
}
