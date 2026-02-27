import { Button, Container, Stack, Text, TextInput, Title } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { getSupabaseBrowser } from '../lib/supabaseBrowser';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function register() {
    setLoading(true);
    setMsg('');
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) {
        setMsg('註冊暫不可用：缺少 Supabase 公開環境變數');
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/writer` : undefined,
        },
      });
      setMsg(error ? `註冊失敗：${error.message}` : '註冊連結已發送，請去 email 完成。');
    } catch (e) {
      setMsg(`註冊失敗：${e.message}`);
    }
    setLoading(false);
  }

  return (
    <Container size="sm" py="xl">
      <Stack spacing="md">
        <Title order={1}>註冊</Title>
        <Text color="dimmed">用 email 建立帳號（magic link）。</Text>
        <TextInput label="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <Button onClick={register} disabled={!email || loading}>{loading ? '發送中...' : '註冊並發送連結'}</Button>
        <Text size="sm">已有帳號？<Link href="/login">去登入</Link></Text>
        {msg ? <Text size="sm">{msg}</Text> : null}
      </Stack>
    </Container>
  );
}
