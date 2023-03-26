import {Title,Container,Image} from '@mantine/core';


export function Page({children,title,hTitle,img}){
    return (
        <>
            <Container >
                <Title order={1}>{hTitle}</Title>
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