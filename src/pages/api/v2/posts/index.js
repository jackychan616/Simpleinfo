import { getSupabaseServer } from '../../../../lib/supabaseServer';
import { hasMinRole, resolveRoleByEmail } from '../../../../lib/rbac';

function toSlug(input) {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default async function handler(req, res) {
  const { client, error } = getSupabaseServer();
  if (!client) return res.status(500).json({ error });

  if (req.method === 'GET') {
    const status = req.query.status || 'published';
    const { data, error: qErr } = await client
      .from('posts')
      .select('*')
      .eq('status', status)
      .order('published_at', { ascending: false })
      .limit(100);

    if (qErr) return res.status(500).json({ error: qErr.message });
    return res.status(200).json({ data: data || [] });
  }

  if (req.method === 'POST') {
    const email = req.headers['x-user-email'];
    const role = await resolveRoleByEmail(email);
    if (!hasMinRole(role, 'writer')) {
      return res.status(403).json({ error: 'writer role required' });
    }

    const { title, excerpt, seoTitle, seoDescription, blocks = [] } = req.body || {};
    const safeTitle = String(title || '').trim();
    if (!safeTitle) return res.status(422).json({ error: 'title is required' });

    const baseSlug = toSlug(safeTitle);
    const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;

    const { data: post, error: insertErr } = await client
      .from('posts')
      .insert({
        author_email: String(email || '').toLowerCase() || null,
        title: safeTitle,
        slug,
        excerpt: excerpt || null,
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
        status: 'draft',
      })
      .select('*')
      .single();

    if (insertErr) return res.status(500).json({ error: insertErr.message });

    if (Array.isArray(blocks) && blocks.length > 0) {
      const rows = blocks.map((b, i) => ({ post_id: post.id, sort_order: i, block: b }));
      await client.from('post_blocks').insert(rows);
    }

    return res.status(201).json({ data: post });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
