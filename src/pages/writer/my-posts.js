import { Badge, Button, Card, Container, Group, Stack, Table, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import WriterAuth from '../components/writerAuth';
import { getAccessToken } from '../../lib/supabaseBrowser';

function statusColor(status) {
  if (status === 'approved') return 'green';
  if (status === 'rejected') return 'red';
  return 'yellow';
}

export default function MyPostsPage() {
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    loadMine();
  }, []);

  async function loadMine() {
    setMsg('');
    const token = await getAccessToken();

    if (!token) {
      setRows([]);
      setMsg('請先登入先可以睇到 My Posts。');
      return;
    }

    const res = await fetch('/api/writer/submissions?mine=1', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      setRows([]);
      setMsg(`讀取失敗：${body?.error || 'unknown error'}`);
      return;
    }

    setRows(body.data || []);
  }

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

        <WriterAuth />
        {msg ? <Text size="sm" color={msg.includes('失敗') ? 'red' : 'dimmed'}>{msg}</Text> : null}

        <Card withBorder radius="md" shadow="sm">
          {rows.length === 0 ? (
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
                {rows.map((item) => (
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
