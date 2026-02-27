import { getSupabaseServer } from '../../../../lib/supabaseServer';
import { blocksToPlainText, normalizeBlocks } from '../../../../lib/contentBlocks';

const ALLOWED_CATEGORIES = new Set(['ai', 'gaming', 'tech']);

export default async function handler(req, res) {
  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  if (req.method === 'GET') {
    const status = req.query.status;
    const authorEmail = req.query.authorEmail;

    let query = client.from('writer_submissions').select('*').order('created_at', { ascending: false }).limit(200);
    if (status && status !== 'all') query = query.eq('status', status);
    if (authorEmail) query = query.eq('author_email', authorEmail);

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data: data || [] });
  }

  if (req.method === 'POST') {
    const { title, category, content, contentBlocks } = req.body || {};
    const userEmail = req.headers['x-user-email'];
    const userId = req.headers['x-user-id'];

    const safeTitle = String(title || '').trim();
    const normalizedBlocks = normalizeBlocks(contentBlocks);
    const generatedContent = blocksToPlainText(normalizedBlocks);
    const safeContent = String(content || generatedContent || '').trim();
    const safeCategory = ALLOWED_CATEGORIES.has(category) ? category : 'ai';

    if (!safeTitle || !safeContent) return res.status(422).json({ error: 'title and content are required' });
    if (safeTitle.length > 120) return res.status(422).json({ error: 'title must be <= 120 chars' });
    if (safeContent.length > 10000) return res.status(422).json({ error: 'content must be <= 10000 chars' });
    if (!userEmail) return res.status(401).json({ error: 'Login required (missing user email)' });

    const payload = {
      title: safeTitle,
      category: safeCategory,
      content: safeContent,
      status: 'pending_review',
      author_id: userId ? String(userId) : null,
      author_email: String(userEmail),
    };

    if (normalizedBlocks.length > 0) payload.content_blocks = normalizedBlocks;

    const { data, error } = await client
      .from('writer_submissions')
      .insert(payload)
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
