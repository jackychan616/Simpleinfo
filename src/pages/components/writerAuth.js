import { Button, Group, Text, TextInput } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { buildLoginUrl } from '../../lib/authRedirect';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';
import { useSupabaseSession } from '../../lib/useSupabaseSession';

export default function WriterAuth({ redirectPath = '/writer' }) {
  const router = useRouter();
  const { session } = useSupabaseSession();
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const loginHref = useMemo(() => buildLoginUrl(router.asPath || redirectPath, 'manual_login'), [router.asPath, redirectPath]);

  async function sendEmailCode() {
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
      setMsg(`發送驗證碼失敗：${error.message}`);
      return;
    }

    setMsg('驗證碼已發送，請輸入 6 位數碼登入。');
  }

  async function verifyEmailCode() {
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

    setMsg('登入成功 ✅');
  }

  async function logout() {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    await supabase.auth.signOut();
    setMsg('已登出');
  }

  if (session?.user?.email) {
    return (
      <Group>
        <Text size="sm">已登入：{session.user.email}</Text>
        <Button size="xs" variant="outline" onClick={logout}>
          Logout
        </Button>
      </Group>
    );
  }

  return (
    <Group align="end">
      <TextInput
        label="Email login"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <TextInput
        label="Email OTP"
        placeholder="123456"
        value={otpCode}
        onChange={(e) => setOtpCode(e.currentTarget.value)}
      />
      <Button onClick={sendEmailCode} disabled={!email || loading}>
        {loading ? 'Sending...' : 'Send 驗證碼'}
      </Button>
      <Button onClick={verifyEmailCode} disabled={!email || !otpCode || loading} variant="light">
        驗證碼登入
      </Button>
      <Button component={Link} href={loginHref} variant="subtle">
        Full login page
      </Button>
      {msg ? <Text size="sm">{msg}</Text> : null}
    </Group>
  );
}
