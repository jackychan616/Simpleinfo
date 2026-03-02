import { Button, Container, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';

export default function WriterAuthPage() {
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  async function refreshUser() {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setMsg('Auth 暫不可用：缺少 Supabase 公開環境變數');
      return;
    }
    const { data } = await supabase.auth.getUser();
    setUserEmail(data.user?.email || '');
  }

  useEffect(() => {
    refreshUser();
  }, []);

  async function sendCode() {
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
        options: { shouldCreateUser: false },
      });
      if (error) {
        setMsg(`發送驗證碼失敗：${error.message}`);
      } else {
        setMsg('驗證碼已發送，請檢查電郵再輸入 6 位數登入。');
      }
    } catch (e) {
      setMsg(`登入失敗：${e.message}`);
    }
    setLoading(false);
  }

  async function verifyCode() {
    setLoading(true);
    setMsg('');
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) {
        setMsg('登入暫不可用：缺少 Supabase 公開環境變數');
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: 'email',
      });

      if (error) {
        setMsg(`驗證碼登入失敗：${error.message}`);
      } else {
        await refreshUser();
        setMsg('登入成功 ✅');
      }
    } catch (e) {
      setMsg(`登入失敗：${e.message}`);
    }
    setLoading(false);
  }

  async function logout() {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    await supabase.auth.signOut();
    setUserEmail('');
    setMsg('已登出');
  }

  return (
    <Container size="sm" py="xl">
      <Stack spacing="md">
        <Title order={1}>Writer Login</Title>
        <Text color="dimmed">用 email 驗證碼登入投稿系統。</Text>

        {userEmail ? (
          <>
            <Text>已登入：{userEmail}</Text>
            <Button onClick={logout} variant="light">登出</Button>
          </>
        ) : (
          <>
            <TextInput label="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
            <TextInput label="驗證碼（6位）" value={otpCode} onChange={(e) => setOtpCode(e.currentTarget.value)} />
            <Group>
              <Button onClick={sendCode} disabled={!email || loading}>{loading ? '發送中...' : 'Send 驗證碼'}</Button>
              <Button onClick={verifyCode} variant="light" disabled={!email || !otpCode || loading}>驗證碼登入</Button>
            </Group>
          </>
        )}

        {msg ? <Text size="sm">{msg}</Text> : null}
      </Stack>
    </Container>
  );
}
