const buckets = new Map();

export function checkRateLimit(key, { windowMs = 60_000, max = 30 } = {}) {
  const now = Date.now();
  const row = buckets.get(key);

  if (!row || now > row.resetAt) {
    const next = { count: 1, resetAt: now + windowMs };
    buckets.set(key, next);
    return { allowed: true, remaining: max - 1, resetAt: next.resetAt };
  }

  row.count += 1;
  if (row.count > max) {
    return { allowed: false, remaining: 0, resetAt: row.resetAt };
  }

  return { allowed: true, remaining: max - row.count, resetAt: row.resetAt };
}
