import { getSupabaseServer, getUserFromRequest } from '../../../../lib/supabaseServer';

const ALLOWED_CATEGORIES = new Set(['ai', 'gaming', 'tech']);

export default async function handler(req, res) {
  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  if (req.method === 'GET') {
    const status = req.query.status;
    const mine = req.query.mine === '1' || req.query.mine === 'true';

    let query = client.from('writer_submissions').select('*').order('created_at', { ascending: false }).limit(200);

    if (status && status !== 'all') query = query.eq('status', status);

    if (mine) {
      const { user, error } = await getUserFromRequest(req);
      if (!user) return res.status(401).json({ error: error || 'Unauthorized' });
      query = query.eq('author_id', user.id);
    }

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data: data || [] });
  }

  if (req.method === 'POST') {
    const { title, category, content } = req.body || {};
    const safeTitle = String(title || '').trim();
    const safeContent = String(content || '').trim();
    const safeCategory = ALLOWED_CATEGORIES.has(category) ? category : 'ai';

    if (!safeTitle || !safeContent) return res.status(422).json({ error: 'title and content are required' });
    if (safeTitle.length > 120) return res.status(422).json({ error: 'title must be <= 120 chars' });
    if (safeContent.length > 10000) return res.status(422).json({ error: 'content must be <= 10000 chars' });

    const { user, error: authError } = await getUserFromRequest(req);
    if (!user) return res.status(401).json({ error: authError || 'Unauthorized' });

    const { data, error } = await client
      .from('writer_submissions')
      .insert({
        title: safeTitle,
        category: safeCategory,
        content: safeContent,
        status: 'pending_review',
        author_id: user.id,
        author_email: user.email || null,
      })
      .select('*')
      .single();

    if (error) {
      return res.status(500).json({
        error: error.message,
        hint: 'If table not found, create table writer_submissions in Supabase first.',
      });
    }

    return res.status(201).json({ data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
