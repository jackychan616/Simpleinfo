import {ConText,ConTitle} from '../../components/component';
import Meta from '../../components/meta';
import {Container,Image,Space} from '@mantine/core';
function ConPage(){
    return (
        <Container>
            <ConTitle order={1}>RG 1/144系列必入手的商品</ConTitle>
            <ConTitle order={2}>1. RG 1/144 RX-93-ν2 Hi-Nu GUNDAM</ConTitle>
            <Image alt="Hi-Nu" src={"/img/5-gundam/1.jpg"} caption={">Hi-Nu"}/>
            <ConText >Hi-Nu高達是小說《機動戰士高達馬沙之反擊, 貝托蒂嘉的子嗣》中主角阿寶的MS，精密細緻的組件，配搭清晰分明的分色，並且擁有一流的靈活度，不失為一件良好的RG商品。</ConText>
            <Space h="lg"/>
            <Image src="/img/5-gundam/1.5.jfif" alt="Hi-Nu"/>
            <Space h="lg"/>
            
        </Container>
            
   );
}

export default function Page(){
    return (
        <>
            <Meta description={"高達模型,必入手高達"} Image="/img/5-gundam/1.5.jifi"/>
            
        </>
    );
}