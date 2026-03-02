import { Badge, Button, Card, Container, Group, Pagination, Select, Stack, Table, Text, TextInput, Title, ScrollArea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import WriterAuth from '../components/writerAuth';
import { handleUnauthorized } from '../../lib/authRedirect';
import { getAccessToken } from '../../lib/supabaseBrowser';
import { useSupabaseSession } from '../../lib/useSupabaseSession';
import { useRouter } from 'next/router';

const PAGE_SIZE = 10;

function statusColor(status) {
  if (status === 'approved') return 'green';
  if (status === 'rejected') return 'red';
  return 'yellow';
}

export default function WriterSubmissionsPage() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState('');
  const { session } = useSupabaseSession();
  const isMobile = useMediaQuery('(max-width: 768px)');

  async function load(nextFilter = filter) {
    const query = nextFilter && nextFilter !== 'all' ? `?status=${nextFilter}` : '';
    const res = await fetch(`/api/writer/submissions${query}`);
    const body = await res.json().catch(() => ({}));
    setRows(body.data || []);
  }

  useEffect(() => {
    load('all');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateStatus(id, status) {
    const token = await getAccessToken();
    if (!token) {
      setMsg('更新失敗：請先登入 admin 帳號');
      handleUnauthorized(router, '登入已過期，請重新登入再審核。');
      return;
    }

    const res = await fetch(`/api/writer/submissions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const body = await res.json().catch(() => ({}));
    if (res.status === 401) {
      handleUnauthorized(router, '登入已過期，請重新登入再審核。');
      return;
    }

    if (!res.ok) {
      const error = body?.error || 'unknown error';
      setMsg(`更新失敗：${error}`);
      showNotification({ title: '審核失敗', message: error, color: 'red' });
      return;
    }

    setMsg(`已更新狀態：${status}`);
    showNotification({ title: '審核成功', message: `已更新為 ${status}`, color: 'teal' });
    await load(filter);
  }

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    const byStatus = filter === 'all' ? rows : rows.filter((r) => r.status === filter);
    if (!q) return byStatus;
    return byStatus.filter((r) => String(r.title || '').toLowerCase().includes(q) || String(r.author_email || '').toLowerCase().includes(q));
  }, [rows, filter, keyword]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const adminAllowlist = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const sessionEmail = session?.user?.email || '';
  const isAdmin = adminAllowlist.includes(sessionEmail.toLowerCase());

  return (
    <Container size="lg" py="xl">
      <Stack spacing="md">
        <Group position="apart" align="end">
          <div>
            <Title order={1}>Admin 角色與投稿管理</Title>
            <Text color="dimmed">Admin 可審核（approved / rejected），server 會做 email allowlist hard check。</Text>
          </div>
          <Group style={{ width: isMobile ? '100%' : 'auto' }}>
            <Select
              value={filter}
              onChange={(v) => {
                const next = v || 'all';
                setFilter(next);
                setPage(1);
                load(next);
              }}
              data={[
                { value: 'all', label: '全部' },
                { value: 'pending_review', label: '待審核' },
                { value: 'approved', label: '已通過' },
                { value: 'rejected', label: '已拒絕' },
              ]}
              style={{ minWidth: isMobile ? '100%' : 140 }}
            />
            <TextInput placeholder="搜尋標題 / 作者" value={keyword} onChange={(e) => { setKeyword(e.currentTarget.value); setPage(1); }} style={{ minWidth: isMobile ? '100%' : 220 }} />
            <Button component={Link} href="/writer/new" fullWidth={isMobile}>新增投稿</Button>
            <Button component={Link} href="/writer/my-posts" variant="light" fullWidth={isMobile}>My Posts</Button>
            <Button component={Link} href="/writer/admin-roles" variant="light" fullWidth={isMobile}>Admin Roles</Button>
          </Group>
        </Group>

        <WriterAuth redirectPath="/writer/submissions" />

        {msg ? <Text size="sm">{msg}</Text> : null}
        {!isAdmin ? <Text size="sm" color="orange">你而家唔係 admin，無法 approve/reject。</Text> : null}

        <Card withBorder radius="md" shadow="sm">
          {pagedRows.length === 0 ? (
            <Text color="dimmed">目前冇投稿資料。可以先去「新增投稿」建立第一篇。</Text>
          ) : (
            <>
              {isMobile ? (
                <Stack spacing="sm">
                  {pagedRows.map((item) => (
                    <Card key={item.id} withBorder radius="md">
                      <Stack spacing={6}>
                        <Text fw={600}>{item.title}</Text>
                        <Text size="xs" color="dimmed">分類：{item.category}｜作者：{item.author_email || '-'}</Text>
                        <Text size="xs" color="dimmed">{new Date(item.created_at).toLocaleString()}</Text>
                        <Badge color={statusColor(item.status)}>{item.status}</Badge>
                        <Group spacing="xs">
                          <Button size="xs" variant="subtle" component={Link} href={`/writer/submissions/${item.id}`}>View</Button>
                          {isAdmin ? <Button size="xs" color="green" variant="light" onClick={() => updateStatus(item.id, 'approved')}>Approve</Button> : null}
                          {isAdmin ? <Button size="xs" color="red" variant="light" onClick={() => updateStatus(item.id, 'rejected')}>Reject</Button> : null}
                          {item.status === 'approved' ? <Button size="xs" component={Link} href={`/community/${item.id}`} variant="outline">Public</Button> : null}
                        </Group>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <ScrollArea>
                  <Table striped highlightOnHover miw={980}>
                    <thead>
                      <tr>
                        <th>標題</th>
                        <th>分類</th>
                        <th>作者</th>
                        <th>建立時間</th>
                        <th>狀態</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedRows.map((item) => (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>{item.category}</td>
                          <td>{item.author_email || '-'}</td>
                          <td>{new Date(item.created_at).toLocaleString()}</td>
                          <td>
                            <Badge color={statusColor(item.status)}>{item.status}</Badge>
                          </td>
                          <td>
                            <Group spacing="xs">
                              <Button size="xs" variant="subtle" component={Link} href={`/writer/submissions/${item.id}`}>
                                View
                              </Button>
                              {isAdmin ? (
                                <>
                                  <Button size="xs" color="green" variant="light" onClick={() => updateStatus(item.id, 'approved')}>
                                    Approve
                                  </Button>
                                  <Button size="xs" color="red" variant="light" onClick={() => updateStatus(item.id, 'rejected')}>
                                    Reject
                                  </Button>
                                </>
                              ) : null}
                              {item.status === 'approved' ? (
                                <Button size="xs" component={Link} href={`/community/${item.id}`} variant="outline">
                                  Public
                                </Button>
                              ) : null}
                            </Group>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </ScrollArea>
              )}
              <Group position="apart" mt="md">
                <Text size="sm" color="dimmed">共 {filtered.length} 筆</Text>
                <Pagination page={currentPage} onChange={setPage} total={totalPages} />
              </Group>
            </>
          )}
        </Card>
      </Stack>
    </Container>
  );
}
