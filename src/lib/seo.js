const SITE_URL = 'https://simpleinfohk.me';

export function normalizePath(path = '/') {
  if (!path) return '/';
  if (/^https?:\/\//i.test(path)) {
    try {
      return new URL(path).pathname || '/';
    } catch (_) {
      return '/';
    }
  }

  const [withoutQuery] = String(path).split('?');
  const [cleanPath] = withoutQuery.split('#');
  if (!cleanPath) return '/';
  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
}

export function buildCanonicalUrl(path = '/') {
  const normalized = normalizePath(path);
  return `${SITE_URL}${normalized}`;
}

export { SITE_URL };
