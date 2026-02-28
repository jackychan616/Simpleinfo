import { Button, Card, Container, Stack, Text, TextInput, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '../lib/supabaseBrowser';
import Meta from './components/meta';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const t = setInterval(() => setCooldown((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  async function sendReset() {
    if (cooldown > 0) {
      setMsg(`請等 ${cooldown}s 再試，避免觸發 email rate limit。`);
      return;
    }

    setLoading(true);
    setMsg('');
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) throw new Error('缺少 Supabase env');
      const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) {
        const isRateLimit = /rate limit|too many requests/i.test(error.message || '');
        setMsg(isRateLimit ? 'Email 發送太頻密，請稍後再試（可先用 Password/Google 登入）。' : `發送失敗：${error.message}`);
      } else {
        setCooldown(60);
        setMsg('重設連結已發送，請檢查電郵。');
      }
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
            <Button onClick={sendReset} disabled={!email || loading || cooldown > 0}>{loading ? '發送中...' : cooldown > 0 ? `請等 ${cooldown}s` : 'Send reset link'}</Button>
            {msg ? <Text size="sm" color={msg.includes('失敗') ? 'red' : 'teal'}>{msg}</Text> : null}
          </Stack>
        </Card>
      </Container>
    </>
  );
}
