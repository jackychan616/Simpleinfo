import {Meta} from '../../components/meta';
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
            <ConText>
            如果你正在前進:
            </ConText>
            <li>
            松開前進按鍵W鍵。
            </li>
            <li>
            同時按下後退S鍵。
            </li>
            <ConText>
            如果你正在左右走：
            </ConText>
            <li>
            鬆開正在按的按鍵
            </li>
            <li>
            立即點擊相反方向的按鍵
            </li>
            <ConText>
            以下是一個例子：
            </ConText>
            <ConText>
            你正在按A往左走，當你碰見敵人的時候鬆開A並立即按D之後立即瞄準敵人。
            </ConText>
            <Image src="/img/csgo_2.jpg" maw = {500} height={400} width ={400}/>
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