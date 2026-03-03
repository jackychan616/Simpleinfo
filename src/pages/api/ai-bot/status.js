import { getSupabaseServer } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  const [{ data, error }, { data: latest, error: latestErr }] = await Promise.all([
    client.from('ai_blog_queue').select('status'),
    client
      .from('ai_blog_queue')
      .select('id,topic,status,scheduled_at,processed_at,error_message,updated_at,generated_submission_id')
      .order('created_at', { ascending: false })
      .limit(20),
  ]);

  if (error) return res.status(500).json({ error: error.message });
  if (latestErr) return res.status(500).json({ error: latestErr.message });

  const counts = (data || []).reduce((acc, row) => {
    acc[row.status] = (acc[row.status] || 0) + 1;
    return acc;
  }, {});

  const submissionIds = [...new Set((latest || []).map((x) => x.generated_submission_id).filter(Boolean))];
  let submissionMap = {};

  if (submissionIds.length > 0) {
    const { data: submissions } = await client
      .from('writer_submissions')
      .select('id,status,slug,title')
      .in('id', submissionIds);

    submissionMap = (submissions || []).reduce((acc, row) => {
      acc[row.id] = row;
      return acc;
    }, {});
  }

  const normalizedLatest = (latest || []).map((item) => ({
    ...item,
    submission_status: item.generated_submission_id ? submissionMap[item.generated_submission_id]?.status || null : null,
    submission_slug: item.generated_submission_id ? submissionMap[item.generated_submission_id]?.slug || null : null,
    submission_title: item.generated_submission_id ? submissionMap[item.generated_submission_id]?.title || null : null,
  }));

  return res.status(200).json({ counts, latest: normalizedLatest });
}
