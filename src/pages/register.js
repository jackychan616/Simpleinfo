import { Button, Card, Container, Divider, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import Link from 'next/link';
import Meta from './components/meta';
import { useState } from 'react';
import { getSupabaseBrowser } from '../lib/supabaseBrowser';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
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

  async function sendRegisterCode() {
    setLoading(true);
    setMsg('');
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) throw new Error('缺少 Supabase env');

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });

      if (error) {
        setMsg(`發送註冊驗證碼失敗：${error.message}`);
      } else {
        setMsg('註冊驗證碼已發送，請輸入 6 位碼完成註冊。');
      }
    } catch (e) {
      setMsg(`註冊失敗：${e.message}`);
    }
    setLoading(false);
  }

  async function verifyRegisterCode() {
    setLoading(true);
    setMsg('');
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) throw new Error('缺少 Supabase env');

      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: 'signup',
      });

      if (error) {
        setMsg(`驗證碼註冊失敗：${error.message}`);
      } else {
        setMsg('註冊完成 ✅ 你而家可以去 login。');
      }
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
            <Text color="dimmed" size="sm">支援 Email + Password，或者 Email 驗證碼註冊。</Text>

            <TextInput label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
            <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />

            <Group grow>
              <Button onClick={registerPassword} disabled={!email || !password || loading}>{loading ? '處理中...' : 'Password Register'}</Button>
            </Group>

            <Divider label="或者用 Email 驗證碼" labelPosition="center" />

            <TextInput label="註冊驗證碼（6位）" placeholder="123456" value={otpCode} onChange={(e) => setOtpCode(e.currentTarget.value)} />
            <Group grow>
              <Button variant="light" onClick={sendRegisterCode} disabled={!email || loading}>Send Register Code</Button>
              <Button variant="light" onClick={verifyRegisterCode} disabled={!email || !otpCode || loading}>Verify & Register</Button>
            </Group>

            <Text size="xs" color="dimmed">如果你收到的仍然是 magic link 郵件樣式，需在 Supabase Auth Email Template / OTP 設定改成驗證碼模板。</Text>

            <Divider />
            <Text size="sm" color="dimmed">已有帳號？<Link href="/login"> 去登入</Link></Text>
            {msg ? <Text size="sm" color={msg.includes('失敗') ? 'red' : 'teal'}>{msg}</Text> : null}
          </Stack>
        </Card>
      </Container>
    </>
  );
}
