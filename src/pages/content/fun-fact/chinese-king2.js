import { ConTitle, ConText } from '../../components/component';
import Head from 'next/head';
import { Container } from '@mantine/core';

function ConPage() {
  return (
    <Container>
      <ConTitle order={1}>中國古代最重要的君主列表{`(2)`}</ConTitle>
      <ConTitle order={2}>4. 履{`(商湯)`}</ConTitle>
      <ConText>
        商朝的第一任君主，湯乘夏朝內政混亂，外患不斷之際起兵，在鳴條之戰中擊敗夏桀，滅夏。又稱「貴族革命」。湯建商後，對內減輕征斂，鼓勵生產，籠絡人心，亦擴展了統治區域，影響遠至黃河上游，氐、羌部落都來納貢歸服。湯更是儒家推崇的上古聖王之一。
      </ConText>
      <ConTitle order={2}>5. 商太宗太甲</ConTitle>
      <ConText>
        商朝第5位國君。初年任伊尹為相，商朝國力強盛。但其後太甲開始以殘暴的手段對付百姓，伊尹見此便把太甲流放到桐之宮。三年後，伊尹見太甲改過自新後將政權交返給太甲。太甲復辟後，沉痛接受教訓，成為了一個勤政愛民、勵精圖治的聖君。
      </ConText>
      <ConTitle order={2}>6.武丁{`(譽為高宗)`}</ConTitle>
      <ConText>
        商朝第23位國君。即位時殷商衰微。武丁即位後，親自提拔了一大批忠臣，又讓婦妌幫助發展生產力，同時任用有能力的女將統帥軍隊，使得商朝政治清明。另一方面，武丁親自率軍蕩平了叛亂，維護國家統一；武丁在位時大大開拓了商朝的疆土，他先後征服了81個敵國和叛亂不朝的方國，又派小臣畢率領眾多罪犯到這些新的領土上開墾荒地，大大發展了商朝的經濟。衰落的商朝重新振興，史稱「武丁中興」或「武丁盛世」。
      </ConText>
      <ConTitle>7.受/帝辛（紂王）</ConTitle>
      <ConText>
        商朝末代君主，寵愛妲己，帝辛沉迷於妲己的美色，荒理朝政。在位時又繼續對人方用兵，雖然取得了勝利，但導致了國內空虛。武王乘機聯合西方各方國一同伐商。在牧野之戰中，商軍夜遭偷襲而敗，最終帝辛玉衣自焚而死。{' '}
      </ConText>
    </Container>
  );
}

export default function Page() {
  return (
    <>
      <Head>
        <title>中國古代最重要的君主列表(2)</title>
      </Head>
      <ConPage />
    </>
  );
}
