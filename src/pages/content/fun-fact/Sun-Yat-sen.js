import { ConTitle,ConText } from "../../components/component";
import Head from 'next/head';
import {Container,Image} from '@mantine/core';
import { Sharebutton } from "src/pages/components/newshare";
import Meta from "src/pages/components/meta";
function Body(){
    return(
        <Container>
            <ConTitle order = {1}>
                古人的性癖好 孫中山是蘿莉控？
            </ConTitle>
            <ConText>
                我們若說到中國近代史的傳奇人物，那麼孫中山必定榜上有名。孫中山是著名的革命先鋒，為辛亥革命的重要人物之一。可是，這位革命烈士在性方面有着有趣的一面。
            </ConText>
            <ConTitle order = {2}>
                孫中山是蘿莉控？
            </ConTitle>
            <ConText>
                孫中山有一位伴侶（非正妻），叫大月薰。據說孫中山在流亡日本時認識了友人的女兒，那人即大月薰（當時10歲）。過後孫文愛上了她並向其父大月素堂提親，在一番波折後大月薰在15歲時與孫文結婚。
            </ConText>
            <Image src="/img/Sun Yat-sen-2.jpg"></Image>
            <ConText>
            另外，孫中山的二妻宋慶齡，比孫中山年輕27歲，即使在宋家的反對之下，孫文亦堅持與之結婚。
            </ConText>
            <Image src="/img/Sun Yat-sen-1.jpg" height={"600px"} width = {"300px"}></Image>       
        </Container>
    );
}

export default function Page() {
    return (
        <>
            <Head>
                古人的性癖好 孫中山是蘿莉控？
            </Head>
            <Body/>
            <Meta description={"孫中山有一位伴侶（非正妻），叫大月薰。據說孫中山在流亡日本時認識了友人的女兒，那人即大月薰（當時10歲）。過後孫文愛上了她並向其父大月素堂提親，在一番波折後大月薰在15歲時與孫文結婚。"}
            img = {"https://simpleinfo.live/img/Sun-Yat-Sen.jpeg"}/>
        </>
    )
}