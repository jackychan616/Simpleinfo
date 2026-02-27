import { Badge, Card, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CommunityPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('/api/writer/submissions?status=approved')
      .then((r) => r.json())
      .then((body) => setRows(body.data || []))
      .catch(() => setRows([]));
  }, []);

  return (
    <Container size="lg" py="xl">
      <Stack spacing="md">
        <Title order={1}>社群投稿</Title>
        <Text color="dimmed">已通過審核嘅投稿會顯示喺呢度。</Text>

        {rows.length === 0 ? (
          <Text color="dimmed">暫時未有已公開投稿。</Text>
        ) : (
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            {rows.map((row) => (
              <Card key={row.id} withBorder radius="md" shadow="sm">
                <Group position="apart" mb="xs">
                  <Text weight={700}>{row.title}</Text>
                  <Badge color="green">approved</Badge>
                </Group>
                <Text size="sm" color="dimmed">{row.category} · {new Date(row.created_at).toLocaleString()}</Text>
                <Text mt="sm" lineClamp={4}>{row.content}</Text>
                <Text component={Link} href={`/community/${row.id}`} mt="md" style={{ textDecoration: 'underline' }}>
                  閱讀全文
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
}
