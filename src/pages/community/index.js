import { Badge, Card, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getBlocksFromSubmission, summarizeBlocks } from '../../lib/contentBlocks';
import Meta from '../components/meta';

export default function CommunityPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('/api/writer/submissions?status=approved')
      .then((r) => r.json())
      .then((body) => setRows(body.data || []))
      .catch(() => setRows([]));
  }, []);

  return (
    <>
      <Meta
        pageTitle="社群投稿 | Simple Info"
        description="瀏覽已通過審核的社群投稿內容，涵蓋 AI、Tech、Gaming 主題。"
        path="/community"
      />
      <Container size="lg" py="xl">
        <Stack spacing="md">
        <Title order={1}>社群投稿</Title>
        <Text color="dimmed">已通過審核嘅投稿會顯示喺呢度。</Text>

        {rows.length === 0 ? (
          <Text color="dimmed">暫時未有已公開投稿。</Text>
        ) : (
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'md', cols: 1 }]}> 
            {rows.map((row) => {
              const summary = summarizeBlocks(getBlocksFromSubmission(row), 200) || row.content;
              return (
                <Card key={row.id} withBorder radius="md" shadow="sm" component={Link} href={`/community/${row.id}`} style={{ cursor: 'pointer' }}>
                  <Group position="apart" mb="xs">
                    <Text weight={700}>{row.title}</Text>
                    <Badge color="green">approved</Badge>
                  </Group>
                  <Text size="sm" color="dimmed">{row.category} · {new Date(row.created_at).toLocaleString()}</Text>
                  <Text size="sm" color="dimmed">❤️ {Number(row.like_count || 0)}</Text>
                  <Text mt="sm" lineClamp={4}>{summary}</Text>
                  <Text mt="md" style={{ textDecoration: 'underline' }}>閱讀全文</Text>
                </Card>
              );
            })}
          </SimpleGrid>
        )}
        </Stack>
      </Container>
    </>
  );
}
