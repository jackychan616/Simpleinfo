import { Button, Card, Container, Divider, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import Meta from './components/meta';
import { useState } from 'react';
import { getSupabaseBrowser } from '../lib/supabaseBrowser';

export default function RegisterPage() {
  const [msg, setMsg] = useState('');

  async function registerWithGoogle() {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setMsg('缺少 Supabase env');
      return;
    }

    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/writer` : undefined;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });

    if (error) setMsg(`Google 註冊失敗：${error.message}`);
  }

  return (
    <>
      <Meta pageTitle="Register | Simple Info" description="建立 Simple Info 帳戶，開始投稿與互動。" path="/register" />
      <Container size="xs" py={48}>
        <Card withBorder shadow="sm" radius="md" p="lg">
          <Stack spacing="md">
            <Title order={2}>建立帳戶</Title>
            <Text color="dimmed" size="sm">目前只支援 Google（Gmail）註冊 / 登入。</Text>

            <Button onClick={registerWithGoogle}>Continue with Google</Button>

            <Divider />
            <Text size="sm" color="dimmed">已有帳號？<Link href="/login"> 去登入</Link></Text>
            {msg ? <Text size="sm" color={msg.includes('失敗') ? 'red' : 'teal'}>{msg}</Text> : null}
          </Stack>
        </Card>
      </Container>
    </>
  );
}
