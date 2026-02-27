import { getSupabaseServer } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  const { topic, category = 'ai', tone = 'professional', length = 'medium', scheduledAt = null } = req.body || {};
  if (!topic) return res.status(422).json({ error: 'topic is required' });

  const { data, error } = await client
    .from('ai_blog_queue')
    .insert({
      topic: String(topic).trim(),
      category,
      tone,
      length,
      status: 'pending',
      scheduled_at: scheduledAt,
    })
    .select('*')
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json({ data });
}
