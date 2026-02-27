import { Button, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import WriterAuth from '../components/writerAuth';
import { useSupabaseSession } from '../../lib/useSupabaseSession';

const steps = [
  'Email magic link 登入',
  '建立草稿（標題、分類、內容）',
  '提交審核（status: pending_review）',
  '管理員審核通過後公開',
];

export default function WriterDashboard() {
  const { session, ready } = useSupabaseSession();

  return (
    <Container size="md" py="xl">
      <Stack spacing="md">
        <Title order={1}>Writer Dashboard</Title>
        <Text color="dimmed">投稿平台 v2：已加入 Supabase Auth（magic link）。</Text>

        <Card withBorder radius="md" shadow="sm">
          <WriterAuth />
          <Text size="sm" color="dimmed" mt="sm">
            Session: {!ready ? 'loading...' : session?.user?.email ? `signed in as ${session.user.email}` : 'not signed in'}
          </Text>
        </Card>

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
            <Button variant="light" component={Link} href="/hot">查看公開文章</Button>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}
