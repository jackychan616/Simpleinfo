import { Badge, Button, Card, Container, Group, Select, Stack, Table, Text, TextInput, Title } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';
import RouteGuard from '../components/routeGuard';

export default function AdminRolesPage() {
  const [userEmail, setUserEmail] = useState('');
  const [myRole, setMyRole] = useState('user');
  const [rows, setRows] = useState([]);
  const [logs, setLogs] = useState([]);
  const [targetEmail, setTargetEmail] = useState('');
  const [targetRole, setTargetRole] = useState('writer');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState('');

  async function loadRoles(currentEmail) {
    const res = await fetch('/api/v2/admin/roles', {
      headers: { 'x-user-email': currentEmail || '' },
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMsg(body?.error || 'failed to load roles');
      setRows([]);
      setLogs([]);
      return;
    }
    setRows(body.data || []);
    setLogs(body.logs || []);
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
    if (!window.confirm(`確定移除 ${email} 的角色？`)) return;
    const res = await fetch(`/api/v2/admin/roles?email=${encodeURIComponent(email)}`, {
      method: 'DELETE',
      headers: { 'x-user-email': userEmail },
    });
    const body = await res.json().catch(() => ({}));
    setMsg(res.ok ? 'Role removed' : `刪除失敗：${body?.error || 'unknown error'}`);
    if (res.ok) await loadRoles(userEmail);
  }

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => String(r.email || '').toLowerCase().includes(q) || String(r.role || '').toLowerCase().includes(q));
  }, [rows, search]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <RouteGuard requireLogin minRole="admin">
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
              <Group mb="sm" position="apart">
                <TextInput placeholder="搜尋 email / role" value={search} onChange={(e) => { setSearch(e.currentTarget.value); setPage(1); }} style={{ flex: 1, maxWidth: 320 }} />
                <Text size="sm" color="dimmed">{filteredRows.length} results</Text>
              </Group>
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedRows.map((r) => (
                    <tr key={r.id}>
                      <td>{r.email}</td>
                      <td><Badge>{r.role}</Badge></td>
                      <td><Button size="xs" color="red" variant="light" onClick={() => removeRole(r.email)}>Remove</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Group mt="sm" position="apart">
                <Button variant="light" size="xs" disabled={currentPage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
                <Text size="xs" color="dimmed">Page {currentPage}/{totalPages}</Text>
                <Button variant="light" size="xs" disabled={currentPage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
              </Group>
            </Card>

            <Card withBorder>
              <Text size="sm" mb="xs" color="dimmed">Recent role audit logs</Text>
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Actor</th>
                    <th>Target</th>
                    <th>Action</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td>{new Date(log.created_at).toLocaleString()}</td>
                      <td>{log.actor_email || '-'}</td>
                      <td>{log.target_email}</td>
                      <td>{log.action}</td>
                      <td>{log.previous_role || '-'} → {log.new_role || '-'}</td>
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
    </RouteGuard>
  );
}
