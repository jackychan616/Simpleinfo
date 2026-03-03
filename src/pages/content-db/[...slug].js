import { Badge, Button, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { getSupabaseServer } from '../../lib/supabaseServer';
import BlockRenderer from '../components/blockRenderer';
import { getBlocksFromSubmission } from '../../lib/contentBlocks';

export default function ContentDbSlugPage({ slug, article }) {
  if (!article) {
    return (
      <Container size="sm" py="xl">
        <Card withBorder>
          <Stack>
            <Title order={2}>文章不存在</Title>
            <Text color="dimmed">這篇內容未找到或仍在遷移中。</Text>
            <Button component={Link} href="/hot">返回近期最熱</Button>
          </Stack>
        </Card>
      </Container>
    );
  }

  const blocks = getBlocksFromSubmission(article);

  return (
    <Container size="md" py="xl">
      <Card withBorder radius="md" shadow="sm">
        <Stack>
          <Group position="apart">
            <Badge color="blue" variant="light">Content</Badge>
            <Text size="xs" color="dimmed">/content/{slug}</Text>
          </Group>
          <Title order={1}>{article.title}</Title>
          <Text color="dimmed">{article.category || 'tech'} · {new Date(article.created_at).toLocaleDateString()}</Text>
          <BlockRenderer blocks={blocks} />
          <Group>
            <Button component={Link} href="/hot" variant="light">返回近期最熱</Button>
            <Button component={Link} href="/community">查看社群文章</Button>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const slug = (ctx.params?.slug || []).join('/');
  const { client } = getSupabaseServer();

  if (!client) return { props: { slug, article: null } };

  const { data } = await client
    .from('writer_submissions')
    .select('id,title,category,content,content_blocks,created_at,source_slug,status')
    .eq('source_slug', slug)
    .eq('status', 'approved')
    .single();

  return { props: { slug, article: data || null } };
}
