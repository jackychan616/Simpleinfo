import { Container } from '@mantine/core';
import { ArtiCard } from '../../components/card';
import {Meta} from '../../components/meta';
import { Page } from '../../components/page_index';

const Bloglist = [
  {
    name: '不在藏了 王菲和謝霆鋒',
    path: '/news/Faye-Wong',
    img: '/img/Faye_Wong_03.jpg',
    date: '11/3/23',
    tag: '新聞'
  },
  {
    name: '謝霆鋒和王菲的合作',
    path: '/news/Faye-Wong-song',
    img: '/img/Faye_Wong_04.jpg',
    date: '12/3/23',
    tag: "新聞"
  },
  {
    name:'《最愛是誰》懷念張國榮',
    path:'/news/leslie-quick-talk',
    img:'/img/leslie.jpg',
    date:'28/3/2023',
    tag: "新聞"
  },
  {
    name:'如何制定一個科學合理、適合自己的學習計劃？',
    path:'/news/learing-strategy',
    img:'/img/listening-strategy/learning.webp',
    date:'23/4/2023',
    tag:'學習'
  }
];

export default function page() {
  return (
    <>
      <Meta
        Pagetitle="Simpleinfo - 新聞"
        description="新聞,香港社會新聞,香港新聞,娛樂新聞"
      />
      <Container>
        <Page title={'新聞'} hTitle={'新聞'} img="/img/simple_info.png">
          <ArtiCard data={Bloglist} />
        </Page>
      </Container>
    </>
  );
}
