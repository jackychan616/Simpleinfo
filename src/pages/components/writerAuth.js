import { Button, Group, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { buildLoginUrl } from '../../lib/authRedirect';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';
import { useSupabaseSession } from '../../lib/useSupabaseSession';

export default function WriterAuth({ redirectPath = '/writer' }) {
  const router = useRouter();
  const { session } = useSupabaseSession();
  const [msg, setMsg] = useState('');

  const loginHref = useMemo(() => buildLoginUrl(router.asPath || redirectPath, 'manual_login'), [router.asPath, redirectPath]);

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
      <Button component={Link} href={loginHref}>
        去 Login（Password / Google）
      </Button>
      {msg ? <Text size="sm">{msg}</Text> : null}
    </Group>
  );
}
