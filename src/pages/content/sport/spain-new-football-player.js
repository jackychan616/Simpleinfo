import { Container, Image,Space } from '@mantine/core';
import { ConText, ConTitle } from '../../components/component';
import Head from 'next/head';


export default function Page(){
    return (
        <>
            <Head>
                <title>未來西班牙女王的駙馬？西班牙足球新秀加維</title>
            </Head>
            <Container>
                <ConTitle order={1} maw={750} size="h2">未來西班牙女王的駙馬？西班牙足球新秀加維</ConTitle>
                <ConText>加維，自從在2021年加入巴塞隆拿主隊後，在埸上不論運球、預判、智慧、視野、傳球都有著不凡的表現。他憑着實力贏得許多巴塞隆拿和西班牙球迷的心，因為他跳入了高級足球，尤其是西班牙王室的球迷。</ConText>
                <Space h="lg"/>
                <Image src="/img/spain-football-new-player/gavi.jpg" alt="加維" caption=""/>
                <Space h="lg"/>
                <ConText>根據不少當地傳媒報道，西班牙王儲妃萊昂諾爾對這名中場球員有些迷戀。</ConText>
                <Space h="lg"/>
                <Image src="/img/spain-football-new-player/spain-princess.jpg" maw={600}alt="西班牙公主 "/>
                <Space h="lg"/>
                <ConText>根據他們的信息，她的學校文件夾裡全是加維的照片。此外，據報導，有人看到國王費利佩六世去迎接加維，並為他的女兒遞給他一件有加維簽名襯衫。</ConText>
                <ConText>《馬卡報》援引知情人士的說話，表示西班牙王室對這種關係沒有任何問題。《馬卡報》還報導說，加維的隊友已經開始稱他為“小王子”。究竟他們能否修成正果呢？這就有待之後的發展了。</ConText>
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
            content:'加維，自從在2021年加入巴塞隆拿主隊後，在埸上不論運球、預判、智慧、視野、傳球都有著不凡的表現。他憑着實力贏得許多巴塞隆拿和西班牙球迷的心，因為他跳入了高級足球，尤其是西班牙王室的球迷。'
  
          },
          {
            name:'keywords',
            content:'世界足壇法國最佳巨星,法國,海布里之王,亨利大帝,亨利,大帝,傳奇巨星,巴塞隆拿,足球,球星'
          },
          {
            name:'title',
            content:'未來西班牙女王的駙馬？西班牙足球新秀加維'
          },
          {
            name:'og:title',
            content:'未來西班牙女王的駙馬？西班牙足球新秀加維'
          },
          {
            property: "og:image",
            content:
              "https://simpleinfohk.me/img/spain-football-new-player/gavi.jpg",
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
            property: "og:description",
            content: "加維，自從在2021年加入巴塞隆拿主隊後，在埸上不論運球、預判、智慧、視野、傳球都有著不凡的表現。他憑着實力贏得許多巴塞隆拿和西班牙球迷的心，因為他跳入了高級足球，尤其是西班牙王室的球迷。",
          },
          {
            property: "og:type",
            content: "website",
          },
        ],
      },
    };
  };