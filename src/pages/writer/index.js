import { Button, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

const steps = [
  '建立草稿（標題、分類、內容）',
  '提交審核（status: pending_review）',
  '管理員審核通過後公開',
];

export default function WriterDashboard() {
  return (
    <Container size="md" py="xl">
      <Stack spacing="md">
        <Title order={1}>Writer Dashboard</Title>
        <Text color="dimmed">投稿平台 v2（第一階段）已啟動：先有投稿入口同送審流程骨架。</Text>

        <Card withBorder radius="md" shadow="sm">
          <Title order={4}>投稿流程</Title>
          <Stack spacing={6} mt="sm">
            {steps.map((s) => (
              <Text key={s}>• {s}</Text>
            ))}
          </Stack>
          <Group mt="md">
            <Button component={Link} href="/writer/new">建立新文章</Button>
            <Button variant="light" component={Link} href="/writer/submissions">管理投稿</Button>
            <Button variant="light" component={Link} href="/hot">查看公開文章</Button>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}
