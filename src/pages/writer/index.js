import { Badge, Button, Card, Container, Divider, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import WriterAuth from '../components/writerAuth';
import { handleUnauthorized } from '../../lib/authRedirect';
import { getAccessToken } from '../../lib/supabaseBrowser';
import { useSupabaseSession } from '../../lib/useSupabaseSession';
import { useRouter } from 'next/router';
import { getCurrentRoleSafe } from '../../lib/authClient';

export default function WriterDashboard() {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { session, ready } = useSupabaseSession();
  const [mine, setMine] = useState([]);
  const [role, setRole] = useState('user');

  useEffect(() => {
    async function loadMine() {
      const token = await getAccessToken();
      if (!token) return;

      if (session?.user?.email) {
        const nextRole = await getCurrentRoleSafe(session.user.email);
        setRole(nextRole || 'user');
      }

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
  }, [router, session?.user?.email]);

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
        <Stack spacing={2}>
          <Title order={1}>Writer Workspace</Title>
          <Text color="dimmed">集中管理投稿、審核狀態與 AI 內容工作流。</Text>
        </Stack>

        <Card withBorder radius="md" shadow="sm">
          <Stack spacing={6}>
            <WriterAuth redirectPath="/writer" />
            <Divider />
            <Text size="sm" color="dimmed">
              Session: {!ready ? 'loading...' : session?.user?.email ? `signed in as ${session.user.email}` : 'not signed in'}
            </Text>
            <Text size="sm" color="dimmed">Role: {role}</Text>
          </Stack>
        </Card>

        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}> 
          <Card withBorder component={Link} href="/writer/submissions?status=pending_review" style={{ textDecoration: 'none' }}>
            <Text size="sm" color="dimmed">Pending Review</Text>
            <Title order={2}>{stats.pending_review}</Title>
            <Badge color="yellow">pending_review</Badge>
          </Card>
          <Card withBorder component={Link} href="/writer/submissions?status=approved" style={{ textDecoration: 'none' }}>
            <Text size="sm" color="dimmed">Approved</Text>
            <Title order={2}>{stats.approved}</Title>
            <Badge color="green">approved</Badge>
          </Card>
          <Card withBorder component={Link} href="/writer/submissions?status=rejected" style={{ textDecoration: 'none' }}>
            <Text size="sm" color="dimmed">Rejected</Text>
            <Title order={2}>{stats.rejected}</Title>
            <Badge color="red">rejected</Badge>
          </Card>
        </SimpleGrid>

        <Card withBorder radius="md" shadow="sm">
          <Stack spacing="sm">
            <Title order={4}>Quick Actions</Title>
            <Group>
              <Button component={Link} href="/writer/new" fullWidth={isMobile}>建立新文章</Button>
              <Button variant="light" component={Link} href="/writer/my-posts" fullWidth={isMobile}>My Posts</Button>
              <Button variant="light" component={Link} href="/writer/submissions" fullWidth={isMobile}>管理投稿</Button>
              {role === 'admin' ? <Button variant="light" component={Link} href="/writer/admin-roles" fullWidth={isMobile}>Admin Panel</Button> : null}
              {role === 'admin' || role === 'editor' ? <Button variant="light" component={Link} href="/writer/ai-bot" fullWidth={isMobile}>AI Bot</Button> : null}
              <Button variant="subtle" component={Link} href="/hot" fullWidth={isMobile}>查看公開文章</Button>
            </Group>
          </Stack>
        </Card>


      </Stack>
    </Container>
  );
}
