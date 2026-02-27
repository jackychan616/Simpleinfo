import { Badge, Button, Card, Container, Group, Select, Stack, Table, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const KEY = 'simpleinfo_writer_drafts';

function statusColor(status) {
  if (status === 'approved') return 'green';
  if (status === 'rejected') return 'red';
  return 'yellow';
}

export default function WriterSubmissionsPage() {
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState('all');

  function load() {
    const data = JSON.parse(localStorage.getItem(KEY) || '[]');
    setRows(data);
  }

  useEffect(() => {
    load();
  }, []);

  function updateStatus(id, status) {
    const data = JSON.parse(localStorage.getItem(KEY) || '[]');
    const updated = data.map((item) => (item.id === id ? { ...item, status } : item));
    localStorage.setItem(KEY, JSON.stringify(updated));
    setRows(updated);
  }

  const filtered = useMemo(() => {
    if (filter === 'all') return rows;
    return rows.filter((r) => r.status === filter);
  }, [rows, filter]);

  return (
    <Container size="lg" py="xl">
      <Stack spacing="md">
        <Group position="apart" align="end">
          <div>
            <Title order={1}>投稿管理</Title>
            <Text color="dimmed">目前為本機 mock 審核流程（pending / approved / rejected）。</Text>
          </div>
          <Group>
            <Select
              value={filter}
              onChange={(v) => setFilter(v || 'all')}
              data={[
                { value: 'all', label: '全部' },
                { value: 'pending_review', label: '待審核' },
                { value: 'approved', label: '已通過' },
                { value: 'rejected', label: '已拒絕' },
              ]}
            />
            <Button component={Link} href="/writer/new">新增投稿</Button>
          </Group>
        </Group>

        <Card withBorder radius="md" shadow="sm">
          {filtered.length === 0 ? (
            <Text color="dimmed">目前冇投稿資料。可以先去「新增投稿」建立第一篇。</Text>
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
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>
                      <Badge color={statusColor(item.status)}>{item.status}</Badge>
                    </td>
                    <td>
                      <Group spacing="xs">
                        <Button size="xs" color="green" variant="light" onClick={() => updateStatus(item.id, 'approved')}>
                          Approve
                        </Button>
                        <Button size="xs" color="red" variant="light" onClick={() => updateStatus(item.id, 'rejected')}>
                          Reject
                        </Button>
                      </Group>
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
