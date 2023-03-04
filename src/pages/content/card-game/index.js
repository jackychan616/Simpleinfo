import Head from 'next/head';
import Link from 'next/link';
import Page  from '../../components/page_index';
import ArtiCard from '../../components/card';

const Bloglist=[
    {name:'[porker 撲克牌] 二十一點玩法教學',hTitle:'二十一點玩法教學',img:'/img/poker.jpg',}
];

export default function ConPage(){
    return (
        <>
            <Page title="Simple Info - 遊戲" hTitle="分享游戲中大小事" img="/img/card-game.jpg">
                <ArtiCard data={Bloglist}/>
            </Page>
            
        </>
        
    );
}