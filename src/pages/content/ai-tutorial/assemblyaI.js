import { ConText, ConTitle } from '../../components/component';
import { Container, Image, Space } from '@mantine/core';

function Page(){
    return(
    <>
        <ConTitle>AssemeblyAI 強大的AI語音識別工具，快速整合影片重點、內容摘要、主題</ConTitle>
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