import {Meta} from '../../components/meta';
import { Container, Space, Image } from '@mantine/core';
import { ConTitle, ConText } from '../../components/component';

function Body() {
  return (
    <Container>
      <ConTitle order={1}>《小小諾亞-樂園的繼承者》介紹</ConTitle>
      <Space h={'sm'} />
      <Image
        alt="Introduce"
        src="/img/little-noach-introduce/1.jpg"
        caption="《小小諾亞-樂園的繼承者》"
      />
      <Space h={'lg'} />
      <ConText>
        《小小諾亞-樂園的繼承者》是由Cygames旗下子公司Blaze
        Games自主研发的一款手遊改編Roguelike
        動作遊戲。《小小諾亞-樂園的繼承者》是手遊《小小諾亞》劇情的前傳，描繪了諾婭駕駛巨大古代兵器「方舟」参加世界第一炼金术师选拔大会的時候，與路途中其他偶遇的人，動物發生的奇妙故事。
      </ConText>
      <Image alt="Main Image" src="/img/little-noach-introduce/2.jpg" />
      <Space h={'sm'} />
      <ConText>
        《小小諾亞-樂園的繼承者》描繪了諾婭駕駛巨大古代兵器「方舟」參加世界第一煉金術師選拔大會的時候，與路途中其他偶遇的人，動物發生的奇妙故事。術師，在探索中邂逅性格各異、能力獨特的魂靈們，和他們一起擊敗強敵，找回失散的朋友——同時，逐步發掘「遺蹟」的真相。
      </ConText>
      <Space h={'lg'} />
      <Image alt="Main Image 2" src="/img/little-noach-introduce/3.png" />
      <Space h={'lg'} />
      <ConText>
        《小小諾亞-樂園的繼承者》是Cygames迄今為止規模最為宏大，也是最具野心的一部作品。即便在經歷了許多小時的艱苦戰鬥後，遊戲還有許多尚未發現的秘密，錯過的武器與裝備，以及從未使用過的法術和技能。盡管遊戲中的戰鬥體驗和我們之前在燒機系列遊戲所見到的沒有多大差別，但遊戲中各類精心設計的敵人以及Boss戰已然將戰鬥擡高到了一個全新的水平。
      </ConText>
      <Image alt="Image 3" src="/img/little-noach-introduce/4.png" />
      <Space h={'lg'} />
      <ConText>
        《小小諾亞-樂園的繼承者》已經於 2022 年 6 月 28 日在PS4/Switch/Steam
        平台上架，普通版本為HKD$76元，而特別版本則是HKD$104元。《小小諾婭
        樂園繼承者》作為一款定價較便宜的輕量級Roguelike單機遊戲，還是值得一玩的。畫風清新可愛、音樂悅耳動聽、也有一定的戰術性，對於曾經被隨機性玩法的「勸退」過的新手玩家們來說，是個入坑的好選擇，如果能通過後續的
        DLC 一點點把遊戲內容填充上去的話，想必可以獲得更好的評價吧。
      </ConText>
    </Container>
  );
}

export default function Page() {
  return (
    <>
      <Meta
        pageTitle={'《小小諾亞-樂園的繼承者》介紹'}
        description={
          '《小小諾亞-樂園的繼承者》是由Cygames旗下子公司Blaze Games自主研发的一款手遊改編Roguelike 動作遊戲。《小小諾亞-樂園的繼承者》是手遊《小小諾亞》劇情的前傳，描繪了諾婭駕駛巨大古代兵器「方舟」参加世界第一炼金术师选拔大会的時候，與路途中其他偶遇的人，動物發生的奇妙故事。《小小諾亞-樂園的繼承者》是由Cygames旗下子公司Blaze Games自主研发的一款手遊改編Roguelike 動作遊戲。《小小諾亞-樂園的繼承者》是手遊《小小諾亞》劇情的前傳，描繪了諾婭駕駛巨大古代兵器「方舟」参加世界第一炼金术师选拔大会的時候，與路途中其他偶遇的人，動物發生的奇妙故事。術師，在探索中邂逅性格各异、能力独特的魂靈们，和他们一起击败强敌，找回失散的朋友——同时，逐步发掘「遺蹟」的真相。《小小諾亞-樂園的繼承者》是Cygames迄今為止規模最為宏大，也是最具野心的一部作品。即便在經歷了許多小時的艱苦戰鬥後，遊戲還有許多尚未發現的秘密，錯過的武器與裝備，以及從未使用過的法術和技能。盡管遊戲中的戰鬥體驗和我們之前在燒機系列遊戲所見到的沒有多大差別，但遊戲中各類精心設計的敵人以及Boss戰已然將戰鬥擡高到了一個全新的水平。《小小諾亞-樂園的繼承者》已經于 2022 年 6 月 28 日在PS4/Switch/Steam 平台上架，普通版本為HKD$76元，而特別版本則是HKD$104元。《小小諾婭 樂園繼承者》作為一款定價較便宜的輕量級Roguelike單機遊戲，還是值得一玩的。畫風清新可愛、音樂悅耳動聽、也有一定的戰術性，對於曾經被隨機性玩法的「勸退」過的新手玩家們來說，是個入坑的好選擇，如果能通過後續的 DLC 一點點把遊戲內容填充上去的話，想必可以獲得更好的評價吧。'
        }
      />
      <Body />
    </>
  );
}
