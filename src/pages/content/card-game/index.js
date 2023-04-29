import { Page } from '../../components/page_index';
import { ArtiCard } from '../../components/card';
import{ Meta} from '../../components/meta';
import { Container } from '@mantine/core';

const Bloglist = [
  {
    name: '[porker 撲克牌] 二十一點玩法教學',
    path: '/card-game/poker_21point_quick_talk',
    img: '/img/poker.jpg',
    date: '2/3/2023',
    tag: '遊戲'
  },
  {
    name: '《小小諾亞-樂園的繼承者》介紹',
    path: '/card-game/little-noah-introduce',
    img: '/img/little-noach-introduce/4.png',
    date: '2/3/2023',
    tag: '遊戲'
  },
  {
    name:'30秒學會成為csgo高手的必要技巧！',
    path:'/card-game/csgo',
    img:'/img/csgo.webp',
    date: '2/3/2023',
    tag: '遊戲'
   },{
    name:'Steam 移植遊戲-浮島物語 (Forager)',
    path:'/card-game/steam-game-forager',
    img:'/img/浮島物語/1.jpg',
    date:'9/4/2023',
    tag:'Steam遊戲'
   },
   {
    name:'《Unrecord》極逼真戰術射擊遊戲 畫質猶如隨身攝錄器',
    path:'/card-game/unrecord',
    img:'/img/unrecord/unrecord-game-sence.jpg',
    date:'22/4/2023',
    tag:'Steam遊戲'
   },
   {
    name:'新手必須知道的崩壞：星穹鐵道攻略',
    path:'/card-game/honkai',
    img:'/img/honkai/Honkai：Star_Rail崩壞：星穹鐵道.webp',
    date:'29/4/23',
    tag:'遊戲'
   }
];

export default function ConPage() {
  return (
    <>
      <Container>
        <Page
          title="Simple Info - 遊戲"
          hTitle="分享游戲中大小事"
          img="/img/game.webp"
        >
          <ArtiCard data={Bloglist} />
        </Page>
      </Container>
      <Meta />
    </>
  );
}
