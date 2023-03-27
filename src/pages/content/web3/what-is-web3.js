import { ConText, ConTitle } from '../../components/component';
import Meta from '../../components/meta';
import { Container,  } from '@mantine/core';

function Page(){
    return(
        <Container>
            <ConTitle>什麼是Web 3和區塊鏈?</ConTitle>
            <ConText>Web 3.0是指第三代網際網路，也稱為分佈式網路，其重點在於將網際網路從僅將信息分發給被動接收者轉變為一個更去中心化的互動平台，其中用戶可以使用自己的資料、數位貨幣和智能合約，進行更安全、更透明和更互動的操作。</ConText>
            <ConTitle>去中心化是甚麼?</ConTitle>
            <ConText>我們在上面初步介紹Wev 3 時提到{`"去中心化"`}。去中心化是一個概念，用於指代一個系統、應用程序或協議，其中權力和控制不被單個實體或集中式機構掌握，而是分散到多個節點中。在去中心化系統中，每個節點都有權參與決策過程和維護整個系統的運行，而無需求助於統一的第三方機構。</ConText>
            <ConText>去中心化技術可以被用於創建開放系統、數字貨幣的交易、檔案存儲和網路通信等領域。去中心化的應用程序通常比傳統的中心化系統更為透明、安全和公平，因為它們可以適應更多的參與者，並且不受單個實體或組織的控制。</ConText>
        </Container>
    );
}

export default function ConPage(){
    return (
        <>
            <Meta/>
            <Container>
                <Page/>
            </Container>
        </>
    );
}