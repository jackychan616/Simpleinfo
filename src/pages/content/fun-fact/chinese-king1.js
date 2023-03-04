import { ConTitle,ConText } from "../../components/component";
import Head from 'next/head';
import {Container} from '@mantine/core';

function ConPage(){
    return (
        <Container>
            <ConTitle order={1}>中國古代最重要的君主列表</ConTitle>
            <ConText>君主，意指最高首領。從夏朝開始列起。中國有一段歷史悠久的君主制歷史，在秦始皇之前，君主擁有諸多頭銜，例如「天子」、「王」等。自秦始皇統一中國後，「皇帝」成為中國君主的主要稱號。最早的君主標誌是相傳為夏朝大禹製作的九鼎;自秦朝開始，中國第一位皇帝秦始皇帝改以傳國玉璽以及金龍作為正統皇朝的標誌。</ConText>
            <ConTitle order={2}>1.文命(大禹)</ConTitle>
            <ConText>中國神話人物，黃帝軒轅氏玄孫，受舜帝的禪讓成為天子。成名於治理洪水之患一事。傳說中，禹是中國歷史上第一個家天下政權夏朝的開創者。</ConText>
            <ConTitle order={2}>2.少康</ConTitle>
            <ConText >夏朝第六任君主。相的兒子。相是諸侯后羿立的傀儡，即位未幾，后羿被其大臣寒浞所殺，寒浞派澆(其兒子）率兵攻打相，殺了相。然而相的妻子已懷孕，並且從中逃出，逃至娘家避居，生兒子少康。夏朝遺臣伯靡不降寒浞，伯靡集結夏朝遺民之力，殲滅寒浞大軍，改立少康為王。接着少康重新取回政權，成為第六代夏朝天子。在位期間，少康勤政愛民，專心農業水利，史稱為「少康中興」。</ConText>
            <ConTitle order={2}>.3. 履癸(桀)</ConTitle>
            <ConText>夏朝第十七任君主，亦是最後一任君主。他寵信王后妺喜，對政事不聞不問，又好殺忠臣。後來商湯起兵，於是桀逃到鳴條。在鳴條之戰，桀戰敗，夏朝就此滅亡。之後，他被流放至南巢，不久病死。</ConText>

        </Container>
    );
}

export default function Page(){
    return (
        <>
            <Head>
                <title>中國古代最重要的君主列表</title>
            </Head>
            <ConPage/>
        </>
    );
}