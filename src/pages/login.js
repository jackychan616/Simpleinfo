import { Button, Container, Stack, Text, TextInput, Title } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { getSupabaseBrowser } from '../lib/supabaseBrowser';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setMsg('');
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) {
        setMsg('登入暫不可用：缺少 Supabase 公開環境變數');
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/writer` : undefined,
        },
      });
      setMsg(error ? `登入失敗：${error.message}` : 'Magic link 已發送，請去 email 開連結登入。');
    } catch (e) {
      setMsg(`登入失敗：${e.message}`);
    }
    setLoading(false);
  }

  return (
    <Container size="sm" py="xl">
      <Stack spacing="md">
        <Title order={1}>登入</Title>
        <Text color="dimmed">輸入電郵收 magic link。</Text>
        <TextInput label="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <Button onClick={login} disabled={!email || loading}>{loading ? '發送中...' : 'Send magic link'}</Button>
        <Text size="sm">未有帳號？<Link href="/register">去註冊</Link></Text>
        {msg ? <Text size="sm">{msg}</Text> : null}
      </Stack>
    </Container>
  );
}
