import { ConText, ConTitle } from '../../components/component';
import { Container, Image, Space } from '@mantine/core';

function Page(){
    return(
    <>
        <ConTitle>AssemeblyAI 強大的AI語音識別工具，快速整合影片重點、內容摘要、主題</ConTitle>
        <ConText>AssemblyAI是强大的工具，它來幫助你轉錄和理解音頻。它能夠預先錄制的音頻和視頻文件以及實時音頻流自動轉換為文本轉錄。</ConText>\
        <ConTitle order={2} size="h2">功能</ConTitle>
        <ConText></ConText>
    </>);
}

export default function ConPage(){
    return(
        <>
            <Page/>
        </>
    );
}