import { ConText, ConTitle } from '../../components/component';
import {Meta} from '../../components/meta';
import { Container, Image, Space } from '@mantine/core';

function Page (){
    return(
        <Container>
            <ConTitle order={2} size="h1">最強AI聊天機械人來襲 - Claude，告別繁瑣的註冊過程，被譽為ChatGPT的最強對手</ConTitle>
            <Image src="/img/claude-quick-talk/claude.webp" maw={450} alt="最強AI聊天機械人Claude" caption="Claude"/>
            <ConText>對比ChatGPT凡所的註冊門檻，Claude可以說是{`"零過程"`}，只要注冊一個 Slack 免費賬號就能註冊</ConText>
            <ConTitle order={2} size="h2">Claude</ConTitle>
            
            <ConText>Claude 由Anthropic與Notion、Quora和DuckDuckGo等夥伴合作研發。</ConText>
            <Image src="/img/claude-quick-talk/meet-claude.webp" alt="Claude 由Anthropic與Notion、Quora和DuckDuckGo等夥伴合作研發"maw ={800}/>
            <ConText>Claude 是基於人工智能系統研究的下一代智能助手。Claude 能夠幫助處理包括文章總結、資料搜索、創作、合作寫作、問答以及編寫程式。它還可以調教語氣、個性以及行為等等的參數</ConText>
            <ConTitle order={2} size="h2">Claude整合Notion</ConTitle>
            <ConText>Claude還通過與Notion的整合提高了人們在工作和學習中的生產力{`；`}Notion的聯合創始人兼首席運營官Akshay Kothari說{`："`}Anthropic和Notion的共同目標是幫助個人和企業利用AI提高生產力。Claude獨特的創造性寫作和總結能力有助於我們的聯網人工智能助手Notion AI的發展。Notion用戶現在可以更有效地工作，提高他們的寫作能力，所有這些都在Notion工作空間內進行。{`"`}</ConText>
            <Space h="lg"/>
            <Image src="/img/claude-quick-talk/claude-request-access.webp" maw={600} alt="申請註冊Claude" caption="申請註冊Claude"/>
            <ConTitle order={2} size="h2">Claude-v1 與 Claude Instant </ConTitle>
            <ConText>Claude 有2個版本，價錢與性能也有所不同。Claude Instant 擁有更低的延遲，吞吐量較高，成本效益是Claude-v1的1/6，收費更低;Claude-v1 經過了優化，在處理任務上有更出色的表現，能夠解決更複雜的問題</ConText>

        </Container>
    );
}

export default function ConPage(){
    return(
    <>
        <Page/>
    </>);
}
export const getStaticProps = async () => {
    return {
      props: {
        openGraphData: [
          {
            name:'description',
            content:'最強AI聊天機械人來襲 - Claude，告別繁瑣的註冊過程，被譽為ChatGPT的最強對手，對比ChatGPT凡所的註冊門檻，Claude可以說是{`"零過程"`}，只要注冊一個 Slack 免費賬號就能註冊'
  
          },
          {
            name:'title',
            content:'最強AI聊天機械人來襲 - Claude，告別繁瑣的註冊過程，被譽為ChatGPT的最強對手'
          },
          {
            property: "og:image",
            content:
              "https://simpleinfohk.me/img/claude-quick-talk/meet-claude.webp",
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
            content: "最強AI聊天機械人來襲 - Claude，告別繁瑣的註冊過程，被譽為ChatGPT的最強對手",
          },
          {
            property: "og:description",
            content: "最強AI聊天機械人來襲 - Claude，告別繁瑣的註冊過程，被譽為ChatGPT的最強對手，對比ChatGPT凡所的註冊門檻，Claude可以說是零過程，只要注冊一個 Slack 免費賬號就能註冊",
          },
          {
            property: "og:type",
            content: "website",
          },
        ],
      },
    };
  };