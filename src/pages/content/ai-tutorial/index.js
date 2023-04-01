import { Page } from '../../components/page_index';
import { ArtiCard } from '../../components/card';
import Meta from '../../components/meta';
import { Container } from '@mantine/core';

const Bloglist = [
  {
    name: '如何使用AI繒圖？',
    path: '/ai-tutorial/photo-ai-tutorial',
    img: '/img/ai-generate-img.webp',
    date: '1/3/2023',
    tag : "AI 教學"

  },
  {
    name: '如何在Windows本地部署Stable Diffusion?',
    path: '/ai-tutorial/setup-stable-diffusion',
    img: '/img/stable-diffusion.webp',
    date: '1/3/2023',
    tag : "AI 教學"
  },
  {
    name: '什麼是AI?',
    path: '/ai-tutorial/ai-quick-tutorial',
    img: '/img/ai.jpg',
    date: '12/3/2023',
    tag : "AI 教學"
  },
  {
    name: '淺談AI',
    path: '/ai-tutorial/ai-light-talk',
    img: '/img/ai-light-talk/ai-2.jpg',
    date: '13/3/2023',
    tag : "AI 教學"
  },
  {
    name:'解構GPT-3工作原理',
    path:'/ai-tutorial/openai-chatgpt-how-to-work',
    img:'/img/openai.jpg',
    date:'1/4/2023',
    tag:'GPT'
  },
  {
    name:"AI未來發展的前景 商業分析竟佔重要地位",
    path:"/ai-tutorial/ai-futher-develop",
    img:"/img/Ai_2.jpg",
    date:"1/4/2023",
    tag:"AI 教學"
  }
];

export default function content() {
  return (
    <>
      <Container>
        <Page
          hTitle="AI 教學"
          img="/img/ai.webp"
          fill
          sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
        >
          <ArtiCard data={Bloglist} />
        </Page>
      </Container>
      <Meta
        subtitle=" AI 教學"
        description=" AI教學,包括Chatgpt,stable diffusion 等等的教學"
      />
    </>
  );
}
