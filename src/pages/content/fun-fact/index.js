import { ArtiCard } from '../../components/card';
import Meta from '../../components/meta';
import { Page } from '../../components/page_index';
import { Container } from '@mantine/core';

const Bloglist = [
  {
    name: '中國古代最重要的君主(上)',
    path: '/fun-fact/chinese-king1',
    img: '/img/chinese-king1.jpg',
    date: '3/3/2023',
  },
  {
    name: '中國古代最重要的君主(下)',
    path: '/fun-fact/chinese-king2',
    img: '/img/chinese-king2.jpeg',
    date: '3/3/2023',
  },
  {
    name: '古人的性癖好 孫中山是蘿莉控?',
    path: '/fun-fact/Sun-Yat-sen',
    img: '/img/Sun-Yat-Sen.jpeg',
    date: '6/3/2023',
  },
  {
    name: '西線無戰事 - 為何奪得奧斯卡最佳國際影片獎',
    path: '/fun-fact/All-Quiet-On-the-Western-Front',
    date: '14/3/23',
    img: "/img/西線無戰事.jpeg"
  },
  {
    name:'顛覆你對間諜的認知！有趣人物之間謀篇：時佩璞',
    path:'/fun-faact/shi-dudu',
    date:'17/3/2023',
    img:'https://upload.wikimedia.org/wikipedia/zh/7/73/Shi_Pei_Pu.jpeg'
  },
];

export default function ConPage() {
  return (
    <>
      <Container>
        <Page hTitle={'有趣小知識'} img="/img/fact.webp">
          <ArtiCard data={Bloglist} />
        </Page>
      </Container>

      <Meta
        description="有趣小知識,中國近代史,中國歷史"
        img="https://simpleinfo.live/img/Sun-Yat-Sen.jpeg"
      />
    </>
  );
}
