import {ConTitle,ConText} from '../../components/component';
import {Container,Image} from '@mantine/core';
import { Sharebutton } from 'src/pages/components/share';
import Meta from 'src/pages/components/meta';
import { AppsOutage } from '@mui/icons-material';

function ConPage(){
    return (
        <Container>
            <ConTitle order = {1}>
            謝霆鋒和王菲的合作
            </ConTitle>
            <Image src={"/img/Faye_Wong_04.jpg"} width = "600px" height = "300px"alt = "王菲"></Image>
            <ConText>
            謝霆鋒和王菲合作過多首歌曲，其中最著名的是&quot;因為愛情&quot;、&quot;傳奇&quot;和&quot;曖昧&quot;。這些歌曲都非常成功，成為了中國音樂歷史上的經典作品。
            </ConText>
            <ConText>
            &quot;因為愛情&quot;是謝霆鋒和王菲於2003年推出的一首情歌，歌詞充滿感情，旋律流暢，深受聽眾喜愛。這首歌一經推出，就風靡全國，成為了當時的流行歌曲之一。
            </ConText>
            <Image src={"/img/因為愛情.jpg"} caption = "因為愛情" alt = "因為愛情" width = "400px" height = "400px"></Image>
            <ConText>
            &quot;傳奇&quot;是王菲於1994年發行的一首歌曲，在歌曲中展現出她獨特的嗓音和表演風格。後來，謝霆鋒也為這首歌曲翻唱，獲得了很高的評價。
            </ConText>
            <ConText>
            &quot;曖昧&quot;則是謝霆鋒和王菲於2007年合作的一首歌曲，歌詞描繪了兩個人之間的情感糾葛，充滿了憂傷和感慨。這首歌曲也被廣大聽眾所喜愛，成為了一首流行的情歌。
            </ConText>
            <ConText>
            除了這三首經典的合作歌曲，謝霆鋒和王菲還有其他的合作作品，比如《光之翅》、《浮躁》等等。其中，《光之翅》是在謝霆鋒與王菲分別參演的電影《光陰的故事》和《天浴》中的插曲，歌曲優美動人，充滿了對生命的經歷和感悟；《浮躁》則是在謝霆鋒的專輯《Change》中合作的歌曲，充滿了搖滾和電子樂的元素，展現了兩位藝人不同的音樂風格和表現力。
            </ConText>
            <Image src="/img/光之翅.jpg" caption = "光之翅" width = "300px" height ="300px" alt = "光之翅 王菲"></Image>
            <ConText>
            謝霆鋒和王菲的音樂合作不僅展示了中國流行音樂的多元化和藝術實力，也令人感受到他們之間的獨特化學反應。雖然隨著時間的推移，兩人已經沒有合作過新的音樂作品，但他們曾經共同創造的音樂珍藏伴隨著聽眾回味不已，成為了中國流行音樂的經典之作。
            </ConText>
            <ConText>
            他們合作的大多是情歌這點非常引人遐想，因為愛情和曖昧，這兩首個或許是在暗示他們不一般的關係，再加上今天被爆出王菲與謝霆鋒在機場公開拖手，或許這代表了一段美妙戀情的開端。
            </ConText>
            <Image src= "/img/謝霆鋒和王菲.jpg" width = "300px" height="350px" alt ="謝霆鋒和王菲"></Image>
        </Container>
    )
}
export default function Page(){
    return (
        <>
            <Meta pageTitle={"謝霆鋒和王菲的合作"} description={"謝霆鋒和王菲合作過多首歌曲，其中最著名的是<<因為愛情>>、<<傳奇>>和<<曖昧>>。這些歌曲都非常成功，成為了中國音樂歷史上的經典作品。"} keywords={"因為愛情,謝霆鋒和王菲,謝霆鋒,王菲,傳奇,曖昧"} img = {"/img/Faye_Wong_04.jpg"} alt ="王菲" />
            <Container>
                <ConPage/>
            </Container>
        </>
    )
}
