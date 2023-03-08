import { DevicesPc, DeviceGamepad2 ,Robot,InfoCircle ,HorseToy,BallFootball } from 'tabler-icons-react';

export const topics = [
        {
          name:"電腦編程教學",
          path:"code-tutorial",
          page:1,
          description:"詳細易明的教學",
          icon:DevicesPc
        },
        {
            name:"AI 教學",
            path:"ai-tutorial",
            page:0,
            description:"掌握最新AI資訊",
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
          description:"體育",
          icon:BallFootball
        }

];
