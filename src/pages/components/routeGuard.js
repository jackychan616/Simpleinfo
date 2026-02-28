import { Center, Loader, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCurrentRoleSafe, getCurrentUserSafe, onAuthStateChange } from '../../lib/authClient';

export default function RouteGuard({ children, requireLogin = false, minRole = null }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function check() {
      const user = await getCurrentUserSafe();
      if (!mounted) return;

      if (requireLogin && !user) {
        setAllowed(false);
        setReady(true);
        router.replace(`/login?next=${encodeURIComponent(router.asPath)}`);
        return;
      }

      if (minRole && user?.email) {
        const role = await getCurrentRoleSafe(user.email);
        if (!mounted) return;

        const rank = { user: 1, writer: 2, editor: 3, admin: 4 };
        if ((rank[role] || 0) < (rank[minRole] || 99)) {
          setAllowed(false);
          setReady(true);
          router.replace('/');
          return;
        }
      }

      setAllowed(true);
      setReady(true);
    }

    check();
    const unsub = onAuthStateChange(() => check());

    return () => {
      mounted = false;
      unsub?.();
    };
  }, [requireLogin, minRole, router]);

  if (!ready) {
    return (
      <Center py={80}>
        <Stack align="center" spacing="xs">
          <Loader />
          <Text size="sm" color="dimmed">Checking access...</Text>
        </Stack>
      </Center>
    );
  }

  if (!allowed) return null;
  return children;
}
