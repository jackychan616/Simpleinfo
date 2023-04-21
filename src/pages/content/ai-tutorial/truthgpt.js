import {Container,List,Space,Image} from '@mantine/core';
import {ConText,ConTitle} from '../../components/component';
import {Meta} from '../../components/meta';
import Head  from 'next/head';

export default function Page(){
    return (
        <Container>
            <ConTitle id ="1-title" size = {'h1'} order = {1}>
                馬斯克將推出TruthGpt , 強過 ChatGPT ?
            </ConTitle>
            <Space h = "md"/>
            <Image src = "/img/truthgpt/truthgpt.jpg" width="300" height="300" alt = "Truthgpt" quality  = "70"/>
            <ConText>
                馬斯克在接受福克斯新聞採訪時表示，新公司「X.AI」正在開發一個名叫「TruthGPT」的大型語言模型（LLM） TruthGPT，這將是“最大程度尋求真相的人工智能”——不管這意味著什麼。
            </ConText>
            <Image src = "/img/truthgpt/elon_musk.png" width="450" height = "345" alt = "Elon musk"/>
            <Space h = "md"/>
            <ConText>
            「我將開始做一些稱之為TruthGPT的東西，或者是一個極致地尋求真相、會試圖理解宇宙的本質的AI」，並稱「我認為這可能是(開發AI)最佳的安全途徑，一個在乎於理解宇宙的AI，不太可能消滅人類，因為我們是宇宙的有趣組成部分。」他承認自己現在才開發AI有點遲，但冀提供微軟和Google AI系統以外的「第三選擇」。
            </ConText>
            <Image src = "/img/truthgpt/Elon_musk_2.jpg" maw = "500" width = "450" height="250" alt = "Elon musk" quality="70"/>
            <Space h = "lg"/>
            <ConText>
                馬斯克在推出自己的版本之前談到了快速人工智能發展的危險，聲稱像 ChatGPT 和谷歌的巴德這樣的聊天機器人正在接受“政治正確”的訓練，表示 ChatGPT 是由左翼的專家編寫，那些專家會訓練 ChatGPT 說謊，久而久之，ChatGPT 就會以一種不誠實的方式控制了人類對現實的理解，讓我們成為奴隸。同時他亦補充：「人工智能比保養不善的飛機或設計糟糕的汽車更加危險，因為人工智能具有很大潛力。如果管理不當時，人工智能將會對整個人類文明產生災難性影響。」。他沒有為這些說法提供證據，也沒有詳細說明“尋求真相的人工智能”可能需要什麼。
            </ConText>
            <Space h = "lg"/>
            <ConTitle order = {2}>參考文章</ConTitle>
            <List>
                <List.Item>
                    <a href='https://truthgpt.one/'>TruthGPT 官方網站</a>
                </List.Item>
                <List.Item>
                    <a href= "https://unwire.hk/2023/04/18/elon-musk-new-ai-truthgpt/fun-tech/">Elon Musk 開發新 AI「TruthGPT」   「不說謊也不會毀滅人類」- unwire.hk</a>
                </List.Item>
                <List.Item><a href='https://www.cnbc.com/2023/04/19/elon-musk-says-he-wants-to-create-chatgpt-competitor-called-truthgpt.html'>Elon Musk now says he wants to create a ChatGPT competitor to avoid ‘A.I. dystopia’—he’s calling it ‘TruthGPT’ - make it </a></List.Item>
            </List>
        </Container>
    )
}
export const getStaticProps = async () => {
    return {
      props: {
        openGraphData: [
          {
            name:'description',
            content:'馬斯克在接受福克斯新聞採訪時表示，新公司「X.AI」正在開發一個名叫「TruthGPT」的大型語言模型（LLM） TruthGPT，這將是“最大程度尋求真相的人工智能”——不管這意味著什麼。'
  
          },
          {
            name:'title',
            content:'馬斯克將推出TruthGpt , 強過 ChatGPT ?'
          },
          {
            property: "og:image",
            content:
              "https://simpleinfohk.me/img/truthgpt/truthgpt.jpg",
          },
          {
            property: "og:image:width",
            content: "400",
          },
          {
            property: "og:image:height",
            content: "300",
          },
          {
            property: "og:title",
            content: "馬斯克將推出TruthGpt , 強過 ChatGPT ?",
          },
          {
            property: "og:description",
            content: "馬斯克在接受福克斯新聞採訪時表示，新公司「X.AI」正在開發一個名叫「TruthGPT」的大型語言模型（LLM） TruthGPT，這將是“最大程度尋求真相的人工智能”——不管這意味著什麼。",
          },
          {
            property: "og:type",
            content: "website",
          },
        ],
      },
    };
  };