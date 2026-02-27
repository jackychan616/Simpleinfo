import { resolveRoleByEmail } from '../../../../lib/rbac';

export default async function handler(req, res) {
  const email = req.headers['x-user-email'] || req.query.email;
  const role = await resolveRoleByEmail(email);
  return res.status(200).json({ email: email || null, role });
}
