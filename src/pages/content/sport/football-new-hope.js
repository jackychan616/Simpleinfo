import { Container, Image, Space } from '@mantine/core';
import { ConText, ConTitle } from '../../components/component';
import {Meta} from '../../components/meta';

function ConPage() {
  return (
    <Container>
      <ConTitle order={1}>足球界的革新和希望 國王聯賽</ConTitle>
      <ConTitle order={2}>國王聯賽</ConTitle>
      <ConText>
        國王聯賽由不久前退役的職業足球員碧基成立，於23年一月一日開始首賽季，分為冬、夏兩個實季。此賽事是七人制賽事，聯賽中有12支球隊，在各交手一次共11場比賽後，前8名將進入季後賽。賽事分上下半場各20分鐘，共四十分鐘，當40分鐘時平局將以不同規則的十二碼決勝。每支球隊共12人，10人將從報名者選出，任何人都可報名，別外2人就由客串球員擔任，2位中1位會每周更換，當中乏知名現役或退役球星例如細哨(朗拿甸奴)、阿古露等人。
      </ConText>
      <Image
        maw={500}
        alt="細哨"
        src="https://webcdn.guangming.com.my/wp-content/uploads/2023/02/%E6%9C%AA%E5%91%BD%E5%90%8D-1-144.jpg"
      />
      <ConText h1="lg" h2="lg">
        比賽前將抽取技能卡，技能卡將在比賽中使用，使用後有各種特別能力，例如使對方球員下場數分鐘。而十二碼亦有所不同，足球將被放至中圈，哨響後主罰球員將球帶或射向球門，而龍門亦可出擊攔截。開球就由球員從底線跑到中圈，誰跑得較快便能獲得球權。換人次數亦限，球員被罰黃牌只需下場兩分鐘，紅牌就在5分鐘後便可用其他球員更換。
      </ConText>
      <Image maw={500} src="/img/football-new-hope/2.jpg" alt="阿古露" />
      <Space h="lg"></Space>
      <ConTitle order={2}>網上網上</ConTitle>
      <ConText>
        目前國王聯賽在網上免費網上，熱度驚人，曾一度遠超五大聯賽。而聯賽決賽將於23年3月26日在魯營球場進行，你又是否會觀看呢？
      </ConText>
    </Container>
  );
}

export default function Cpage() {
  return (
    <>
      <ConPage />
      <Meta
        keywords={'羅納度,細哨,傳奇巨星,巴塞隆拿,足球,球星'}
        img="https://resource01-proxy.ulifestyle.com.hk/res/v3/image/content/1990000/1992752/18JSA003__20180118_L.jpg"
        pageTitle={'足球界的革新和希望???  國王聯賽'}
        description={
          '足球界的革新和希望  國王聯賽國王聯賽由不久前退役的職業足球員碧基成立，於23年一月一日開始首賽季，分為冬、夏兩個實季。此賽事是七人制賽事，聯賽中有12支球隊，在各交手一次共11場比賽後，前8名將進入季後賽。賽事分上下半場各20分鐘，共四十分鐘，當40分鐘時平局將以不同規則的十二碼決勝。每支球隊共12人，10人將從報名者選出，任何人都可報名，別外2人就由客串球員擔任，2位中1位會每周更換，當中乏知名現役或退役球星例如細哨、朗拿甸奴、阿古露等人。'
        }
      />
    </>
  );
}
