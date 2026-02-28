import { showNotification } from '@mantine/notifications';

export function buildLoginUrl(nextPath, reason = 'session_expired') {
  const params = new URLSearchParams();
  if (nextPath) params.set('next', nextPath);
  if (reason) params.set('reason', reason);
  const q = params.toString();
  return q ? `/login?${q}` : '/login';
}

export function handleUnauthorized(router, message = '登入已過期，請重新登入。') {
  const nextPath = router?.asPath || '/writer';
  showNotification({
    title: 'Session expired',
    message,
    color: 'orange',
  });
  router?.push(buildLoginUrl(nextPath));
}
