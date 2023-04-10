import { Page } from '../../components/page_index';
import { ArtiCard } from '../../components/card';
import {Meta} from '../../components/meta';
import { Container } from '@mantine/core';

const Bloglist = [{
    name:'Web 3.0和區塊鏈是什麼?是否對現實生活和環境的潛在環境有影響？',
    path:'/web3/what-is-web3',
    img:'/img/what-is-web4/blockchain.jpg',
    date:'10/4/2023',
    tag:'web 3.0'
},
];

export default function ConPage(){
    <>
        <Meta/>
        <Container>
            <Page title="Web 3" hTitle="最新區塊鏈資訊" img="/img/web3.jpg"/>
        </Container>
    </>
   
}