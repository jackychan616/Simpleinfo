import { Badge, Button, Card, Container, Group, Pagination, Select, Stack, Table, Text, TextInput, Title } from '@mantine/core';
import RouteGuard from '../components/routeGuard';
import { showNotification } from '@mantine/notifications';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import WriterAuth from '../components/writerAuth';
import { handleUnauthorized } from '../../lib/authRedirect';
import { getAccessToken } from '../../lib/supabaseBrowser';
import { useRouter } from 'next/router';

export default function AdminRolesPage() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0, totalPages: 1 });

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function authedFetch(url, options = {}) {
    const token = await getAccessToken();
    if (!token) {
      handleUnauthorized(router);
      return null;
    }

    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    if (res.status === 401) {
      handleUnauthorized(router);
      return null;
    }

    return res;
  }

  async function load(nextPage = pagination.page, nextQuery = query) {
    setLoading(true);
    const qs = new URLSearchParams({ page: String(nextPage), pageSize: String(pagination.pageSize) });
    if (nextQuery.trim()) qs.set('q', nextQuery.trim());

    const res = await authedFetch(`/api/admin/roles?${qs.toString()}`);
    if (!res) {
      setLoading(false);
      return;
    }

    const body = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      showNotification({ title: '讀取角色失敗', message: body?.error || 'unknown error', color: 'red' });
      return;
    }

    setRows(body.data || []);
    setPagination(body.pagination || { page: 1, pageSize: 10, total: 0, totalPages: 1 });
  }

  async function addOrUpdateRole() {
    const res = await authedFetch('/api/admin/roles', {
      method: 'POST',
      body: JSON.stringify({ email: email.trim(), role }),
    });
    if (!res) return;

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      showNotification({ title: '更新角色失敗', message: body?.error || 'unknown error', color: 'red' });
      return;
    }

    setEmail('');
    showNotification({ title: '角色已更新', message: `${body?.data?.email || ''} → ${body?.data?.role || role}`, color: 'teal' });
    load(1, query);
  }

  async function removeRole(targetEmail) {
    const res = await authedFetch(`/api/admin/roles?email=${encodeURIComponent(targetEmail)}`, { method: 'DELETE' });
    if (!res) return;

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      showNotification({ title: '刪除角色失敗', message: body?.error || 'unknown error', color: 'red' });
      return;
    }

    showNotification({ title: '角色已刪除', message: targetEmail, color: 'teal' });
    load(pagination.page, query);
  }

  return (
    <RouteGuard requireLogin minRole="admin">
      <Container size="lg" py="xl">
        <Stack spacing="md">
        <Group position="apart">
          <Title order={1}>Admin Roles</Title>
          <Group>
            <Button component={Link} href="/writer/submissions">管理投稿</Button>
            <Button component={Link} href="/writer" variant="light">Writer Dashboard</Button>
          </Group>
        </Group>

        <WriterAuth redirectPath="/writer/admin-roles" />

        <Card withBorder>
          <Stack>
            <Group grow>
              <TextInput label="Email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
              <Select label="Role" value={role} onChange={(v) => setRole(v || 'admin')} data={[{ value: 'admin', label: 'admin' }]} />
              <Button onClick={addOrUpdateRole} mt={24}>新增 / 更新角色</Button>
            </Group>

            <Group position="apart">
              <TextInput
                placeholder="搜尋 email"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') load(1, query);
                }}
              />
              <Button variant="light" onClick={() => load(1, query)} loading={loading}>搜尋</Button>
            </Group>

            {rows.length === 0 ? (
              <Text color="dimmed">目前無角色資料。</Text>
            ) : (
              <>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.id}>
                        <td>{row.email}</td>
                        <td><Badge color="blue">{row.role || 'admin'}</Badge></td>
                        <td>{row.created_at ? new Date(row.created_at).toLocaleString() : '-'}</td>
                        <td>
                          <Button size="xs" color="red" variant="light" onClick={() => removeRole(row.email)}>
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Group position="apart">
                  <Text size="sm" color="dimmed">共 {pagination.total} 筆</Text>
                  <Pagination
                    page={pagination.page}
                    total={Math.max(1, pagination.totalPages || 1)}
                    onChange={(next) => load(next, query)}
                  />
                </Group>
              </>
            )}
          </Stack>
        </Card>
        </Stack>
      </Container>
    </RouteGuard>
  );
}
