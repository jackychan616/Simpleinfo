import Link from "next/link";
import Image from "next/image";
import { Container } from "@mantine/core";
import ArtiCard from "../components/card";

const PostData =[
    {
        title: 'Python 教學',image: '/img/py.jpg',"date": 'September 12, 2022',href: '/content/python-tutorial'
    },
    {
        title: 'linux 教學',image: '/img/linux.jpeg',date: 'September 12, 2022',href: '/content/linux-tutorial' 
    },
    {
        title:"[porker 撲克牌] 二十一點玩法教學 ",image:"/img/poker.jpg",date:"September 12, 2022",href:"/content/card-game"
    },
    {

    }


]

export default function Page(){
    return (
        <Container>
            <ArtiCard PostData={PostData}/>
        </Container>
       
    );
}