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
    img:'https://is2-ssl.mzstatic.com/image/thumb/Music116/v4/66/33/8f/66338ffc-19bf-e779-0898-6f983474df13/23UMGIM24614.rgb.jpg/600x600bf-60.jpg',
    date:'28/3/2023',
    tag: "新聞"
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
