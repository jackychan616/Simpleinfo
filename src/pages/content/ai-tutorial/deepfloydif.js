import { Container,Image ,Space} from '@mantine/core';
import { ConText, ConTitle} from '../../components/component';
import Head from 'next/head';

export default function Page(){
    return(
        <>
        <Head>
            <title>Stable diffusion 公司全新模型!直出AI海報，超高清圖像生成</title>
        </Head>
        <Container>
            <ConTitle>Stable diffusion 公司全新模型!直出AI海報，超高清圖像生成</ConTitle>
            <ConText>Stable diffusion 背後公司StabilityAI最近又有新打算了。他們在Github發表了全新的開源模型 <a href="https://github.com/deep-floyd/IF">DeepFloyd IF</a></ConText>
            <Image src="https://github.com/deep-floyd/IF/blob/develop/pics/nabla.jpg" maw={850} alt="DeepFloyd" caption="DeepFloyd IF生成的圖片"/>
            <ConTitle order={2} size="h2">DeepFloyd IF</ConTitle>
            <ConText>DeepFloyd IF具有高度的逼真度和語言理解能力，它具備兩個強大功能，分別是開能夠精確繪製文字以及理解空間關係</ConText>
            <Image maw={650} src="/img/deepfloydif/photo1.png" maw={600} alt="AI生成霓虹燈" caption="霓虹燈"/>
            <ConText> DeepFloyd IF 能夠巧妙地把指定的文本放置在任何地方，如霓虹燈招牌、街頭塗鴉、服飾、手繪插圖等去，並以最適合的字體、風格、排版的方式出現在最合適的位置。</ConText>
            <Image src="/img/deepfloydif/photo2.png" maw={650} alt="DeepFloyd IF 文字生成"/>
            <Space h="lg"/>
            <Image src="/img/deepfloydif/photo3.png" maw={650} alt="DeepFloyd IF 文字生成"/>
            <ConTitle order={2} size="h2">圖片生成範例</ConTitle>
            <Image src="/img/deepfloyd/photo4.png" maw={650} alt="DeepFloyd IF 圖片生成範例" caption="提示詞: a photo of a full size old rusty sign that says 'Deep Floyd Stree', photo realism, bokeh, 50mm cine lens, super sharp focus.'" />
            <Image src="/img/deepfloyd/photo5.png"maw={700} alt="DeepFloyd IF 圖片生成範例"caption="提示詞: 4 bottles of wine next to each other labeled (1,2,3,4)" />
            <ConTitle order={2} size="h2">DeepFloyd 開發團隊</ConTitle>
            <ConText>DeepFloyd AI Research 是 Stability AI 旗下的獨立研發團隊，名字來源於平克弗洛伊德樂隊，自稱為“研發樂隊”，團隊成員主要來自東歐，成員僅有四人。</ConText>
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
            content:'Stable diffusion 背後公司StabilityAI最近又有新打算了。他們在Github發表了全新的開源模型 DeepFloyd IF'
  
          },
          {
            name:'title',
            content:'Stable diffusion 公司全新模型!直出AI海報，超高清圖像生成'
          },
          {
            property: "og:image",
            content:
              "https://simpleinfohk.me/img/deepfloydif/photo1.png",
          },
          {
            property: "og:image:width",
            content: "600",
          },
          {
            property: "og:image:height",
            content: "450",
          },
          {
            property: "og:title",
            content: "Stable diffusion 公司全新模型!直出AI海報，超高清圖像生成",
          },
          {
            property: "og:description",
            content: "Stable diffusion 背後公司StabilityAI最近又有新打算了。他們在Github發表了全新的開源模型 DeepFloyd IF",
          },
          {
            property: "og:type",
            content: "website",
          },
        ],
      },
    };
  };