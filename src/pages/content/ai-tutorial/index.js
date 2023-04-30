import { Page } from '../../components/page_index';
import { ArtiCard } from '../../components/card';
import {Meta} from '../../components/meta';
import { Container } from '@mantine/core';

const Bloglist = [
  {
    name: '如何在Windows本地部署Stable Diffusion?',
    path: '/ai-tutorial/setup-stable-diffusion',
    img: '/img/stable-diffusion.webp',
    date: '1/3/2023',
    tag: "AI 教學"
  },
  {
    name: '什麼是AI?',
    path: '/ai-tutorial/ai-quick-tutorial',
    img: '/img/ai_quick.webp',
    date: '12/3/2023',
    tag: "AI 教學"
  },
  {
    name:'OpenXLA:史上最強開源項目，Google、微軟、蘋果、Meta，整合現有框架和硬件',
    path:'/ai-tutorial/openxla-quick-tutorial',
    img:'https://avatars.githubusercontent.com/u/107584881?s=200&v=4',
    date:'8/4/2023',
    tag:'AI 教學'
  },
  {
    name: '淺談AI',
    path: '/ai-tutorial/ai-light-talk',
    img: '/img/ai-light-talk/ai-2.jpg',
    date: '13/3/2023',
    tag: "AI 教學"
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
  },
  {
    name:'Elon Musk 創立了 X.AI 公司對抗OpenAI',
    path:'/ai-tutorial/xai-quick-talk',
    img:'/img/xai-quick-talk/elon-musk.jpg',
    date:'16/4/2023',
    tag:'AI'
  },{
    name:'最強AI聊天機械人來襲 - Claude，告別繁瑣的註冊過程，被譽為ChatGPT的最強對手',
    path:'/ai-tutorial/claude-quick-talk',
    img:'/img/claude-quick-talk/meet-claude.webp',
    date:'21/4/2023',
    tag:'AI'
  },
  {
    name:'馬斯克將推出TruthGpt , 強過 ChatGPT ?',
    path:'/ai-tutorial/truthgpt',
    img:'/img/truthgpt/truthgpt.jpg',
    date:'21/4/2023',
    tag:'AI'
  },
  {
    name:'Google宣布將會合拼燈DeepMind 和 Google Brain',
    path:'/ai-tutorial/google-mix-deepmind-and-googlebrain',
    img:'/img/googlebrain-mix-deepmind/deepmind.webp',
    date:'21/4/2023',
    tag:'AI'
  },
  {
    name:'Pomo.rhythm 用於番茄工作法的 歌單生成AI',
    path:'/ai-tutorial/pomo-rhythm',
    img:'/img/pomo-rhythm/pomo-rhythm.png',
    date:'29/4/2023',
    tag:'AI'
  },
  {
    name:'HuggingChat 登場，因免費、開源被喻為「ChatGPT第一替代品」',
    path:'/ai-tutorial/hugging-chat',
    img:'/img/huggingchat/huggingface.png',
    date:'28/9/2023',
    tag:'AI'
  },{
    name:'Stable diffusion 公司全新模型!直出AI海報，超高清圖像生成',
    path:'/ai-tutorial/deepfloydif',
    img:'/img/deepfloydif/photo1.png',
    date:'30/9/2023',
    tag:'AI'
  }
];

export default function content() {
  return (
    <>
      <Container>
        <Page
          hTitle="AI 教學"
          img="/img/ai.webp"
          maw={500}
          
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
