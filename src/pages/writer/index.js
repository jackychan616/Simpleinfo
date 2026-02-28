import { Badge, Button, Card, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import WriterAuth from '../components/writerAuth';
import { handleUnauthorized } from '../../lib/authRedirect';
import { getAccessToken } from '../../lib/supabaseBrowser';
import { useSupabaseSession } from '../../lib/useSupabaseSession';
import { useRouter } from 'next/router';

const steps = ['Email magic link 登入', '建立草稿（標題、分類、內容）', '提交審核（status: pending_review）', '管理員審核通過後公開'];

export default function WriterDashboard() {
  const router = useRouter();
  const { session, ready } = useSupabaseSession();
  const [mine, setMine] = useState([]);

  useEffect(() => {
    async function loadMine() {
      const token = await getAccessToken();
      if (!token) return;

      const res = await fetch('/api/writer/submissions?mine=1', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        handleUnauthorized(router);
        return;
      }

      const body = await res.json().catch(() => ({}));
      if (res.ok) setMine(body.data || []);
    }

    loadMine();
  }, [router]);

  const stats = useMemo(() => {
    const base = { pending_review: 0, approved: 0, rejected: 0 };
    mine.forEach((item) => {
      if (base[item.status] !== undefined) base[item.status] += 1;
    });
    return base;
  }, [mine]);

  return (
    <Container size="md" py="xl">
      <Stack spacing="md">
        <Title order={1}>Writer Dashboard</Title>
        <Text color="dimmed">投稿平台 v2：已加入 Supabase Auth（magic link）。</Text>

        <Card withBorder radius="md" shadow="sm">
          <WriterAuth redirectPath="/writer" />
          <Text size="sm" color="dimmed" mt="sm">
            Session: {!ready ? 'loading...' : session?.user?.email ? `signed in as ${session.user.email}` : 'not signed in'}
          </Text>
        </Card>

        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Card withBorder>
            <Text size="sm" color="dimmed">Pending</Text>
            <Title order={2}>{stats.pending_review}</Title>
            <Badge color="yellow">pending_review</Badge>
          </Card>
          <Card withBorder>
            <Text size="sm" color="dimmed">Approved</Text>
            <Title order={2}>{stats.approved}</Title>
            <Badge color="green">approved</Badge>
          </Card>
          <Card withBorder>
            <Text size="sm" color="dimmed">Rejected</Text>
            <Title order={2}>{stats.rejected}</Title>
            <Badge color="red">rejected</Badge>
          </Card>
        </SimpleGrid>

        <Card withBorder radius="md" shadow="sm">
          <Title order={4}>投稿流程</Title>
          <Stack spacing={6} mt="sm">
            {steps.map((s) => (
              <Text key={s}>• {s}</Text>
            ))}
          </Stack>
          <Group mt="md">
            <Button component={Link} href="/writer/new">建立新文章</Button>
            <Button variant="light" component={Link} href="/writer/my-posts">My Posts</Button>
            <Button variant="light" component={Link} href="/writer/submissions">管理投稿</Button>
            <Button variant="light" component={Link} href="/writer/admin-roles">Admin Roles</Button>
            <Button variant="light" component={Link} href="/writer/ai-bot">AI Bot</Button>
            <Button variant="light" component={Link} href="/hot">查看公開文章</Button>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}
