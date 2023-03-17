import {Title,Container,Image} from '@mantine/core';


export function Page({children,title,hTitle,img}){
    return (
        <>
            <Container >
                <Title order={1}>{hTitle}</Title>
                <Image maw={700} src={img} alt=""/>   
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