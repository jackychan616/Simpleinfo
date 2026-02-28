import { Button, Card, Container, Stack, Text, TextInput, Title } from '@mantine/core';
import { useState } from 'react';
import { getSupabaseBrowser } from '../lib/supabaseBrowser';
import Meta from './components/meta';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendReset() {
    setLoading(true);
    setMsg('');
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) throw new Error('缺少 Supabase env');
      const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      setMsg(error ? `發送失敗：${error.message}` : '重設連結已發送，請檢查電郵。');
    } catch (e) {
      setMsg(`發送失敗：${e.message}`);
    }
    setLoading(false);
  }

  return (
    <>
      <Meta pageTitle="Forgot Password | Simple Info" description="重設 Simple Info 帳號密碼。" path="/forgot-password" />
      <Container size="xs" py={48}>
        <Card withBorder shadow="sm" radius="md" p="lg">
          <Stack spacing="md">
            <Title order={2}>忘記密碼</Title>
            <Text color="dimmed" size="sm">輸入你的 email，我們會發送重設密碼連結。</Text>
            <TextInput label="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
            <Button onClick={sendReset} disabled={!email || loading}>{loading ? '發送中...' : 'Send reset link'}</Button>
            {msg ? <Text size="sm" color={msg.includes('失敗') ? 'red' : 'teal'}>{msg}</Text> : null}
          </Stack>
        </Card>
      </Container>
    </>
  );
}
