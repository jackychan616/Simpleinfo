import { Button, Card, Container, PasswordInput, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { getSupabaseBrowser } from '../lib/supabaseBrowser';
import Meta from './components/meta';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function updatePassword() {
    if (password.length < 8) return setMsg('密碼最少 8 個字元');
    if (password !== confirm) return setMsg('兩次密碼唔一致');

    setLoading(true);
    setMsg('');
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) throw new Error('缺少 Supabase env');
      const { error } = await supabase.auth.updateUser({ password });
      setMsg(error ? `更新失敗：${error.message}` : '密碼已更新 ✅，請重新登入。');
    } catch (e) {
      setMsg(`更新失敗：${e.message}`);
    }
    setLoading(false);
  }

  return (
    <>
      <Meta pageTitle="Reset Password | Simple Info" description="設定新密碼。" path="/reset-password" />
      <Container size="xs" py={48}>
        <Card withBorder shadow="sm" radius="md" p="lg">
          <Stack spacing="md">
            <Title order={2}>重設密碼</Title>
            <Text color="dimmed" size="sm">請輸入新密碼（最少 8 個字元）。</Text>
            <PasswordInput label="New password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
            <PasswordInput label="Confirm password" value={confirm} onChange={(e) => setConfirm(e.currentTarget.value)} />
            <Button onClick={updatePassword} disabled={!password || !confirm || loading}>{loading ? '更新中...' : 'Update password'}</Button>
            {msg ? <Text size="sm" color={msg.includes('失敗') ? 'red' : 'teal'}>{msg}</Text> : null}
          </Stack>
        </Card>
      </Container>
    </>
  );
}
