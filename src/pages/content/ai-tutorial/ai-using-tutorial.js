import { Container, Table ,Space,Code } from '@mantine/core';
import { ConText, ConTitle } from '../../components/component';
import Meta from '../../components/meta';
import { Comments } from '../../components/comment';
import { ListItem } from '@mui/material';

const elements =[
    {type:'小說',saying:'它可以幫助你撰寫小說，不論是言情、懸疑、恐怖、科幻等各種類型。此外，它還提供有力的創作構思，讓你打造引人入勝的情節和角色，並提供多種專業的寫作技巧和建議。'},
    {type:'學術論文',saying:'它能夠協助你創作文學作品，包括小說、故事、劇本、詩歌等各種創意。無論是描寫情節還是塑造角色，它都能夠提供有力的幫助和設計，讓你的作品更加生動、深刻、吸引人。'},
    {type:'翻譯',saying:'它能夠深入進行英中文之間的翻譯工作，包括學術論文、商業文件、網站內容、軟件介面等等範疇。這些翻譯工作都能夠得到程式的準確、專業的保障，讓你的信息得到全面、合理的呈現。'},
    {type:'文本分類',saying:'將文本分成不同的類別，例如信件、新聞、評論、廣告等。'}
];

function ConTable(){
    const rows = elements.map((e)=>(
        <tr key={e.type}>
            <td>{e.type}</td>
            <td>{e.saying}</td>
        </tr>
    ));
}

function ConPage(){
    return(
        <Container>
            <ConTitle>ChatGPT 使用指南</ConTitle>
            <ConText>ChatGPT是一個電腦生成對話（CGD）系統，它基於GPT-3（一種人工智能（AI）語言生成模型）設計。它能夠通過記憶、理解、推理、回答問題等方式，與使用者進行自然對話，從而為人們提供幫助、解決問題和提供信息。</ConText>
            <ConTitle order={2} size="h2">chatgpt 可以做什麼?</ConTitle>
            <Table striped highlightOnHover withBorder withColumnBorders>
                <thread>
                    <tr>
                        <th>類別</th>
                        <th>詳細描述</th>
                    </tr>
                </thread>
                <tbody>{rows}</tbody>
            </Table>
            <ConTitle order={2} size="h2">問題示例</ConTitle>
            <Space h="lg"/>
            <ConTitle order={3 } size="h3 ">金融分析師</ConTitle>
            <Code>對於客戶獲取長期利益而言，需要有具備技術分析工具和圖表閱讀經驗的專業人士提供幫助，同時解釋全球宏觀經濟環境以幫助客戶做出清晰的決策。準確並明智的預測是尋求確定判斷的必要條件。第一條聲明涵蓋了類似“您能否根據當前情況告訴我們未來股市會如何？”的問題。</Code>
            <ConTitle>廚師</ConTitle>
            <Code>我需要有人可以推薦美味的食譜，這些食譜包括營養有益但又簡單又不費時的食物，因此適合像我們這樣忙碌的人以及成本效益等其他因素，因此整體菜餚最終既健康又經濟！我的第一個要求——“一些清淡而充實的東西，可以在午休時間快速煮熟</Code>        
        

        
        </Container>
    );
}

export default function Page(){
    return(
        <>
            <Meta pageTitle={"如何使用Chatgpt? ChatGPT 中文調教指南"}/>

        </>
    );
}