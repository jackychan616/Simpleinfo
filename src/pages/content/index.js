import Link from "next/link";
import Image from "next/image";
import { Container } from "@mantine/core";
import {ArtiCard} from "../components/card";


const PostData =[
    {
        name: '電腦編程教學',img: '/img/py.jpg',path: '/content/python-tutorial',date:''
    },
    {
        name: 'linux 教學',img: '/img/linux.jpeg',path: '/content/linux-tutorial' ,date:''
    },
    {
        name:"[porker 撲克牌] 二十一點玩法教學 ",img:"/img/poker.jpg",path:"/content/card-game",date:''
    }


];

export default function Page(){
    return (
        <Container>
            <ArtiCard data={PostData}/>
        </Container>
       
    );
}