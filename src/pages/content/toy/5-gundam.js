import {ConText,ConTitle} from '../../components/component';
import Meta from '../../components/meta';
import {Container,Image,Space} from '@mantine/core';
function ConPage(){
    return (
        <Container>
            <ConTitle order={1}>RG 1/144系列必入手的商品</ConTitle>
            <ConTitle order={2}>1. RG 1/144 RX-93-ν2 Hi-Nu GUNDAM</ConTitle>
            <Image alt="Hi-Nu" src={"/img/5-gundam/1.jpg"} caption={">Hi-Nu"}/>
            <ConText >Hi-Nu高達是小說《機動戰士高達馬沙之反擊, 貝托蒂嘉的子嗣》中主角阿寶的MS，精密細緻的組件，配搭清晰分明的分色，並且擁有一流的靈活度，不失為一件良好的RG商品。</ConText>
            <Space h="lg"/>
            <Image src="/img/5-gundam/1.5.jfif" alt="Hi-Nu"/>
            <Space h="sm"/>
            <ConText>推薦度：⭐️⭐️⭐️⭐️⭐️</ConText>
            <Space h="lg"/>
            <ConTitle order={2}>2.RG 1/144 RX-93 ν GUNDAM</ConTitle>
            <Image alt="ν GUNDAM" src="/img/5-gundam/2.webp" cation="v gundam"/>
            <ConText>《機動戰士高達：馬沙之反擊》中主角阿寶的MS，全身由頭至腳的靈活度，組件亦不容易掉下，配上穩固的站立，是件必收貨品之一。需注意背後的浮游炮重量可能使機體不穩，傾斜等情況。</ConText>
            <Space h="lg"/>
            <ConText>推薦度：⭐️⭐️⭐️⭐️⭐️</ConText>
            <ConTitle order={2}>3.RG 1/144 MSN-02 Zeong</ConTitle>
            <Image alt="Zeong" src="/img/5-gundam/3.webp"/>
            <ConText>《機動戦士》0079中馬沙的MS，自護軍的新類型人專用MS ，亦是自護軍最後投入實戰的MS。靈活度與結構超乎想像。亦採用新型骨架，大大增強模型的穩定度。</ConText>
            <Space h="lg"/>
            <ConText>推薦度：⭐️⭐️⭐️⭐️⭐️</ConText>
            <ConTitle order={2}>4. RG 1/144 MSN-04 Sazabi </ConTitle>
            <Image alt="Sazabi" src="/img/5-gundam/4.webp"/>
            <Space  h="lg"/>
            <ConText>《機動戰士高達馬沙之反擊》中馬沙的MS，乃是為了配合新人類的能力而設，並裝有精神感應框架的究極MS。RG而言巨大的機體，鮮紅的配色，配合著巨大的靈活度，裂甲組件亦甚為豐富，是除了size之外比美MG Sazabi的RG機體，需注意在製作時小心肩部組件的鬆脫。</ConText>
            <ConText>推薦度：⭐️⭐️⭐️⭐️⭐️(-⭐️肩部缺陷是減分點）</ConText>
        
            <ConTitle>5.RG 1/144 Evangelion Unit-01</ConTitle>
            <Image alt="Unit-01" src="/img/5-gundam/5.webp"/>
            <ConText>《新世紀福音戰士》中主角碇真嗣的EVA戰鬥測試模擬型，身為系列主題人類補完計劃的關鍵因素。紫色塗裝的外型，機內寄存有碇唯(碇真嗣母親）的靈魂。本機體擁有超高水準的分色設計及靈活度，提供一個非高達的不錯選擇給用家。另需注意組件容易掉下。</ConText>
            <ConText h1={"lg"}>推薦度：⭐️⭐️⭐️⭐️</ConText>
        </Container>
            
   );
}

export default function Page(){
    return (
        <>
            <Meta description={"高達模型,必入手高達"} Image="/img/5-gundam/1.5.jifi"/>
            <Container>
                <ConPage/>
            </Container>
        </>
    );
}