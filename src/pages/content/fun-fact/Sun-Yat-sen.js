import { ConTitle, ConText } from '../../components/component';
import Head from 'next/head';
import { Container, Image ,Space} from '@mantine/core';
import {Meta} from 'src/pages/components/meta';

function Body() {
  return (
    <Container>
      <ConTitle order={1}>古人的性癖好 孫中山是蘿莉控？</ConTitle>
      <ConText>
        我們若說到中國近代史的傳奇人物，那麼孫中山必定榜上有名。孫中山是著名的革命先鋒，為辛亥革命的重要人物之一。可是，這位革命烈士在性方面有着有趣的一面。
      </ConText>
      <ConTitle order={2}>孫中山是蘿莉控？</ConTitle>
      <ConText>
        孫中山有一位伴侶（非正妻），叫大月薰。據說孫中山在流亡日本時認識了友人的女兒，那人即大月薰（當時10歲）。過後孫文愛上了她並向其父大月素堂提親，在一番波折後大月薰在15歲時與孫文結婚。
      </ConText>
      <Image src="/img/十二歲的大月薰.jpg" alt="十二歲的大月薰"></Image>
      <ConText>
        另外，孫中山的二妻宋慶齡，比孫中山年輕27歲，即使在宋家的反對之下，孫文亦堅持與之結婚。
      </ConText>
      <Image
        src="/img/宋慶齡.jpg"
        maw={300}
        alt="宋慶齡"
      ></Image>
      <ConTitle order = "2">
       張飛
      </ConTitle>
      <Space h = "lg"/>
      <Image 
        src="張飛.jpeg" 
        maw={500}
        alt="張飛"
        />
      <ConText>
      在三國時代，有位武將，無人不曉；他跟隨劉備征戰四方，又與關羽被世人稱為「萬人敵」之人：張飛。史書《魏略》記載，建安五年，劉備被曹操打敗，張飛有次外出，遇上小「蘿莉」夏侯氏（名不詳），她其實是夏侯淵的侄女，才十三四歲，張飛對其一見鍾情，就娶為妻了

      </ConText>
      <ConTitle>
      
      </ConTitle>
    </Container>
  );
}

export default function Page() {
  return (
    <>
      <Head>古人的性癖好 孫中山是蘿莉控？</Head>
      <Body />
      <Meta
        description={
          '孫中山有一位伴侶（非正妻），叫大月薰。據說孫中山在流亡日本時認識了友人的女兒，那人即大月薰（當時10歲）。過後孫文愛上了她並向其父大月素堂提親，在一番波折後大月薰在15歲時與孫文結婚。'
        }
        img={'https://simpleinfo.live/img/Sun-Yat-Sen.jpeg'}
      />
    </>
  );
}
