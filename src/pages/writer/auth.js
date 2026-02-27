import { Button, Container, Stack, Text, TextInput, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';

export default function WriterAuthPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  async function refreshUser() {
    const supabase = getSupabaseBrowser();
    const { data } = await supabase.auth.getUser();
    setUserEmail(data.user?.email || '');
  }

  useEffect(() => {
    refreshUser();
  }, []);

  async function login() {
    setLoading(true);
    setMsg('');
    try {
      const supabase = getSupabaseBrowser();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/writer/auth` : undefined },
      });
      if (error) {
        setMsg(`登入連結發送失敗：${error.message}`);
      } else {
        setMsg('Magic link 已發送到你電郵，請開信箱點擊登入。');
      }
    } catch (e) {
      setMsg(`登入失敗：${e.message}`);
    }
    setLoading(false);
  }

  async function logout() {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
    setUserEmail('');
    setMsg('已登出');
  }

  return (
    <Container size="sm" py="xl">
      <Stack spacing="md">
        <Title order={1}>Writer Login</Title>
        <Text color="dimmed">用 email magic link 登入投稿系統。</Text>

        {userEmail ? (
          <>
            <Text>已登入：{userEmail}</Text>
            <Button onClick={logout} variant="light">登出</Button>
          </>
        ) : (
          <>
            <TextInput label="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
            <Button onClick={login} disabled={!email || loading}>{loading ? '發送中...' : 'Send magic link'}</Button>
          </>
        )}

        {msg ? <Text size="sm">{msg}</Text> : null}
      </Stack>
    </Container>
  );
}
