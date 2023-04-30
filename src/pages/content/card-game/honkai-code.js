import { ConText, ConTitle } from '../../components/component';
import { Container, Image,List,Space} from '@mantine/core';
import Head from 'next/head';
export default function Page(){
    return(
        <>
            <Head>
                <title>{`[2023]`} 直接送400星瓊! 內附多個星穹鐵道最新兌換碼</title>
            </Head>
            <Container>
                <ConTitle>內附星穹鐵道最新兌換碼 直接送400星瓊!</ConTitle>
                <Image src="/img/honkai-code/honkai-star-rail-new-year.webp" alt="[2023] 直接送400星瓊! 星穹鐵道最新兌換碼"/>
                <ConText>各位登上了星穹列車了嗎? 我們為大家收集了所有崩壞：星穹鐵道的兌換碼，幫助您進行星際冒險。我們會定期更新本教學，請務必回來查看以知道所有最新的兌換碼。</ConText>
                <Space h="lg"/>
                <ConTitle order={2} size="h2">最新的兌換碼</ConTitle>
                <List size="lg">
                    <List.Item>STARRAILGIFT</List.Item>
                    <List.Item>HSRVER10XEDLFE</List.Item>
                    <List.Item>HSRGRANDOPEN1</List.Item>
                    <List.Item>HSRGRANDOPEN2</List.Item>
                    <List.Item>HSRGRANDOPEN3</List.Item> 
                </List>
                <ConTitle order={2} size="h2">要如何兌換？</ConTitle>
                <ConText>前往以下官網登入即可！</ConText>
                <ConText><a href="https://hsr.hoyoverse.com/gift">https://hsr.hoyoverse.com/gift</a></ConText>
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
            content:'各位登上了星穹列車了嗎? 我們為大家收集了所有崩壞：星穹鐵道的兌換碼，幫助您進行星際冒險。我們會定期更新本教學，請務必回來查看以知道所有最新的兌換碼。'
  
          },
          {
            name:'title',
            content:'直接送400星瓊! 星穹鐵道最新兌換碼'
          },
          {
            property: "og:image",
            content:
              "https://simpleinfohk.me/img/honkai-code/1.png",
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
            content: "直接送400星瓊! 星穹鐵道最新兌換碼",
          },
          {
            property: "og:description",
            content: "各位登上了星穹列車了嗎? 我們為大家收集了所有崩壞：星穹鐵道的兌換碼，幫助您進行星際冒險。我們會定期更新本教學，請務必回來查看以知道所有最新的兌換碼。",
          },
          {
            property: "og:type",
            content: "website",
          },
        ],
      },
    };
  };