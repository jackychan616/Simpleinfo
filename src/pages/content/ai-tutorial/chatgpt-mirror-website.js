import { ConText, ConTitle } from '../../components/component';
import { Container, List,Space,Image,Center} from '@mantine/core';
import Head from 'next/head';
import { FreeRights ,StatusChange,Rocket,Api,Robot,LayoutGridAdd} from 'tabler-icons-react';
export default function ConPage(){
    return(
        <>
            <Head>
                <title>分類了二十個免費ChatGPT鏡像網站，親測能用!包括GPT-4</title>
            </Head>
            <Container>
                <ConTitle order={1} size="h1">分類了二十個免費ChatGPT鏡像網站，親測能用!包括GPT-4</ConTitle>
                <ConText>我們在互聯網經過一番搜索後，整理出20個ChatGPT鏡像網站，所有都是免費並實用。如果你覺得它們有用，可以考慮支持一下我們，替我們買杯咖啡(<a href="https://ko-fi.com/simpleinfo">https://ko-fi.com/simpleinfo</a>)</ConText>
                <ConTitle order={2} size="h1">網站列表</ConTitle>
                <Space h="lg"/>
                <List
                    size="lg"
                    spacing="xs"
                >
                    <List.Item icon={<FreeRights size={24} strokeWidth={2} color="teal"/>}>免費</List.Item>
                    <List.Item icon={<StatusChange size={24} strokeWidth={2} color={'yellow'}/>}>與原版不同的介面</List.Item>
                    <List.Item icon={<Rocket size={24} strokeWidth={2} color="#bf40bf"/>}>包括了其他AI</List.Item>
                    <List.Item icon={<Api size={24} strokeWidth={2} color="red"/>}>需要API</List.Item>
                    <List.Item icon={<Robot size={24} strokeWidth={2} color="green"/>}>有GPT-4</List.Item>
                    <List.Item icon={<LayoutGridAdd size={24} strokeWidth={2}/>}>加插了特別功能(例如:文件上傳、圖片生成)</List.Item>
                </List>
                <Space h="lg"/>
                <ConTitle order={3} size="h2">GPT-3版本</ConTitle>
                <Space h="md"/>
                <Center><Image maw={850} src="/img/chatgpt-mirror-website/gpt-3.webp" alt="GPT-3"/></Center>
                <Space h="lg"/>
                <List icon={<FreeRights
                    size={24}
                    strokeWidth={2}
                    color="teal"/>}
                    size="lg"
                    spacing="xs">
                    <List.Item><a href="https://freegpt.one/">https://freegpt.one/</a></List.Item>
                    <List.Item><a href="https://chatbot.theb.ai">https://chatbot.theb.ai</a></List.Item>
                    <List.Item><a href="https://www.aitianhu.com">https://www.aitianhu.com</a></List.Item>
                    <List.Item><a href="https://dev.yqcloud.top">https://dev.yqcloud.top</a></List.Item>
                    <List.Item><a href="https://chat.gpt.bz">https://chat.gpt.bz</a></List.Item>
                    <List.Item><a href="https://heimoshuiyu.github.io/chatgpt-api-web/?key=fakekey&api=https%3A%2F%2F3lio5ooiekcn3gxx6du2jf5wzq0mudmm.lambda-url.us-east-1.on.aws%2F&mode=fetch"> https://heimoshuiyu.github.io/chatgpt-api-web/</a></List.Item>
                    <List.Item><a href="https://ai.ls">https://ai.ls</a></List.Item>
                    <List.Item ><a href="https://chatgptproxy.info/#/">https://chatgptproxy.info/#/</a></List.Item>
                    <List.Item icon={<><FreeRights size={24} strokeWidth={2} color="teal"/><StatusChange size={24} strokeWidth={2} color={'yellow'}/></>}><a href="https://chat.geekr.dev/">https://chat.geekr.dev/</a></List.Item>
                    <List.Item icon={<><FreeRights size={24} strokeWidth={2} color="teal"/><StatusChange size={24} strokeWidth={2} color={'yellow'}/></>}><a href="https://talk.xiu.ee/">https://talk.xiu.ee/</a></List.Item>
                    <List.Item icon={<><FreeRights size={24} strokeWidth={2} color="teal"/><Rocket size={24} strokeWidth={2} color="#bf40bf"/></>}><a href="https://greengpt.app/">https://greengpt.app/</a></List.Item>
                    <List.Item icon={<><FreeRights size={24} strokeWidth={2} color="teal"/><StatusChange size={24} strokeWidth={2} color={'yellow'}/><Rocket size={24} strokeWidth={2} color="#bf40bf"/></>}><a href="https://chatgptproxy.info/#/">https://chatgptproxy.info/#/</a></List.Item>
                    <List.Item icon={<><FreeRights size={24} strokeWidth={2} color="teal"/><StatusChange size={24} strokeWidth={2} color={'yellow'}/></>}><a href="https://gpt.getshare.net/">https://gpt.getshare.net/</a></List.Item>
                    <List.Item icon={<><FreeRights size={24} strokeWidth={2} color="teal"/><StatusChange size={24} strokeWidth={2} color={'yellow'}/><Rocket size={24} strokeWidth={2} color="#bf40bf"/><LayoutGridAdd size={24} strokeWidth={2}/></>}><a href="https://ai.okmiku.com/chat/">https://ai.okmiku.com/chat/</a></List.Item>
                    <List.Item icon={<><FreeRights size={24} strokeWidth={2} color="teal"/><StatusChange size={24} strokeWidth={2} color={'yellow'}/></>}><a href="https://gpt.xeasy.me/"/></List.Item>
                
                </List>
                <Space h="lg"/>
                <ConTitle order={3} size="h2">GPT-4</ConTitle>
                <Space />
                <Center><Image maw={850} src="/img/chatgpt-mirror-website/gpt-4.jpg" alt="GPT-4"/></Center>
                <Space />
                <List
                size="lg"
                spacing="xs">
                    <List.Item icon={<Robot size={24} strokeWidth={2} color="green"/>}><a href="https://ai117.com/">https://ai117.com/</a></List.Item>
                    <List.Item icon={<><Robot size={24} strokeWidth={2} color="green"/><Api size={24} strokeWidth={2} color="red"/></>}><a href="https://www.typingmind.com/">https://www.typingmind.com/</a></List.Item>
                    <List.Item icon={<><Robot size={24} strokeWidth={2} color="green"/><Api size={24} strokeWidth={2} color="red"/></>}><a href="https://fastgpt.app/">https://fastgpt.app/</a></List.Item>
                    <List.Item icon={<><Robot size={24} strokeWidth={2} color="green"/><Api size={24} strokeWidth={2} color="red"/></>}><a href="https://freechatgpt.chat ">https://freechatgpt.chat </a></List.Item>
                    <List.Item icon={<><Robot size={24} strokeWidth={2} color="green"/><Api size={24} strokeWidth={2} color="red"/><Rocket size={24} strokeWidth={2} color="#bf40bf"/></>}><a href="https://nat.dev/">https://nat.dev/</a></List.Item>
                </List>
                <Space h="lg"/>
                <ConText>以上便是我們找到的網站。</ConText>
                
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
            content:'我們在互聯網經過一番搜索後，整理出20個ChatGPT鏡像網站，所有都是免費並實用。如果你覺得它們有用，可以考慮支持一下我們，替我們買杯咖啡'
  
          },
          {
            name:'title',
            content:'分類了二十個免費ChatGPT鏡像網站，親測能用!包括GPT-4'
          },
          {
            property: "og:image",
            content:
              "https://simpleinfohk.me/img/chatgpt-mirror-website/chatgpt-mirror-website.jpg",
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
            content: "分類了二十個免費ChatGPT鏡像網站，親測能用!包括GPT-4",
          },
          {
            property: "og:description",
            content: "我們在互聯網經過一番搜索後，整理出20個ChatGPT鏡像網站，所有都是免費並實用。如果你覺得它們有用，可以考慮支持一下我們，替我們買杯咖啡 ",
          },
          {
            property: "og:type",
            content: "website",
          },
        ],
      },
    };
  };