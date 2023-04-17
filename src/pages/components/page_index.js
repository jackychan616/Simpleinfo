import {Title,Container,Image,Center} from '@mantine/core';


export function Page({children,title,hTitle,img}){
    return (
        <>
            <Container >
                <Center><Title order={1}>{hTitle}</Title></Center>
                <div>
                    <Image maw={700} src={img} alt=""/>   
                </div>
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