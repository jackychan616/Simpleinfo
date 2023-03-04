import Head from 'next/head';
import Link from 'next/link';
import {Page }from '../../components/page_index';
import { ArtiCard } from '../../components/card';

const BlogList=[
    {name:'如何使用AI繒圖？',path:'photo-ai-tutorial',img:'/img/stable-diffusion.jpg',date:''}
]


export default function content(){
    return (
        <>
            <Page title="Simple Info - AI" hTitle="AI 教學" img="/img/ai.jpg"/>
            <ArtiCard data={BlogList}/>
        </>
        
    );
}