import { ConTitle,ConText } from "../../components/component";
import Head from 'next/head';
import {Container,Image,Space} from '@mantine/core';

function Conpage(){
    return(
        <Container>
            <Contitle>
                <strong>
                    西線無戰事
                </strong>
            </Contitle>
            <Image src="/img/西線無戰事.jpeg" height="650" width = "650" alt ="西線無戰事"></Image>
            <ConText>
            《西線無戰事》是一部德國反戰電影，改編自埃里希·瑪利亞·雷馬克的同名小說。該片由路易斯·邁爾斯執導，於 1979 年上映，獲得了眾多的好評與獎項，被譽為是史上最偉大的反戰電影之一。
            </ConText>
            <ConText>
            該片講述了第一次世界大戰期間德國軍隊一名年輕士兵保羅·包美爾的故事，他和他的戰友們經歷了戰爭的種種痛苦和荒唐。從一位懵懂無知的少年到最後成為了一個充滿疲憊和傷痛的戰士，保羅的成長過程是該片的一大亮點。保羅在戰爭中看到了生命的脆弱和無常，他也體驗到了戰爭對於普通士兵的摧殘和心理上的傷害。
            </ConText>
            <Image src="/img/西線無戰事_02.jpg" caption = "保羅" height= "500" width = "500" alt = "保羅·包美爾"></Image>
            <Space h="xl"/>
            <ConTitle>
                電影的有趣之處
            </ConTitle>
            <ConText>
            影片通過保羅的視角，展現了戰爭中人性的扭曲和荒唐。戰爭讓士兵們不得不放棄自己的思想和人性，他們只能成為戰爭機器的一部分。影片將人性的可貴和珍貴體現在戰爭的殘酷中，將士兵的死亡描繪得非常真實和生動，觀眾可以感受到戰爭對於士兵的摧殘和心理上的傷害。
            </ConText>
        </Container>       
    );
}

export default function page(){
    return(
        <>
            <Head>
                <title>
                    西線無戰事 - 奪4項奧斯卡獎
                </title>
            </Head>
            <Conpage/>
        </>
    );
}