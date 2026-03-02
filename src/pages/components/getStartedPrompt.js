import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';

const DISMISS_KEY = 'si_get_started_dismiss_until';
const SHOWN_KEY = 'si_get_started_shown_date';

function isBlogPath(pathname = '') {
  return pathname.startsWith('/community/') || pathname.startsWith('/content/');
}

export default function GetStartedPrompt() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  const shouldCheck = useMemo(() => isBlogPath(router.pathname), [router.pathname]);

  useEffect(() => {
    let canceled = false;
    const supabase = getSupabaseBrowser();

    async function check() {
      if (!shouldCheck) {
        setReady(true);
        setLoggedIn(true);
        return;
      }

      if (!supabase) {
        setReady(true);
        setLoggedIn(false);
        return;
      }

      const { data } = await supabase.auth.getUser();
      if (canceled) return;
      setLoggedIn(Boolean(data.user));
      setReady(true);
    }

    check();
    return () => {
      canceled = true;
    };
  }, [shouldCheck]);

  useEffect(() => {
    if (!ready || loggedIn || !shouldCheck) return;

    const now = Date.now();
    const dismissUntil = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (dismissUntil > now) return;

    const today = new Date().toISOString().slice(0, 10);
    const shownDate = localStorage.getItem(SHOWN_KEY);
    if (shownDate === today) return;

    const timer = setTimeout(() => {
      setOpened(true);
      localStorage.setItem(SHOWN_KEY, today);
    }, 8000);

    return () => clearTimeout(timer);
  }, [ready, loggedIn, shouldCheck]);

  if (!ready || loggedIn || !shouldCheck) return null;

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="想開始投稿？" centered>
      <Stack spacing="sm">
        <Text size="sm" color="dimmed">
          用 Google 30 秒登入，就可以收藏、投稿同管理內容。唔使而家都可以，之後再開始都得。
        </Text>
        <Group grow>
          <Button component={Link} href={`/login?next=${encodeURIComponent(router.asPath || '/')}`} onClick={() => setOpened(false)}>
            Google 登入
          </Button>
          <Button component={Link} href="/register" variant="light" onClick={() => setOpened(false)}>
            建立帳戶
          </Button>
        </Group>
        <Button
          variant="subtle"
          onClick={() => {
            localStorage.setItem(DISMISS_KEY, String(Date.now() + 7 * 24 * 60 * 60 * 1000));
            setOpened(false);
          }}
        >
          7日內不再提示
        </Button>
      </Stack>
    </Modal>
  );
}
