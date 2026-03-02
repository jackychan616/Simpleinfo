import { Button, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import Meta from './components/meta';
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
  const [msg, setMsg] = useState('');

  const nextPath = useMemo(() => safeNextPath(router.query.next), [router.query.next]);
  const reason = useMemo(() => String(router.query.reason || ''), [router.query.reason]);

  useEffect(() => {
    if (ready && session?.user) {
      router.replace(nextPath);
    }
  }, [ready, session, router, nextPath]);

  async function loginWithGoogle() {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setMsg('Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    const redirectTo = `${window.location.origin}${nextPath}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });

    if (error) setMsg(`Google 登入失敗：${error.message}`);
  }

  return (
    <>
      <Meta pageTitle="Login | Simple Info" description="登入 Simple Info 投稿與管理系統。" path="/login" />
      <Container size="sm" py="xl">
        <Card withBorder radius="md" shadow="sm">
          <Stack spacing="md">
            <Title order={1}>登入 Simple Info</Title>
            {reason === 'session_expired' ? <Text color="orange">你的登入狀態已過期，請重新登入後繼續。</Text> : null}
            <Text color="dimmed">登入後會自動返回：{nextPath}</Text>
            <Text color="dimmed">目前只支援 Google（Gmail）登入。請按下面按鈕用同一個 Google 帳戶登入。</Text>
            <Text size="sm" color="dimmed">如果登入後仍然無權限，請先確認你登入嘅 Gmail 同 admin 設定 email 一致。</Text>

            <Group>
              <Button onClick={loginWithGoogle}>用 Google 繼續</Button>
              <Button component={Link} href="/writer" variant="subtle">
                Back to writer
              </Button>
            </Group>

            {msg ? <Text size="sm">{msg}</Text> : null}
          </Stack>
        </Card>
      </Container>
    </>
  );
}
