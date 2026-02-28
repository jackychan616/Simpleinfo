import { Button, Card, Container, Divider, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import Link from 'next/link';
import Meta from './components/meta';
import { useState } from 'react';
import { getSupabaseBrowser } from '../lib/supabaseBrowser';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function registerPassword() {
    setLoading(true);
    setMsg('');
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) throw new Error('缺少 Supabase env');
      const { error } = await supabase.auth.signUp({ email, password });
      setMsg(error ? `註冊失敗：${error.message}` : '註冊成功，請檢查 email 驗證。');
    } catch (e) {
      setMsg(`註冊失敗：${e.message}`);
    }
    setLoading(false);
  }

  async function registerMagicLink() {
    setLoading(true);
    setMsg('');
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) throw new Error('缺少 Supabase env');
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/writer` : undefined },
      });
      setMsg(error ? `註冊失敗：${error.message}` : '註冊連結已發送，請去 email 完成。');
    } catch (e) {
      setMsg(`註冊失敗：${e.message}`);
    }
    setLoading(false);
  }

  return (
    <>
      <Meta pageTitle="Register | Simple Info" description="建立 Simple Info 帳戶，開始投稿與互動。" path="/register" />
      <Container size="xs" py={48}>
        <Card withBorder shadow="sm" radius="md" p="lg">
        <Stack spacing="md">
          <Title order={2}>建立帳戶</Title>
          <Text color="dimmed" size="sm">支援 Email + Password 或 Magic Link 註冊。</Text>

          <TextInput label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
          <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />

          <Group grow>
            <Button onClick={registerPassword} disabled={!email || !password || loading}>{loading ? '處理中...' : 'Password Register'}</Button>
            <Button variant="light" onClick={registerMagicLink} disabled={!email || loading}>Magic Link Register</Button>
          </Group>

          <Divider />
          <Text size="sm" color="dimmed">已有帳號？<Link href="/login"> 去登入</Link></Text>
          {msg ? <Text size="sm" color={msg.includes('失敗') ? 'red' : 'teal'}>{msg}</Text> : null}
        </Stack>
      </Card>
    </Container>
    </>
  );
}
