import { Badge, Button, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { IconHeart } from '@tabler/icons-react';
import BlockRenderer from '../components/blockRenderer';
import { Sharebutton } from '../components/share';
import { getBlocksFromSubmission, summarizeBlocks } from '../../lib/contentBlocks';
import { buildCanonicalUrl, SITE_URL } from '../../lib/seo';
import { articleJsonLd } from '../../lib/seoStructured';

function parseIdSlug(value = '') {
  const raw = String(value || '');
  const m = raw.match(/^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})(?:-(.+))?$/i);
  if (!m) return { id: raw, slug: '' };
  return { id: m[1], slug: m[2] || '' };
}

function toCommunityPath(row) {
  return `/community/${row.id}-${row.slug || 'post'}`;
}

export default function CommunityPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const parsed = parseIdSlug(id);
  const [row, setRow] = useState(null);
  const [error, setError] = useState('');
  const [likeLoading, setLikeLoading] = useState(false);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    if (!parsed.id) return;
    fetch(`/api/writer/submissions/${parsed.id}`)
      .then((r) => r.json())
      .then(async (body) => {
        const data = body.data;
        if (!data || data.status !== 'approved') {
          setError('文章未公開或不存在');
          return;
        }
        setRow(data);

        const canonicalPath = toCommunityPath(data);
        if (parsed.slug && data.slug && parsed.slug !== data.slug) {
          router.replace(canonicalPath, undefined, { shallow: true });
        }

        const r = await fetch(`/api/writer/submissions?status=approved`);
        const rb = await r.json().catch(() => ({}));
        const rec = (rb.data || []).filter((x) => x.id !== data.id).slice(0, 4);
        setRecommended(rec);
      })
      .catch(() => setError('讀取失敗'));
  }, [parsed.id, parsed.slug, router]);

  const blocks = useMemo(() => getBlocksFromSubmission(row), [row]);

  async function handleLike() {
    if (!parsed.id || likeLoading) return;
    setLikeLoading(true);
    const res = await fetch(`/api/community/${parsed.id}/like`, { method: 'POST' });
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

  const canonicalPath = toCommunityPath(row);
  const canonical = buildCanonicalUrl(canonicalPath);
  const description = summarizeBlocks(blocks, 160) || (row.content || '').slice(0, 160);
  const seoTitle = `${row.title} | Simple Info 社群投稿`;
  const seoImage = `${SITE_URL}/img/simple_info.png`;

  const articleLd = articleJsonLd({
    title: row.title,
    description,
    idOrPath: canonicalPath,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    authorName: row.author_email || 'Simple Info 社群作者',
  });

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${row.category || 'ai'}, blog, 香港, Simple Info`} />
        <link rel="canonical" href={canonical} />

        <meta property="og:site_name" content="Simple Info HK" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={seoImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={seoImage} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      </Head>
      <Container size="md" py="xl">
        <Stack spacing="md">
          <Group position="apart">
            <Title order={1}>{row.title}</Title>
            <Badge color="green">Approved</Badge>
          </Group>

          <Group position="apart">
            <Text size="sm" color="dimmed">
              分類：{row.category}
            </Text>
            <Group>
              <Button leftIcon={<IconHeart size={16} />} onClick={handleLike} loading={likeLoading} variant="light">
                Like ({Number(row.like_count || 0)})
              </Button>
              <Sharebutton url={canonical} />
            </Group>
          </Group>

          <Card withBorder radius="md" shadow="sm">
            <BlockRenderer blocks={blocks} />
          </Card>

          {recommended.length > 0 ? (
            <Card withBorder radius="md" shadow="sm">
              <Title order={4}>推薦文章</Title>
              <Stack mt="sm" spacing={8}>
                {recommended.map((item) => (
                  <Text key={item.id}>
                    <Link href={toCommunityPath(item)} style={{ textDecoration: 'none' }}>
                      {item.title}
                    </Link>
                  </Text>
                ))}
              </Stack>
            </Card>
          ) : null}
        </Stack>
      </Container>
    </>
  );
}
