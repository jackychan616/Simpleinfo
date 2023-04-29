import {Container,Image} from '@mantine/core';
import {ConText,ConTitle} from '../../components/component';
import Head from 'next/head';

export default function Page(){
  return (
    <>
    <Head>
      <title>HuggingChat 登場，因免費、開源被喻為「ChatGPT第一替代品」</title>
    </Head>
    <Container>
      <ConTitle>HuggingChat 登場，因免費、開源被喻為「ChatGPT第一替代品」</ConTitle>
      <Image src="/img/huggingchat/huggingface.png" alt="hugging face"/>
      <ConText>Hugging Face在4 月 26 日發布了 大語言模型 HuggingChat，官方自信地表示:{`"`}這是當下最好的開源聊天模型，也是 ChatGPT 的第一個開源替代品{`"`}。</ConText>
      <Image src="/img/huggingchat/chat.webp" alt="Hugging chat"/>
      <ConText>HuggingChat是完全免費的，而模型訓練方法與ChatGPT類似，用大量文本數據進行訓練，不過HuggingChat的數據比較廣泛，使它比ChatGPT優勝。</ConText>
      <ConText>Hugging Chat 現已開始公測，大家有興趣可以開去試用。</ConText>
      <a href="https://huggingface.co/chat/">Hugging Chat</a>
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
          content:'Hugging Face在4 月 26 日發布了 大語言模型 HuggingChat，官方自信地表示:"這是當下最好的開源聊天模型，也是 ChatGPT 的第一個開源替代品"。'
        },
        {
          name:'title',
          content:'HuggingChat 登場，因免費、開源被喻為「ChatGPT第一替代品」'
        },
        {
          property: "og:image",
          content:
            "https://simpleinfohk.me/img/huggingchat/huggingface.png",
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
          content: "HuggingChat 登場，因免費、開源被喻為「ChatGPT第一替代品」",
        },
        {
          property: "og:description",
          content: 'Hugging Face在4 月 26 日發布了 大語言模型 HuggingChat，官方自信地表示:"這是當下最好的開源聊天模型，也是 ChatGPT 的第一個開源替代品"。',
        },
        {
          property: "og:type",
          content: "website",
        },
      ],
    },
  };
};
