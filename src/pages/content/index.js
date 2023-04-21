import { Container } from '@mantine/core';
import { ArtiCard } from '../components/card';
import{ Meta }from '../components/meta';

const PostData = [
  {
    name: '電腦編程教學',
    img: '/img/coding.webp',
    path: '/code-tutorial',
    date: '',
  },
  {
    name: 'AI 教學',
    img: '/img/ai.webp',
    path: '/ai-tutorial',
    date: '',
  },
  {
    name: '遊戲 ',
    img: '/img/game.webp',
    path: '/card-game',
    date: '',
  },
  {
    name: '有趣知識',
    img: '/img/fact.webp',
    path: '/fun-fact',
    date: '',
  },
  {
    name: '玩具',
    img: '/img/toy.webp',
    path: '/toy',
    date: '',
  },
  {
    name: '體育',
    img: 'https://library.sportingnews.com/styles/facebook_1200x630/s3/2021-08/world-cup-trophy-stand_133kk6nwawbmj16uhxvaiznup2.jpg?itok=bYPSCbur',
    path: '/sport',
    date: '',
  },
];

export default function Page() {
  return (
    <>
      <Meta />
      <Container>
        <ArtiCard data={PostData} />
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      openGraphData: [
        {
          name:'description',
          content:'香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊'

        },
        {
          name:'title',
          content:'Simple Info HK - 目錄'
        },
        {
          property: "og:image",
          content:
            "https://simpleinfohk.me/icon.png",
        },
        {
          property: "og:image:width",
          content: "300",
        },
        {
          property: "og:image:height",
          content: "200",
        },
        {
          property: "og:title",
          content: "Simple Info HK - 目錄",
        },
        {
          property: "og:description",
          content: "香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊",
        },
        {
          property: "og:type",
          content: "website",
        },
      ],
    },
  };
};