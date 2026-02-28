import { Button, Card, Container, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import Link from 'next/link';
import Meta from './components/meta';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { getSupabaseBrowser } from '../lib/supabaseBrowser';
import { useSupabaseSession } from '../lib/useSupabaseSession';

function safeNextPath(next) {
  if (!next || typeof next !== 'string') return '/writer';
  if (!next.startsWith('/')) return '/writer';
  if (next.startsWith('//')) return '/writer';
  return next;
}

export default function LoginPage() {
  const router = useRouter();
  const { session, ready } = useSupabaseSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const nextPath = useMemo(() => safeNextPath(router.query.next), [router.query.next]);
  const reason = useMemo(() => String(router.query.reason || ''), [router.query.reason]);

  useEffect(() => {
    if (ready && session?.user) {
      router.replace(nextPath);
    }
  }, [ready, session, router, nextPath]);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const t = setInterval(() => setCooldown((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  async function sendEmailCode() {
    if (cooldown > 0) {
      setMsg(`請等 ${cooldown}s 再試，避免觸發 email rate limit。`);
      return;
    }

    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setMsg('Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    setLoading(true);
    setMsg('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });

    setLoading(false);
    if (error) {
      const isRateLimit = /rate limit|too many requests/i.test(error.message || '');
      setMsg(isRateLimit ? 'Email 發送太頻密，請稍後再試（可先用 Password/Google 登入）。' : `發送驗證碼失敗：${error.message}`);
      return;
    }

    setCooldown(60);
    setMsg('驗證碼已發送到你電郵，請輸入 6 位數碼登入。');
  }

  async function loginWithEmailCode() {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setMsg('Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    setLoading(true);
    setMsg('');

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: 'email',
    });

    setLoading(false);
    if (error) {
      setMsg(`驗證碼登入失敗：${error.message}`);
      return;
    }

    setMsg('驗證成功，跳轉中...');
    router.replace(nextPath);
  }

  async function loginWithPassword() {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setMsg('Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    setLoading(true);
    setMsg('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      const isInvalid = /invalid login credentials|email not confirmed/i.test(error.message || '');
      setMsg(isInvalid ? '帳號或密碼錯誤，或者 email 未驗證。你可改用 Google 登入。' : `Password 登入失敗：${error.message}`);
      return;
    }

    setMsg('登入成功，跳轉中...');
    router.replace(nextPath);
  }

  async function loginWithGoogle() {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setMsg('Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    const redirectTo = `${window.location.origin}${nextPath}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });

    if (error) {
      setMsg(`Google 登入失敗：${error.message}`);
    }
  }

  return (
    <>
      <Meta pageTitle="Login | Simple Info" description="登入 Simple Info 投稿與管理系統。" path="/login" />
      <Container size="sm" py="xl">
        <Card withBorder radius="md" shadow="sm">
        <Stack spacing="md">
          <Title order={1}>Login</Title>
          {reason === 'session_expired' ? (
            <Text color="orange">你的登入狀態已過期，請重新登入後繼續。</Text>
          ) : null}
          <Text color="dimmed">登入後會自動返回：{nextPath}</Text>

          <TextInput
            label="Email login"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password login"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <TextInput
            label="Email 驗證碼（6位）"
            placeholder="123456"
            value={otpCode}
            onChange={(e) => setOtpCode(e.currentTarget.value)}
          />
          <Group>
            <Button onClick={loginWithPassword} disabled={!email || !password || loading}>
              {loading ? 'Signing in...' : 'Password Login'}
            </Button>
            <Button onClick={sendEmailCode} disabled={!email || loading || cooldown > 0} variant="light">
              {loading ? 'Sending...' : cooldown > 0 ? `請等 ${cooldown}s` : 'Send 驗證碼'}
            </Button>
            <Button onClick={loginWithEmailCode} disabled={!email || !otpCode || loading} variant="light">
              驗證碼登入
            </Button>
            <Button onClick={loginWithGoogle} variant="light">
              Google Login
            </Button>
            <Button component={Link} href="/forgot-password" variant="subtle">
              Forgot password?
            </Button>
            <Button component={Link} href="/writer" variant="subtle">
              Back to writer
            </Button>
          </Group>

          {msg ? <Text size="sm">{msg}</Text> : null}
        </Stack>
      </Card>
    </Container>
    </>
  );
}
