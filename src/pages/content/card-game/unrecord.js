import { ConText, ConTitle } from '../../components/component';
import { Container, Image,AspectRatio, Space } from '@mantine/core';

function Page(){
    return(
        <Container>
            <ConTitle>《Unrecord》極逼真戰術射擊遊戲 畫質猶如隨身攝錄器</ConTitle>
            
            <Space h="lg"/>
            <ConText>由游戲開發團隊 Drama製作的FPS新作《Unrecord》登上了Steam商店，但未有發售日期。官方在YouTube上釋出遊戲預告後，在外國遊戲論壇引起一片討論。</ConText>
            <Space h="lg"/>
            <AspectRatio ratio={16/9}>
              <iframe width="1280" height="480" src="https://www.youtube.com/embed/5qvVNzsJyB0" title="Unrecord - Official Early Gameplay Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </AspectRatio>
            <Space h="lg"/>
            <ConText>Unrecord是一款戰術射擊遊戲，玩家扮演一名警員進行複雜的案件調查，過程中會面對歹徒發生槍戰。Unrecord的特點是與敵人覆雜的對話，創新的遊戲機制，艱難的道德困境，以及獨特的射擊系統。</ConText>
            <Space h="lg"/>
            <Image src="/img/unrecord/unrecord-game-sence.jpg" maw={800} alt="Unrecord 游戲畫面"/>
            <ConText>Unrecord 的遊戲風格是模仿「隨身攝錄器」(Body camera)，這些攝錄器多數用於軍隊和警察，用途是記錄戰場情況或執法過程。游戲畫面會跟著人物動作而晃動，出色的光影材質渲染以及舉槍動作，令許多玩家以為是真人拍攝，引發關注外國玩家關注。</ConText>
            <ConText>游戲本身十分硬核，遊戲並沒有提供十字瞄準提示，子彈數量亦不會顯示，只有游戲角色卸下彈夾檢查，子彈數量才會以數字顯示</ConText>
            <Image src="/img/unrecord/unrecord-check-mag.jpg" maw={950} alt="Unrecord 游戲角色卸下彈夾檢查子彈數量 " caption="Unrecord 游戲角色需要卸下彈夾檢查子彈數量"/>
            <Space h="lg"/>
            <Space h="lg"/>
            <ConText>《Unrecord》尚未公布發售時間，大家如有興趣可以把遊戲加入願望清單。</ConText>
            <Image maw={700} src="/img/unrecord/unrecord-steam.png" alt="Unrecord Steam頁面"/>

        </Container>
    );
}

export default function ConPage(){
    return(
        <>
            <Page/>
        </>
    );
}
export const getStaticProps = async () => {
    return {
      props: {
        openGraphData: [
          {
            name:'description',
            content:'由游戲開發團隊 Drama製作的FPS新作《Unrecord》登上了Steam商店，但未有發售日期。官方在YouTube上釋出遊戲預告後，在外國遊戲論壇引起一片討論。'
  
          },
          {
            name:'title',
            content:'《Unrecord》極逼真戰術射擊遊戲 畫質猶如隨身攝錄器'
          },
          {
            property: "og:image",
            content:
              "https://simpleinfohk.me/img/unrecord/unrecord-game-sence.jpg",
          },
          {
            property: "og:image:width",
            content: "600",
          },
          {
            property: "og:image:height",
            content: "400",
          },
          {
            property: "og:title",
            content: "《Unrecord》極逼真戰術射擊遊戲 畫質猶如隨身攝錄器",
          },
          {
            property: "og:description",
            content: "由游戲開發團隊 Drama製作的FPS新作《Unrecord》登上了Steam商店，但未有發售日期。官方在YouTube上釋出遊戲預告後，在外國遊戲論壇引起一片討論。",
          },
          {
            property: "og:type",
            content: "website",
          },
        ],
      },
    };
  };