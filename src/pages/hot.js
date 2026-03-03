import Link from 'next/link';
import { Card, Container, Group, SimpleGrid, Stack, Text, Title, Badge, Button } from '@mantine/core';
import { getSupabaseServer } from '../lib/supabaseServer';
import { summarizeBlocks, getBlocksFromSubmission } from '../lib/contentBlocks';

function toCommunityHref(id, slug) {
  return `/community/${slug || id}`;
}

export default function HotPage({ items = [] }) {
  return (
    <Container size="lg" py="xl">
      <Stack spacing="md">
        <Title order={1}>近期最熱</Title>
        <Text color="dimmed">精選熱門文章（最新 + 高互動優先）</Text>

        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'md', cols: 2 }, { maxWidth: 'sm', cols: 1 }]}>
          {items.map((item) => (
            <Card key={item.id} withBorder radius="md" shadow="sm">
              <Stack spacing="xs">
                <Group position="apart">
                  <Badge>{item.category || 'general'}</Badge>
                  <Text size="xs" color="dimmed">{new Date(item.created_at).toLocaleDateString()}</Text>
                </Group>
                <Title order={4} lineClamp={2}>{item.title}</Title>
                <Text size="sm" color="dimmed" lineClamp={3}>{item.description}</Text>
                <Button component={Link} href={toCommunityHref(item.id, item.slug)} variant="light">
                  閱讀文章
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

export async function getServerSideProps() {
  const { client } = getSupabaseServer();
  if (!client) return { props: { items: [] } };

  const { data } = await client
    .from('writer_submissions')
    .select('id,slug,title,category,content,content_blocks,created_at,like_count,status')
    .eq('status', 'approved')
    .order('like_count', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(18);

  const items = (data || []).map((row) => ({
    id: row.id,
    slug: row.slug || null,
    title: row.title,
    category: row.category,
    created_at: row.created_at,
    description: summarizeBlocks(getBlocksFromSubmission(row), 140) || String(row.content || '').slice(0, 140),
  }));

  return { props: { items } };
}
