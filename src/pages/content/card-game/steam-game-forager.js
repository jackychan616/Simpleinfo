import {Meta} from '../../components/meta';
import { Container, Space, Image } from '@mantine/core';
import { ConTitle, ConText } from '../../components/component';

function Page(){
    return(
        <Container>
            <ConTitle order={1} size="h1">Steam 移植遊戲-浮島物語 (Forager)</ConTitle>        
            <Image maw={500} alt="浮島物語 (Forager)" caption="浮島物語 (Forager)" src="/img/浮島物語/1.jpg" />
            <ConText>《浮島物語》（Forager）是一款是steam移植的一款非常火的2D像素畫風遊戲。</ConText>
            <ConTitle order={2} size="h1">遊戲玩法</ConTitle>
            <ConText>由獨立開發者 HopFrog製作的遊戲，作為單人空中探索沙盒遊戲，涉及解謎、與敵人戰鬥、建築建造和資源收集。最終目標是通過所有地下城，找到七位首領，完成博物館物品包，購買所有土地並完成所有成就任務。</ConText>
            <Image maw={650} alt="浮島物語 (Forager) 遊戲玩法" caption="遊戲玩法" src="/img/浮島物語/2.jpg"/>
            <Space h="lg"/>
            <ConText>遊戲發生在一個浮島世界，在這里，你能做的就是使用你手上的稿子去採集，獲得金幣和資源，並用他們購買及改造浮島，在自由的旅行中取得特性各異、能力獨特的寵物與神器，和他們一起探索世界，擊敗強敵——同時，逐步發掘「浮島物語」的劇情內容。</ConText>
            <Image maw={800} alt="浮島物語 (Forager) 遊戲畫面及玩法" caption="遊戲畫面" src="/img/浮島物語/3.png"/>
            <ConText>遊戲里能通過合成及解謎獲得多種裝備和「吉祥物」並加以升級。探索不同的浮島能遇到不同的部落，趣味謎題，特色npc和神秘地城。而除了探索，你還可以經營你的浮島，有農業、工業、商業和魔法等多方面的建築，你可以思考如何進行自動化生產，亦能享受「割草」般的種田樂趣。這種全方面的新鮮感能讓玩家不知不覺地沈迷遊戲，度過一段快樂時光。</ConText>
            <Space h="lg"/>
            <Image maw={550} alt="浮島物語 (Forager) 遊戲多種裝備" caption="" src="/img/浮島物語/4.jpg"/>
            <Space h="lg"/>
            <ConText>毫不誇張地說，《浮島物語》是集百家之優勢的一部作品，在融合星露谷、泰拉瑞亞、塞爾達等遊戲精髓，包含基地建設、資源收集、野外探索等不同玩法之後，即便在經歷了幾百個小時的戰鬥探索後，遊戲還有許多尚未發現的劇情秘密，未合成的武器與裝備，以及從未使用過的法術法杖。盡管遊戲中的戰鬥體驗和其他2D遊戲或許沒有多大差別，但遊戲中各類精心設計的迷宮部落以及解密戰鬥已然將探索變成了趣味。</ConText>
            <ConTitle order={2} size="h1">2D像素沙盒遊戲中的「小清新」</ConTitle>
            <Space h="lg"/>
            <Image maw={750} alt="浮島物語 (Forager) 遊戲畫面及劇情" src="/img/浮島物語/5.gif"/>
            <ConText>《浮島物語》作為2D像素沙盒遊戲的「小清新」，它有趣而獨特的探索經營體驗定會令玩家印象深刻。而《浮島物語》在PS4/Switch/Steam等平臺出售，售價為HK$89，比起同類型的遊戲算是中等價位，加上其內容頗豐富如果對沙盒類遊戲感興趣的玩家就一定不要錯過了！</ConText>
        </Container>
    );
}

export default function ConPage(){
    return(
        <>  
            <Meta img="/img/浮島物語/1.jpg" pageTitle="Steam 移植遊戲-浮島物語 (Forager)" description="《浮島物語》（Forager）是一款是steam移植的一款非常火的2D像素畫風遊戲。"/>
            <Page/>
        </>
    );
}