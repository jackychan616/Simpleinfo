import Head from 'next/head';
import Link from 'next/link';
import{ Page}  from '../../components/page_index';
import{ ArtiCard }from '../../components/card';
import Meta from '../../components/meta';

const Bloglist=[
    {name:'[porker 撲克牌] 二十一點玩法教學',path:'poker_21point_quick_talk',img:'/img/poker.jpg',}
];

export default function ConPage(){
    return (
        <>
            <Meta />
            <Page title="Simple Info - 遊戲" hTitle="分享游戲中大小事" img="/img/card-game.jpg">
            <ArtiCard data={Bloglist}/>
            </Page>
        </>
        
    );
}