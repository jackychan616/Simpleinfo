import { getSupabaseServer, getUserFromRequest, isAdminEmail } from '../../../../lib/supabaseServer';

const WRITABLE_STATUSES = ['approved', 'rejected'];

export default async function handler(req, res) {
  const { client, error: envError } = getSupabaseServer();
  if (!client) return res.status(500).json({ error: envError });

  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await client
      .from('writer_submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
  }

  if (req.method === 'PATCH') {
    const { status } = req.body || {};
    if (!id || !status) return res.status(422).json({ error: 'id and status are required' });
    if (!WRITABLE_STATUSES.includes(status)) {
      return res.status(422).json({ error: 'status must be approved or rejected' });
    }

    const { user, error: authError } = await getUserFromRequest(req);
    if (!user) return res.status(401).json({ error: authError || 'Unauthorized' });

    if (!isAdminEmail(user.email)) {
      return res.status(403).json({ error: 'Only admin can approve/reject' });
    }

    const { data, error } = await client
      .from('writer_submissions')
      .update({ status })
      .eq('id', id)
      .select('*')
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
