import Head from 'next/head';
import {Title,Container,Image} from '@mantine/core';


export function Page({children,title,hTitle,img}){
    return (
        <>
            <Head>
                <title>{title}</title>    
            </Head> 
            <Container >
                <Title order={1}>{hTitle}</Title>
                <Image src={img} alt=""/>
            </Container>
            {children}
            
        </>
    );
}