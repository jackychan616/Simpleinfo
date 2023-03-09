import Link from "next/link";
import Image from "next/image";
import { Container } from "@mantine/core";
import {ArtiCard} from "../../components/card";
import Meta from "../../components/meta";
import { Page } from '../../components/page_index';
const BlogList=[
    {name:"海布里之王-亨利",path:"/sport/football-henry",date:'',img:'/img/football-henry.jpg'}
]

export default function ConPage(){
    return(
        <>
            <Meta subtitle={"體育"} description="體育"/>
            <Container>
               <Page title="體育" img="https://library.sportingnews.com/styles/facebook_1200x630/s3/2021-08/world-cup-trophy-stand_133kk6nwawbmj16uhxvaiznup2.jpg?itok=bYPSCbur" hTitle="體育">
                    <ArtiCard data={BlogList}/> 
                </Page>
            </Container>
            
        </>
    );
}
