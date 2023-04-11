import { ConText, ConTitle } from '../../components/component';
import {Meta} from '../../components/meta';
import { Container, List,Image} from '@mantine/core';

function Page(){
    return(
        <Container>
            <ConTitle order={1} size="h1">Web 3.0和區塊鏈是什麼?是否對現實生活和環境的潛在環境有影響？</ConTitle>
            <ConText>Web 3.0是指第三代網際網路，也稱為分佈式網路，其重點在於將網際網路從僅將信息分發給被動接收者轉變為一個更去中心化的互動平台，其中用戶可以使用自己的資料、數位貨幣和智能合約，進行更安全、更透明和更互動的操作。Web 3 的核心特點是去中心化和去信任化，這使得每個人都可以受益，而無需與任何中心化組織或機構相關聯。</ConText>
            <ConText>Web 3.0 的主要目的是提供一個更加自由、更加匿名和更加保護用戶隱私的互聯網環境。與 Web 2.0 相比，Web 3 允許用戶更加自由地控制他們的數據和信息，並且可以更好地保護用戶的隱私和安全。</ConText>
            <ConTitle order={2} size="h2">Web 3 核心技術</ConTitle>
            <List>
                <List.Item>分布式賬本技術 (DLT)</List.Item>
                <List.Item>智能合約</List.Item>
                <List.Item>去中心化應用程序 (DApps)</List.Item>
                <List.Item>加密貨幣</List.Item>
                <List.Item>去中心化自治組織 (DAO)</List.Item>
            </List>
            <ConText>這些技術可以讓用戶創建一個更加去中心化、更加安全和更加透明的互聯網環境。</ConText>
            <ConTitle order={2} size="h2">去中心化是甚麼?</ConTitle>
            <ConText>我們在上面初步介紹Wev 3 時提到{`"去中心化"`}。去中心化是一個概念，用於指代一個系統、應用程序或協議，其中權力和控制不被單個實體或集中式機構掌握，而是分散到多個節點中。在去中心化系統中，每個節點都有權參與決策過程和維護整個系統的運行，而無需求助於統一的第三方機構。</ConText>
            <ConText>去中心化技術可以被用於創建開放系統、數字貨幣的交易、檔案存儲和網路通信等領域。去中心化的應用程序通常比傳統的中心化系統更為透明、安全和公平，因為它們可以適應更多的參與者，並且不受單個實體或組織的控制。</ConText>
            <ConTitle order={2} size="h1">區塊鏈的基本概念</ConTitle>
            <ConText>區塊鏈技術是一種進階資料庫機制，允許在業務網路中分享透明的資訊。區塊鏈資料庫會將資料存放在連結於同一鏈的區塊中。資料在時間順序上具有一致性，因為在無網路共識的情況下，您不能刪除或修改此鏈。因此，您可以使用區塊鏈技術建立不可更改或不可變的總帳，以追蹤訂單、付款、帳戶以及其他交易。這個系統有內建機制，可預防未經授權的交易進入以及在這些交易的共享檢視中建立一致性。</ConText>
            <ConText>區塊鏈的去中心化特性讓它無法被任何政府或體驗貢獻控制。這樣做讓區塊鏈在自由倫方面具有優勢，因為它讓每個人都可以尋找和創建自己的區塊鏈，而不需要與任何中央機構或政府關係。此外，區塊鏈的匿名性也讓它在社交媒體方面具有優勢，因為每個人都可以尋找和創建自己的社交媒體網站，而不需要與任何中央機構或政府關係。</ConText>
            <ConText>區塊鏈的主要目標是提供一種安全、透明和去中心化的通貨。這樣做可以讓用戶們在不需要與任何中央機構或政府關係的情況下，通過分散式網絡來進行交易。此外，區塊鏈也可以讓用戶們創建和創建自己的區塊鏈，而不需要與任何中央機構或政府關係。</ConText>
            <ConTitle order={2} size="h2">Web 3.0對環境和資源的潛在環境影響</ConTitle>
            <ConText>區塊鏈技術的運行需要消耗大量能源和資源，帶來碳排放等問題。</ConText>
            <Image maw={600} src="https://i.insider.com/607ea20044f4540019207a19?width=1136&format=jpeg" alt="Bitcoin 比特幣 礦場" caption="比特幣礦場 圖源:(Markets Insider)"/>
            <ConTitle order={2} size="h1">數據分析機構 (Forex Suggest)研究報告:2022年比特幣碳排量升至最高</ConTitle>
            <ConText>研究報告指2022年八種污染最嚴重的加密貨幣的二氧化碳總排放量估計上升至 8,700 萬噸，其中比特幣全年碳排量估計高達 8,630 萬噸，佔比近 99%，需要種植 4.32 億棵樹才能抵銷。</ConText>
            <ConText>報告指出，比特幣是迄今為止污染最嚴重的加密貨幣，每筆交易使用的電量達 1183.58 千瓦時（kWh），相當於排放 1,775 磅、接近 1 噸的二氧化碳，與 2021 年 BTC 每筆交易產生的 1,061 磅碳排量相比，出現相當程度的增長。</ConText>
            <Image maw ={650} alt="2022 碳排量最大前八加密貨幣" caption="2022年碳排量最大前八加密貨幣 圖源:(Forex Suggest)" src="/img/what-is-web3/比特幣碳排量-220107.jpeg"/>
                
        </Container>
    );
}

export default function ConPage(){
    return (
        <>
            <Meta img="/img/what-is-web3/blockchain.jpg" pageTitle={"Web 3.0和區塊鏈是什麼?是否對現實生活和環境的潛在環境有影響？"} description={"Web 3.0是指第三代網際網路，也稱為分佈式網路，其重點在於將網際網路從僅將信息分發給被動接收者轉變為一個更去中心化的互動平台，其中用戶可以使用自己的資料、數位貨幣和智能合約，進行更安全、更透明和更互動的操作。Web 3 的核心特點是去中心化和去信任化，這使得每個人都可以受益，而無需與任何中心化組織或機構相關聯。"}/>
            <page/>
        </>
    );
}