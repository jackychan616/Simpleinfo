import Meta from '../../components/meta';
import { Container, Space, Image } from '@mantine/core';
import { ConTitle, ConText } from '../../components/component';

function Page(){
    return(
        <Container>
            <ConTitle order = {1}>
            30秒學會成為csgo高手的必要技巧！
            </ConTitle>
            <ConText>
            當你需要快速中止移動，使角色馬上停下，使用CSGO急停技巧，教學如下：
            </ConText>
        </Container>
    )
}



export default function page(){
    return(
        <>
            <Page/>
        </>
    )
}