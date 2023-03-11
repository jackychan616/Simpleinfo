import Link from "next/link";
import Image from "next/image";
import { Container } from "@mantine/core";
import {ArtiCard} from "../../components/card";
import Meta from "../../components/meta";
import { Page } from '../../components/page_index';
const Bloglist=[
    {name:"海布里之王-亨利",path:"/sport/football-henry",date:'',img:'/img/football-henry.jpg'},
    {name:"足球界的革新和希望  國王聯賽",path:"/sport/football-new-hope",date:'',img:"https://webcdn.guangming.com.my/wp-content/uploads/2023/02/%E6%9C%AA%E5%91%BD%E5%90%8D-1-144.jpg"}
    
];

export default function ConPage(){
    return(
        <>
            <Meta subtitle={"體育"} description="體育"/>
            <Container>
               <Page title="體育" img="https://library.sportingnews.com/styles/facebook_1200x630/s3/2021-08/world-cup-trophy-stand_133kk6nwawbmj16uhxvaiznup2.jpg?itok=bYPSCbur" hTitle="體育">
                    <ArtiCard data={Bloglist}/> 
                </Page>
            </Container>
            
        </>
    );
}
