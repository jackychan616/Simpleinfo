import { Page } from '../../components/page_index';
import { ArtiCard } from '../../components/card';
import {Meta} from '../../components/meta';
import { Container } from '@mantine/core';

const Bloglist = [{}];

export default function ConPage(){
    <>
        <Meta/>
        <Container>
            <Page title="Web 3" hTitle="最新區塊鏈資訊" img="/img/web3.jpg"/>
        </Container>
    </>
   
}