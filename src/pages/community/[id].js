import { Badge, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CommunityPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [row, setRow] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`/api/writer/submissions/${id}`)
      .then((r) => r.json())
      .then((body) => {
        const data = body.data;
        if (!data || data.status !== 'approved') {
          setError('文章未公開或不存在');
          return;
        }
        setRow(data);
      })
      .catch(() => setError('讀取失敗'));
  }, [id]);

  if (error) {
    return (
      <Container size="md" py="xl">
        <Text color="dimmed">{error}</Text>
      </Container>
    );
  }

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
          <Title order={1}>{row.title}</Title>
          <Badge color="green">Approved</Badge>
        </Group>
        <Text size="sm" color="dimmed">分類：{row.category}</Text>
        <Card withBorder radius="md" shadow="sm">
          <Text style={{ whiteSpace: 'pre-wrap' }}>{row.content}</Text>
        </Card>
      </Stack>
    </Container>
  );
}
