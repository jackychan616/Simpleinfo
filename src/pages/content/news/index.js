import { ArtiCard } from '../../components/card';
import Meta from '../../components/meta';
import Page from '../../components/page_index';
import {Container} from '@mantine/core';

const Bloglist = [
    {
        "name":"不在藏了 王菲和謝霆鋒",
        "path":"Faye-Wong",
        "img":"/img/faye_Wong_03.jpg",
        "date":"11/3/23"
    }
];

export default function page(){
    return(
        <>  
            <Meta description="新聞,香港社會新聞,香港新聞,娛樂新聞"/>
            <Container>
                <Page hTitle={"新聞"} img="/img/simple_info.png" title = {"新聞"}>
                    <ArtiCard data={Bloglist}/>
                </Page>
            </Container>
        </>
    );
}