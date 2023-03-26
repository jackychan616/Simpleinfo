import {
  Container,
  createStyles,
  SimpleGrid,
  Card,
  AspectRatio,
  Text,
  Image,
} from '@mantine/core';
import Meta from './components/meta';
import { TypeAnimation } from 'react-type-animation';
import React from 'react';
export const Bloglist = require('../data/Blog.json');
function Typing() {
  return (
    <TypeAnimation
      sequence={[
        'Simple info',
        2000,
        '前所未有的簡單', // '
        2000,
        '還在這𥚃?',
        3000,
        '找你所要的資訊吧！',
        2000,
      ]}
      wrapper="div"
      cursor={true}
      repeat={3}
      speed={45}
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

function Body() {
  const { classes } = useStyles();
  const cards = Bloglist.map((article) => (
    <Card
      key={article.name}
      p="md"
      radius="md"
      component="a"
      href={'/content/' + article.path}
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.img} alt="" width="650" height="80" />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {article.date}
      </Text>
      <Text className={classes.name} mt={5}>
        {article.name}
      </Text>
    </Card>
  ));
  return (
    <>
      <div
        className=" d-flex   justify-content-center align-items-center"
        style={{ backgroundColor: 'transparent', height: '150px' }}
      >
        <Typing />
      </div>
      <Container>
        <Container py="xl">
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            {cards}
          </SimpleGrid>
        </Container>
      </Container>
    </>
  );
}
function kofi() {
  return (
    <>
      <iframe
        id="kofiframe"
        src="https://ko-fi.com/jackychan616/?hidefeed=true&widget=true&embed=true&preview=true"
        style={{
          border: 'none',
          width: '100%',
          padding: '4px',
          background: '#f9f9f9',
        }}
        height="712"
        title="jackychan616"
      ></iframe>
    </>
  );
}

export default function Home() {
  return (
    <div style={{}}>
      <Meta
        pageTitle = {"Simple Info HK"}
        keywords={
          '博客,中文,資訊,資訊平臺,香港,香港博客,Hong Kong Blog,Blog,教學,教學類型,教學博客,教學 Blog,AI教學,AI,有趣資訊 '
        }
        description={'香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊'}
        img={'https://simpleinfo.live/img/simple_info.png'}
      />
      <Body />
    </div>
  );
}
