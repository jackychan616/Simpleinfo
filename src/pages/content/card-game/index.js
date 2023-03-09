
import{ Page}  from '../../components/page_index';
import{ ArtiCard }from '../../components/card';
import Meta from '../../components/meta';
import { Container } from '@mantine/core';

const Bloglist=[
    {name:'[porker 撲克牌] 二十一點玩法教學',path:'/card-game/poker_21point_quick_talk',img:'/img/poker.jpg',},
    {name:'《小小諾亞-樂園的繼承者》介紹',path:'/card-game/little-noah-introduce',img:'/img/little-noach-introduce/4.png'}
];

export default function ConPage(){
    return (
        <>
            <Container>
                <Page title="Simple Info - 遊戲" hTitle="分享游戲中大小事" img="/img/game.jpg">
                    <ArtiCard data={Bloglist}/>
                </Page>
            </Container>
            <Meta />
            
        </>
        
    );
}