import { Badge, Button, Card, Container, Group, Image, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import mapData from '../../data/content-articles.generated.json';

export default function ContentSlugPage({ slug, article }) {
  if (!article) {
    return (
      <Container size="sm" py="xl">
        <Card withBorder>
          <Stack>
            <Title order={2}>文章整理中</Title>
            <Text color="dimmed">這篇舊內容正在遷移到新版內容系統。</Text>
            <Button component={Link} href="/hot">返回近期最熱</Button>
          </Stack>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Card withBorder radius="md" shadow="sm">
        <Stack>
          <Group position="apart">
            <Badge>Legacy Migrated</Badge>
            <Text size="xs" color="dimmed">/content/{slug}</Text>
          </Group>
          <Title order={1}>{article.title}</Title>
          {article.image ? <Image src={article.image} alt={article.title} radius="md" /> : null}
          <Text color="dimmed">{article.description}</Text>
          <Group>
            <Button component={Link} href="/hot">返回近期最熱</Button>
            <Button component={Link} href="/community" variant="light">查看社群文章</Button>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const slug = (ctx.params?.slug || []).join('/');
  const article = (mapData?.items || []).find((x) => x.slug === slug) || null;
  return { props: { slug, article } };
}
