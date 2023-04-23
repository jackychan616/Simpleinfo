import {Title,Container,Image,Center,Space} from '@mantine/core';


export function Page({children,title,hTitle,img}){
    return (
        <>
            <Container >
                <Center><Title order={1}>{hTitle}</Title></Center>
                <Space h="lg"/>
                <Center>
                    <Image maw={700} src={img} alt=""/>   
                </Center>
            </Container>
            {children}
            
        </>
    );
}

function Context(){
    return (
      <>
      </>
    );
}
export default Context;