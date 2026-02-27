import { Badge, Button, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';

function statusColor(status) {
  if (status === 'approved') return 'green';
  if (status === 'rejected') return 'red';
  return 'yellow';
}

export default function MyPostsPage() {
  const [email, setEmail] = useState('');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    supabase.auth.getUser().then(async ({ data }) => {
      const userEmail = data.user?.email || '';
      setEmail(userEmail);
      if (!userEmail) return;

      const res = await fetch(`/api/writer/submissions?authorEmail=${encodeURIComponent(userEmail)}`);
      const body = await res.json().catch(() => ({}));
      setRows(body.data || []);
    });
  }, []);

  return (
    <Container size="md" py="xl">
      <Stack spacing="md">
        <Title order={1}>我的投稿</Title>
        <Text color="dimmed">只顯示你當前登入帳號提交嘅文章。</Text>
        <Text size="sm">帳號：{email || '未登入'}</Text>
        {!email ? <Button component={Link} href="/writer/auth">去登入</Button> : null}

        {rows.length === 0 ? (
          <Card withBorder radius="md"><Text color="dimmed">未有投稿資料。</Text></Card>
        ) : (
          rows.map((row) => (
            <Card key={row.id} withBorder radius="md" shadow="sm">
              <Group position="apart" mb="xs">
                <Text weight={700}>{row.title}</Text>
                <Badge color={statusColor(row.status)}>{row.status}</Badge>
              </Group>
              <Text size="sm" color="dimmed">{row.category} · {new Date(row.created_at).toLocaleString()}</Text>
              <Text mt="sm" lineClamp={3}>{row.content}</Text>
            </Card>
          ))
        )}
      </Stack>
    </Container>
  );
}
