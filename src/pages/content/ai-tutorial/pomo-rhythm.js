import { ConText, ConTitle } from '../../components/component';
import { Container, List,Image} from '@mantine/core';
import Head from 'next/head';
function Page(){
    return(
      <>
      <Head>
        <title>Pomo.rhythm 用於番茄工作法的 歌單生成AI</title>
      </Head>
      <Container>
            <ConTitle>Pomo.rhythm 用於番茄工作法的 歌單生成AI</ConTitle>
            <Image src="/img/pomo-rhythm/pomo-rhythm.png" maw={500} alt="pomo.rhythm"/>
            <ConText>Pomo.rhythm 是一個連接Spotify使用的歌單生成器。用家可設定音樂偏好及場所定制歌單，輸入分為有兩種模式，正常模式和AI模式。正常模式是輸入偏好的歌手和歌曲，AI模式則是輸入整個句子，例如當時這場景、氣氛、心情等等。</ConText>
            <Image src="/img/pomo-rhythm/pomo-rhythm-ai-mode.png" alt=""/>
            <ConText>輸入後，它便會生成歌單。</ConText>
            <Image src="/img/pomo-rhythm/pomo-rhythm-song.png"  maw={550} alt="pomo.rhythm 歌單到來自Spotify" caption="pomo.rhythm 歌單到來自Spotify"/>
        </Container>
      </>
        
    );
}

export default function ConPage(){
    return(<>
    <Page/>
    </>);
}


export const getStaticProps = async () => {
    return {
      props: {
        openGraphData: [
          {
            name:'description',
            content:'Pomo.rhythm 是一個用於番茄工作法的Spotify 歌單生成器。它專為一邊使用番茄工作法、一邊聽音樂的用戶們設計。'
          },
          {
            name:'title',
            content:'Pomo.rhythm 用於番茄工作法的 歌單生成AI'
          },
          {
            property: "og:image",
            content:
              "https://simpleinfohk.me/img/pomo-rhythm/pomo-rhythm.png",
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
            content: "Web 3.0和區塊鏈是什麼?是否對現實生活和環境的潛在環境有影響？",
          },
          {
            property: "og:description",
            content: "Pomo.rhythm 是一個用於番茄工作法的Spotify 歌單生成器。它專為一邊使用番茄工作法、一邊聽音樂的用戶們設計。",
          },
          {
            property: "og:type",
            content: "website",
          },
        ],
      },
    };
  };