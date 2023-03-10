import Head from 'next/head';
import Link from 'next/link';
import {Page }from '../../components/page_index';
import { ArtiCard } from '../../components/card';
import Meta from '../../components/meta';
import { Container } from '@mantine/core';
const Bloglist=[
    {name:'如何使用AI繒圖？',path:'ai-tutorial/photo-ai-tutorial',img:'/img/ai-generate-img.webp',date:'1/3/2023'},
    {name:'如何在Windows本地部署Stable Diffusion?',path:'ai-tutorial/setup-stable-diffusion',img:'/img/stable-diffusion.webp',date:'1/3/2023'}
]


export default function content(){
    return (
        <>
            <Container>
                <Page hTitle="AI 教學" img="/img/ai.jpg"
                 fill
                 sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         33vw">
                <ArtiCard data={Bloglist}/>
                </Page>
            </Container>
            <Meta  subtitle=" AI 教學" description=" AI教學,包括Chatgpt,stable diffusion 等等的教學"/>
            
        </>
        
    );
}