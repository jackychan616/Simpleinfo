import { DevicesPc, DeviceGamepad2 ,Robot,InfoCircle ,HorseToy,BallFootball ,News,Brain} from 'tabler-icons-react';
import {SiWeb3Dotjs} from 'react-icons/si';
export const topics = [
        {
          name:"電腦編程教學",
          path:"code-tutorial",
          page:1,
          description:"詳細易明的編程教學 , python , c++ , javascript",
          icon:DevicesPc
        },
        {
            name:"AI 教學",
            path:"ai-tutorial",
            page:0,
            description:"掌握最新AI資訊, 最新Openai教學 , Gpt-4應用操作",
            icon:Robot
        },
        {
            name:"遊戲",
            path:"card-game",
            page:1,
            description:"分享游戲中大小事",
            icon:DeviceGamepad2
        },
        {
          name:"有趣知識",
          path:"fun-fact",
          page:3,
          description:"與你分享不平凡的知識",
          icon:InfoCircle
        },
        {
          name:"玩具",
          path:"toy",
          page:1,
          description:"形形色色的玩具介紹",
          icon:HorseToy 
        },
        {
          name:"體育",
          path:'sport',
          page:1,
          description:"分享體育大小事, 足球, 英超 ,西甲,各大聯賽等",
          icon:BallFootball
        },
        {
          name:"新聞",
          path:"news",
          page:2,
          description:"報道各地時事新聞,香港社會新聞,香港新聞,娛樂新聞",
          icon:News
        },
        {
          name:"Web 3",
          path:"web3",
          page:1,
          description:"追蹤最新Web 3資訊",
          icon:SiWeb3Dotjs
        }

];
export var topic = ["/content/code-tutorial","/content/ai-tutorial","/content/card-game","/content/fun-fact","/content/toy","/content/sport","/content/news"];
