import { Button, Card, Container, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import slugMap from '../../data/content-slug-map.generated.json';

export default function ContentSlugPage({ slug, found }) {
  if (!found) {
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
    <Container size="sm" py="xl">
      <Card withBorder>
        <Stack>
          <Title order={2}>Content Slug Route 已就緒</Title>
          <Text color="dimmed">Slug: /content/{slug}</Text>
          <Text size="sm" color="dimmed">下一步會把 legacy JS 內容批量轉入這個 dynamic route。</Text>
          <Button component={Link} href={`/content/${slug}`}>重新載入</Button>
        </Stack>
      </Card>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const slug = (ctx.params?.slug || []).join('/');
  const found = (slugMap?.items || []).some((x) => x.slug === slug);
  return { props: { slug, found } };
}
