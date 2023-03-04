import Head from 'next/head';
import Link from 'next/link';
import {Page }from '../../components/page_index';

const BlogList=[
    {title:'如何使用AI繒圖？',path:'photo-ai-tutorial',img:'/img/'}
]


export default function content(){
    return (
        <Page Title="AI" hTitle="AI" />
    );
}