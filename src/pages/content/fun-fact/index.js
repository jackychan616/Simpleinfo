import Head from 'next/head';
import { Container } from '@mantine/core';
import { ArtiCard } from '../../components/card';
import Meta from '../../components/meta';

const BlogData=[
    {name:'中國古代最重要的君主(上)',path:'chinese-king1',img:'/img/chinese-king1.jpg',date:'3/3/2023'},
    {name:'中國古代最重要的君主(下)',path:'chinese-king2',img:'/img/chinese-king2.jpeg',date:'3/3/2023'},
    {name:'古人的性癖好 孫中山是蘿莉控?',path:'Sun-Yat-sen',img:'/img/Sun-Yat-sen.jpeg',date:'6/3/2023'}
]

function ConPage(){
    return(
        <Container >
            <ArtiCard data={BlogData}/>
        </Container>
    );
}

export default function Page (){
    return(
        <>
            <Head>
                <title>有趣小知識</title>
            </Head>
            <Meta description="有趣小知識,中國近代史,中國歷史"/>
            <ArtiCard data={BlogData}/>
        </>
    );
}
