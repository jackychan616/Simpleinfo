import { Badge, Button, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { IconHeart } from '@tabler/icons-react';
import BlockRenderer from '../components/blockRenderer';
import { Sharebutton } from '../components/share';
import { getBlocksFromSubmission, summarizeBlocks } from '../../lib/contentBlocks';

export default function CommunityPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [row, setRow] = useState(null);
  const [error, setError] = useState('');
  const [likeLoading, setLikeLoading] = useState(false);

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

  const blocks = useMemo(() => getBlocksFromSubmission(row), [row]);

  async function handleLike() {
    if (!id || likeLoading) return;
    setLikeLoading(true);
    const res = await fetch(`/api/community/${id}/like`, { method: 'POST' });
    const body = await res.json().catch(() => ({}));
    setLikeLoading(false);
    if (res.ok && body?.data) {
      setRow((prev) => ({ ...prev, like_count: body.data.like_count }));
    }
  }

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

  const canonical = `https://simpleinfohk.me/community/${row.id}`;
  const description = summarizeBlocks(blocks, 160) || (row.content || '').slice(0, 160);

  return (
    <>
      <Head>
        <title>{row.title} | Simple Info 社群投稿</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={row.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
      </Head>
      <Container size="md" py="xl">
        <Stack spacing="md">
          <Group position="apart">
            <Title order={1}>{row.title}</Title>
            <Badge color="green">Approved</Badge>
          </Group>

          <Group position="apart">
            <Text size="sm" color="dimmed">分類：{row.category}</Text>
            <Group>
              <Button leftIcon={<IconHeart size={16} />} onClick={handleLike} loading={likeLoading} variant="light">
                Like ({Number(row.like_count || 0)})
              </Button>
              <Sharebutton url={`/community/${row.id}`} />
            </Group>
          </Group>

          <Card withBorder radius="md" shadow="sm">
            <BlockRenderer blocks={blocks} />
          </Card>
        </Stack>
      </Container>
    </>
  );
}
