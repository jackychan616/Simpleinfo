import {
  Container,
  createStyles,
  SimpleGrid,
  Card,
  AspectRatio,
  Text,
  Group,
  Badge,
  Button,
  Box,
  Stack
} from '@mantine/core';
import {Meta} from './components/meta';
import Head  from 'next/head';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import styles from './page.module.css'
import GroudedCard from './components/groupedcard'
import { Blogads } from './components/googleAds';
import { Sub } from './components/leftbar/sub';
import Link from 'next/link';
export const Bloglist = require('../data/Blog.json');
function Typing() {
  return (
    <TypeAnimation
      sequence={[
        'Simple info',
        3500,
        '前所未有嘅簡單', // '
        3500,
        '仲喺度?',
        3000,
        '搵你所要嘅資訊啦！',
        10000,
      ]}
      wrapper="div"
      cursor={true}
      repeat={3}
      speed={18}
      style={{ fontSize: '3em' }}
    />
  );
}
const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
  bigtitle: {
    textAlign: 'center',
    fontWeight: 1000,
    fontSize: 55,
    lineHeight: 1,
    color: '#1c7ed6',
  },
  text: {
    color: theme.colorScheme,
  },
}));


export default function Home() {
  const { classes } = useStyles();
  const [ postNum, setPostNum] = useState(6); // Default number of posts dislplayed
  const [communityPosts, setCommunityPosts] = useState([]);

  useEffect(() => {
    fetch('/api/writer/submissions?status=approved')
      .then((r) => r.json())
      .then((body) => setCommunityPosts((body.data || []).slice(0, 4)))
      .catch(() => setCommunityPosts([]));
  }, []);

  function handleClick() {
    setPostNum(prevPostNum => prevPostNum + 6) // 3 is the number of posts you want to load per click
  }
  return (
<>      
  <Head>
    <title>Simple Info HK</title>
  </Head>
  <Container>
    <div
    className=" d-flex   justify-content-center align-items-center"
    style={{ backgroundColor: 'transparent', height: '150px' }}
    >
      <Typing />
    </div>
    <Container>
    <Stack align="center" spacing="xs" pb="md">
      <Text size="sm" color="dimmed">想分享觀點？加入社群投稿，審核後可公開展示。</Text>
      <Group>
        <Button component={Link} href="/writer/new" radius="xl">立即投稿</Button>
        <Button component={Link} href="/community" variant="light" radius="xl">瀏覽社群文章</Button>
      </Group>
    </Stack>
    <GroudedCard/>
    <Container py="xl">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {Bloglist.slice(0, postNum).map((article) => (
            <Card
              key={article.path || article.name}
              p="md"
              radius="md"
              component="a"
              href={'/content/' + article.path}
              className={classes.card}
              shadow="sm"
            >
              <AspectRatio ratio={1920 / 1080}>
                <Image src={article.img} alt={article.img?.replace('/img', '')} width="650" height="80" quality="70" />
              </AspectRatio>
              <Group position="apart" mt="md" mb="xs">
                <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
                  {article.date}
                </Text>
                <Badge variant="filled">{article.tag}</Badge>
              </Group>
              <Text className={classes.name} mt={5}>
                {article.name}
              </Text>
            </Card>
          ))}
            </SimpleGrid>
          </Container>
          <Container>
            <Box w={200}>
                <Button onClick={handleClick} fullWidth variant="outline">載入更多</Button>
            </Box>
          </Container>

          {communityPosts.length > 0 ? (
            <Container py="xl">
              <Group position="apart" mb="md">
                <Text fw={700} fz="lg">社群精選投稿</Text>
                <Button component="a" href="/community" variant="subtle">睇全部</Button>
              </Group>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                {communityPosts.map((post) => (
                  <Card key={post.id} p="md" radius="md" component="a" href={`/community/${post.id}`} className={classes.card} shadow="sm">
                    <Group position="apart" mb="xs">
                      <Badge color="green">community</Badge>
                      <Text size="xs" color="dimmed">{new Date(post.created_at).toLocaleDateString()}</Text>
                    </Group>
                    <Text fw={700}>{post.title}</Text>
                    <Text size="sm" color="dimmed" lineClamp={3} mt="xs">{post.content}</Text>
                  </Card>
                ))}
              </SimpleGrid>
            </Container>
          ) : null}
        </Container>
  </Container>
</>
  );
}


