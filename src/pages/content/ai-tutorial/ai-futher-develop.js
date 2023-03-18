import {Container} from '@mantine/core';
import {ConText,ConTitle} from '../../components/component';

export default function Page(){
    return(
        <Container>
            <ConTitle order={1} size="h1">AI未來發展的前景,商業分析竟佔重要地位</ConTitle>
            <ConText>隨著科技快速發展，人工智慧 (AI) 已經成為一個越來越受到關注的技術領域。AI的應用可以幫助企業提高效率、改善產品品質、為人類解決許多問題。未來，AI的發展前景非常廣闊， 亦能接手很多人類的工作。</ConText>
            <ConTitle order={2} size="h2">自動駕駛汽車</ConTitle>
            <ConText></ConText>
        </Container>
    );
}