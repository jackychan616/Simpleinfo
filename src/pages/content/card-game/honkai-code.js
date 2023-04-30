import { ConText, ConTitle } from '../../components/component';
import { Container, Image,List,Space} from '@mantine/core';
import Head from 'next/head';
export default function Page(){
    return(
        <>
            <Head>
                <title>直接送400星瓊! 星穹鐵道最新兌換碼</title>
            </Head>
            <Container>
                <ConTitle>星穹鐵道最新兌換碼 直接送400星瓊!</ConTitle>
                <ConText>各位登上了星穹列車了嗎? 我們為大家收集了所有崩壞：星穹鐵道的兌換碼，幫助您進行星際冒險。我們會定期更新本教學，請務必回來查看以知道所有最新的兌換碼。</ConText>
                <Space h="lg"/>
                <ConTitle order={2} size="h2">最新的兌換碼</ConTitle>
                <List size="lg">
                    <List.Item>STARRAILGIFT</List.Item>
                    <List.Item>HSRVER10XEDLFE</List.Item>
                    <List.Item>HSRGRANDOPEN1</List.Item>
                    <List.Item>HSRGRANDOPEN2</List.Item>
                    <List.Item>HSRGRANDOPEN3</List.Item> 
                </List>
                <ConTitle order={2} size="h2">要如何兌換？</ConTitle>
                <ConText>前往以下官網登入即可！</ConText>
                <ConText><a href="https://hsr.hoyoverse.com/gift">https://hsr.hoyoverse.com/gift</a></ConText>
            </Container>
        </>
    );
}