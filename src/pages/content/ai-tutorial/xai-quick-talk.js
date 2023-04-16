import { Container, Image,Space } from '@mantine/core';
import { ConText, ConTitle} from '../../components/component';
import {Meta} from '../../components/meta';

function Page(){
    return(
        <Container>
            <ConTitle order={1} size="h1">Elon Musk 創立了 X.AI 公司對抗OpenAI</ConTitle>
            <Space h="lg"/>
            <Image src="/img/xai-quick-talk/elon-musk.jpg" maw={500} alt="Elon Musk 創立了 X.AI Corp. 公司對抗OpenAI"/>
            <Space h="lg"/>
            <ConText>根據《華爾街日報》前日 (14)的一份新報告，埃隆-馬斯克在內華達州成立了一家新的人工智能公司，名為X.AI公司。馬斯克被列為該公司的董事，被廣泛認為是馬斯克幕後得力助手的賈里德-伯查爾被列為該公司的秘書。</ConText>
            <Space h="lg"/>
            <Space h="lg"/>
            <ConText>馬斯克公開呼籲將OpenAI的ChatGPT等人工智能工具的開發暫停六個月，但這並沒有阻止馬斯克全力開發自己的AI。馬斯克在2015年幫助共同創立了OpenAI，但在2018年的權力鬥爭後離開了該公司。據《內幕》雜志記者本周早些時候報道，馬斯克最近從人工智能領域雇傭了一些大人物，包括Igor Babuschkin和Manuel Kroiss。Babuschkin是從谷歌母公司Alphabet的人工智能部門DeepMind雇來的。</ConText>
            <Space h="lg"/>
            <Space h="lg"/>
            <ConText>上個月，人們認為馬斯克將在他2022年10月收購的Twitter公司旗下從事人工智能工作，但現在很明顯，他想在內華達州的這家新的獨立公司開發人工智能。</ConText>
            <Space h="lg"/>
            <Space h="lg"/>
            <ConText>此舉被認為是試圖建立一個也允許支付的社交媒體平台，將其變成 {`"萬能的應用程序"`}，類似於微信等應用程序在中國的運作方式。根據《華爾街日報》的一份新報告，Twitter本周宣布與eToro合作，讓用戶能夠交易股票和加密貨幣。</ConText>
            <Space h="lg"/>
        </Container>
    );
}

export default function ConPage(){
    return(
        <>
            <Meta 
            pageTitle="Elon Musk 創立了 X.AI 公司對抗OpenAI" 
            alt="Elon Musk 創立了 X.AI 公司對抗OpenAI" 
            img="/img/xai-quick-talk/elon-musk.jpg"
            description={"根據《華爾街日報》前日 (14)的一份新報告，埃隆-馬斯克在內華達州成立了一家新的人工智能公司，名為X.AI公司。馬斯克被列為該公司的董事，被廣泛認為是馬斯克幕後得力助手的賈里德-伯查爾被列為該公司的秘書。"}
/>
            <Page/>
        </>
    );
}