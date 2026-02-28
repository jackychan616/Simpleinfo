import { getSupabaseServer, getUserFromRequest, isAdminEmailWithDb } from '../../../lib/supabaseServer';

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

function parsePage(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.floor(n);
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function requireAdmin(req, res, client) {
  const { user, error } = await getUserFromRequest(req);
  if (!user) {
    res.status(401).json({ error: error || 'Unauthorized' });
    return null;
  }

  const isAdmin = await isAdminEmailWithDb(user.email, client);
  if (!isAdmin) {
    res.status(403).json({ error: 'Only admin can access roles page' });
    return null;
  }

  return user;
}

export default async function handler(req, res) {
  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  const user = await requireAdmin(req, res, client);
  if (!user) return;

  if (req.method === 'GET') {
    const q = String(req.query.q || '').trim().toLowerCase();
    const page = parsePage(req.query.page, 1);
    const pageSize = Math.min(parsePage(req.query.pageSize, DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE);

    let countQuery = client.from('admin_roles').select('id', { count: 'exact', head: true });
    let dataQuery = client
      .from('admin_roles')
      .select('id, email, role, created_at')
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (q) {
      countQuery = countQuery.ilike('email', `%${q}%`);
      dataQuery = dataQuery.ilike('email', `%${q}%`);
    }

    const [{ count, error: countError }, { data, error: dataError }] = await Promise.all([countQuery, dataQuery]);

    const dbError = countError || dataError;
    if (dbError) {
      return res.status(500).json({
        error: dbError.message,
        hint: 'If table not found, create table admin_roles (email text unique, role text, created_at timestamptz default now()).',
      });
    }

    return res.status(200).json({
      data: data || [],
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages: Math.max(1, Math.ceil((count || 0) / pageSize)),
      },
    });
  }

  if (req.method === 'POST') {
    const email = normalizeEmail(req.body?.email);
    const role = String(req.body?.role || 'admin').trim().toLowerCase() || 'admin';

    if (!validateEmail(email)) return res.status(422).json({ error: 'valid email is required' });

    const { data, error } = await client
      .from('admin_roles')
      .upsert({ email, role }, { onConflict: 'email' })
      .select('id, email, role, created_at')
      .single();

    if (error) {
      return res.status(500).json({
        error: error.message,
        hint: 'If upsert fails, add UNIQUE(email) on admin_roles.',
      });
    }

    return res.status(200).json({ data });
  }

  if (req.method === 'DELETE') {
    const email = normalizeEmail(req.query.email || req.body?.email);
    if (!validateEmail(email)) return res.status(422).json({ error: 'valid email is required' });

    const { error } = await client.from('admin_roles').delete().eq('email', email);
    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ data: { email } });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
