import Link from "next/link";
import Image from "next/image";
import { Container } from "@mantine/core";
import {ArtiCard} from "../components/card";


const PostData =[
    {
        name: '電腦編程教學',img: '/img/coding.jpg',path: '/content/code-tutorial/python-tutorial',date:''
    },
    {
        name: 'AI 教學',img: '/img/ai.jpg',path: '/content/ai-tutorial' ,date:''
    },
    {
        name:"遊戲 ",img:"/img/game.jpg",path:"/content/card-game",date:''
    },
    {
        name:"有趣知識",img:'/img/fact.jpg',path:"/content/fun-fact",date:''
    }


];

export default function Page(){
    return (
        <Container>
            <ArtiCard data={PostData}/>
        </Container>
       
    );
}