import {Meta} from '../../components/meta';
import { Container, Space, Image } from '@mantine/core';
import { ConTitle, ConText } from '../../components/component';

function Page(){
    return(
        <Container>
            <ConTitle order = {1}>
            30秒學會成為csgo高手的必要技巧！
            </ConTitle>
            <ConText>
            當你需要快速中止移動，使角色馬上停下，使用CSGO急停技巧，教學如下：
            </ConText>
            <ConText>
            如果你正在前進:
            </ConText>
            <li>
            松開前進按鍵W鍵。
            </li>
            <li>
            同時按下後退S鍵。
            </li>
            <ConText>
            如果你正在左右走：
            </ConText>
            <li>
            鬆開正在按的按鍵
            </li>
            <li>
            立即點擊相反方向的按鍵
            </li>
            <ConText>
            以下是一個例子：
            </ConText>
            <ConText>
            你正在按A往左走，當你碰見敵人的時候鬆開A並立即按D之後立即瞄準敵人。
            </ConText>
            <Image src="/img/csgo_2.jpg" maw = {500} height={400} width ={400}/>
            <ConText> 
             這一種急停的操作看似簡單, 但是需要大量的練習。望大家能早練成這種技巧, 成為csgo槍王！
            </ConText>
        </Container>
    )
}



export default function page(){
    return(
        <>
            <Page/>
        </>
    )
}

export const getStaticProps = async () => {
    return {
      props: {
        openGraphData: [
          {
            name:'description', 
            content:'快速中止移動，使角色馬上停下，使用CSGO急停技巧，教學如下：如果你正在前進:松開前進按鍵W鍵。'
  
          },
          {
            name:'title',
            content:'30秒學會成為csgo高手的必要技巧！'
          },
          {
            property: "og:image",
            content:
              "/img/csgo_2.jpg",
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
            content: "30秒學會成為csgo高手的必要技巧！",
          },
          {
            property: "og:description",
            content: "快速中止移動，使角色馬上停下，使用CSGO急停技巧，教學如下：如果你正在前進: 松開前進按鍵W鍵。",
          },
          {
            property: "og:type",
            content: "website",
          },
        ],
      },
    };
  };