import { Button, Card, Container, Divider, Group, Stack, Text, TextInput, Title, PasswordInput } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { getSupabaseBrowser } from '../lib/supabaseBrowser';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function loginMagicLink() {
    setLoading(true);
    setMsg('');
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) throw new Error('缺少 Supabase env');
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/writer` : undefined },
      });
      setMsg(error ? `登入失敗：${error.message}` : 'Magic link 已發送，請去 email 開連結登入。');
    } catch (e) {
      setMsg(`登入失敗：${e.message}`);
    }
    setLoading(false);
  }

  async function loginPassword() {
    setLoading(true);
    setMsg('');
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) throw new Error('缺少 Supabase env');
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setMsg(error ? `登入失敗：${error.message}` : '登入成功 ✅');
    } catch (e) {
      setMsg(`登入失敗：${e.message}`);
    }
    setLoading(false);
  }

  async function loginGoogle() {
    const supabase = getSupabaseBrowser();
    if (!supabase) return setMsg('Google 登入不可用：缺少 Supabase env');
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  }

  return (
    <Container size="xs" py={48}>
      <Card withBorder shadow="sm" radius="md" p="lg">
        <Stack spacing="md">
          <Title order={2}>登入帳戶</Title>
          <Text color="dimmed" size="sm">支援 Password、Magic Link、Google。</Text>
          <TextInput label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
          <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />

          <Group grow>
            <Button onClick={loginPassword} disabled={!email || !password || loading}>{loading ? '處理中...' : 'Password Login'}</Button>
            <Button variant="light" onClick={loginMagicLink} disabled={!email || loading}>Magic Link</Button>
          </Group>

          <Button variant="outline" onClick={loginGoogle}>Google Login</Button>

          <Divider />
          <Text size="sm" color="dimmed">未有帳號？<Link href="/register"> 去註冊</Link></Text>
          {msg ? <Text size="sm" color={msg.includes('失敗') ? 'red' : 'teal'}>{msg}</Text> : null}
        </Stack>
      </Card>
    </Container>
  );
}
