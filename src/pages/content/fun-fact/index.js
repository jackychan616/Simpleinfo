import Head from 'next/head';
import { Container } from '@mantine/core';
import { ArtiCard } from '../../components/card';

const BlogData=[
    {name:'中國古代最重要的君主(上)',path:'chinese-king1',img:'/img/chinese-king1.jpg',date:''},
    {name:'中國古代最重要的君主(下)',path:'chinese-king2',img:'/img/chinese-king2.jpeg',date:''}
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
            <ConPage/>
        </>
    );
}
