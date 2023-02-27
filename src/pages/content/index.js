import Link from "next/link";
import Image from "next/image";
import { Container } from "@mantine/core";
import ArtiCard from "../components/card";


const PostData =[
    {
        title: 'Python 教學',image: '/img/py.jpg',href: '/content/python-tutorial',data: 'September 12, 2022',
    },
    {
        title: 'linux 教學',image: '/img/linux.jpeg',href: '/content/linux-tutorial' ,date: 'September 12, 2022',
    },
    {
        title:"[porker 撲克牌] 二十一點玩法教學 ",image:"/img/poker.jpg",href:"/content/card-game",date: 'September 12, 2022',
    }


];

export default function Page(){
    return (
        <Container>
            <ArtiCard />
        </Container>
       
    );
}