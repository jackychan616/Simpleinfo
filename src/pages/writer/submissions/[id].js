import { Badge, Button, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import BlockRenderer from '../../components/blockRenderer';
import { getBlocksFromSubmission } from '../../../lib/contentBlocks';

function statusColor(status) {
  if (status === 'approved') return 'green';
  if (status === 'rejected') return 'red';
  return 'yellow';
}

export default function SubmissionDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [row, setRow] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/writer/submissions/${id}`)
      .then((r) => r.json())
      .then((body) => setRow(body.data || null))
      .catch(() => setRow(null));
  }, [id]);

  const blocks = useMemo(() => getBlocksFromSubmission(row), [row]);

  if (!row) {
    return (
      <Container size="md" py="xl">
        <Text color="dimmed">載入中...</Text>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack spacing="md">
        <Group position="apart">
          <Title order={1}>投稿內容</Title>
          <Badge color={statusColor(row.status)}>{row.status}</Badge>
        </Group>

        <Card withBorder radius="md" shadow="sm">
          <Title order={3}>{row.title}</Title>
          <Text size="sm" color="dimmed" mt="xs">分類：{row.category}</Text>
          <Text size="sm" color="dimmed">建立時間：{new Date(row.created_at).toLocaleString()}</Text>
          <Stack mt="md">
            <BlockRenderer blocks={blocks} />
          </Stack>
        </Card>

        <Group>
          <Button component={Link} href="/writer/submissions" variant="light">返回列表</Button>
          {row.status === 'approved' ? (
            <Button component={Link} href={`/community/${row.id}`}>公開頁預覽</Button>
          ) : null}
        </Group>
      </Stack>
    </Container>
  );
}
