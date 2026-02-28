import { Badge, Button, Card, Container, Group, Select, Stack, Table, Text, TextInput, Title } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import WriterAuth from '../components/writerAuth';
import { handleUnauthorized } from '../../lib/authRedirect';
import { getAccessToken } from '../../lib/supabaseBrowser';
import { useRouter } from 'next/router';

function statusColor(status) {
  if (status === 'approved') return 'green';
  if (status === 'rejected') return 'red';
  return 'yellow';
}

export default function MyPostsPage() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState('');
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    loadMine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadMine() {
    setMsg('');
    const token = await getAccessToken();

    if (!token) {
      setRows([]);
      setMsg('請先登入先可以睇到 My Posts。');
      handleUnauthorized(router);
      return;
    }

    const res = await fetch('/api/writer/submissions?mine=1', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json().catch(() => ({}));

    if (res.status === 401) {
      setRows([]);
      setMsg('登入狀態已過期，請重新登入。');
      handleUnauthorized(router);
      return;
    }

    if (!res.ok) {
      setRows([]);
      setMsg(`讀取失敗：${body?.error || 'unknown error'}`);
      return;
    }

    setRows(body.data || []);
  }

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return rows.filter((item) => {
      const passStatus = status === 'all' || item.status === status;
      const passKeyword = !q || String(item.title || '').toLowerCase().includes(q) || String(item.category || '').toLowerCase().includes(q);
      return passStatus && passKeyword;
    });
  }, [rows, keyword, status]);

  return (
    <Container size="lg" py="xl">
      <Stack spacing="md">
        <Group position="apart">
          <Title order={1}>My Posts</Title>
          <Group>
            <Button component={Link} href="/writer/new">新增投稿</Button>
            <Button component={Link} href="/writer/submissions" variant="light">全部投稿</Button>
          </Group>
        </Group>

        <Group>
          <Select
            value={status}
            onChange={(v) => setStatus(v || 'all')}
            data={[
              { value: 'all', label: '全部狀態' },
              { value: 'pending_review', label: '待審核' },
              { value: 'approved', label: '已通過' },
              { value: 'rejected', label: '已拒絕' },
            ]}
          />
          <TextInput placeholder="搜尋標題 / 分類" value={keyword} onChange={(e) => setKeyword(e.currentTarget.value)} />
        </Group>

        <WriterAuth redirectPath="/writer/my-posts" />
        {msg ? <Text size="sm" color={msg.includes('失敗') ? 'red' : 'dimmed'}>{msg}</Text> : null}

        <Card withBorder radius="md" shadow="sm">
          {filtered.length === 0 ? (
            <Text color="dimmed">目前未有你的投稿。</Text>
          ) : (
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>標題</th>
                  <th>分類</th>
                  <th>建立時間</th>
                  <th>狀態</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{new Date(item.created_at).toLocaleString()}</td>
                    <td><Badge color={statusColor(item.status)}>{item.status}</Badge></td>
                    <td>
                      <Button size="xs" variant="subtle" component={Link} href={`/writer/submissions/${item.id}`}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      </Stack>
    </Container>
  );
}
