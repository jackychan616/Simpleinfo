import { Badge, Button, Card, Container, Group, Select, Stack, Table, Text, TextInput, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';

export default function AdminRolesPage() {
  const [userEmail, setUserEmail] = useState('');
  const [myRole, setMyRole] = useState('user');
  const [rows, setRows] = useState([]);
  const [targetEmail, setTargetEmail] = useState('');
  const [targetRole, setTargetRole] = useState('writer');
  const [msg, setMsg] = useState('');

  async function loadRoles(currentEmail) {
    const res = await fetch('/api/v2/admin/roles', {
      headers: { 'x-user-email': currentEmail || '' },
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMsg(body?.error || 'failed to load roles');
      setRows([]);
      return;
    }
    setRows(body.data || []);
  }

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    supabase.auth.getUser().then(async ({ data }) => {
      const email = data.user?.email || '';
      setUserEmail(email);
      if (!email) return;

      const roleRes = await fetch(`/api/v2/me/role?email=${encodeURIComponent(email)}`);
      const roleBody = await roleRes.json().catch(() => ({}));
      setMyRole(roleBody.role || 'user');

      if (roleBody.role === 'admin') {
        await loadRoles(email);
      }
    });
  }, []);

  async function saveRole() {
    const res = await fetch('/api/v2/admin/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-email': userEmail,
      },
      body: JSON.stringify({ email: targetEmail, role: targetRole }),
    });
    const body = await res.json().catch(() => ({}));
    setMsg(res.ok ? 'Role updated ✅' : `更新失敗：${body?.error || 'unknown error'}`);
    if (res.ok) {
      setTargetEmail('');
      await loadRoles(userEmail);
    }
  }

  async function removeRole(email) {
    const res = await fetch(`/api/v2/admin/roles?email=${encodeURIComponent(email)}`, {
      method: 'DELETE',
      headers: { 'x-user-email': userEmail },
    });
    const body = await res.json().catch(() => ({}));
    setMsg(res.ok ? 'Role removed' : `刪除失敗：${body?.error || 'unknown error'}`);
    if (res.ok) await loadRoles(userEmail);
  }

  return (
    <Container size="lg" py="xl">
      <Stack spacing="md">
        <Title order={1}>Admin Console · Role Panel</Title>
        <Text color="dimmed">登入：{userEmail || '未登入'} · Role: <Badge>{myRole}</Badge></Text>

        {myRole !== 'admin' ? (
          <Card withBorder>
            <Text color="red">你唔係 admin，無法管理 roles。</Text>
            <Text size="sm" color="dimmed" mt="xs">Admin 功能已隱藏。請用 admin 帳號登入。</Text>
          </Card>
        ) : (
          <>
            <Card withBorder>
              <Group align="end">
                <TextInput label="User Email" placeholder="user@example.com" value={targetEmail} onChange={(e) => setTargetEmail(e.currentTarget.value)} style={{ flex: 1 }} />
                <Select
                  label="Role"
                  value={targetRole}
                  onChange={(v) => setTargetRole(v || 'writer')}
                  data={[
                    { value: 'user', label: 'user' },
                    { value: 'writer', label: 'writer' },
                    { value: 'editor', label: 'editor' },
                    { value: 'admin', label: 'admin' },
                  ]}
                />
                <Button onClick={saveRole} disabled={!targetEmail}>Save</Button>
              </Group>
            </Card>

            <Card withBorder>
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td>{r.email}</td>
                      <td><Badge>{r.role}</Badge></td>
                      <td><Button size="xs" color="red" variant="light" onClick={() => removeRole(r.email)}>Remove</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </>
        )}

        {msg ? <Text size="sm">{msg}</Text> : null}
      </Stack>
    </Container>
  );
}
