import { ConTitle, ConText} from '../../../components/component';
import { Container,Image  } from '@mantine/core';
import Meta from '../../../components/meta';

function ConPage(){
    return(
        <Container>
            <ConTitle order={1} size="h1">《最愛是誰》懷念張國榮</ConTitle>
            <ConText>張國榮是一位著名的香港演員和歌手，出生於1956年9月12日，於2003年4月1日逝世，享年46歲。</ConText>
            <ConText>張國榮早期以歌手身份嶄露頭角，是香港樂壇的經典代表之一。他憑藉歌曲《Monica》走紅，並連續十年獲得金曲獎提名。他還是唯一一位獲得「三大亞洲歌王」的歌手。</ConText>
            <ConText>他主演了眾多經典電影，如《英雄本色》、《東邪西毒》、《重慶森林》和《墮落天使》等等。他還因在電影《阿飛正傳》中的表現獲得過多個國際獎項，包括戛納影展最佳男演員獎和香港電影金像獎。</ConText>
            <ConText>然而，在他人生的晚年，張國榮宣布自己是同性戀者，這在當時的香港社會引起了不小的震動。他在2003年4月1日跳樓自殺身亡，給他的粉絲們帶來了極大的悲痛。他的音樂和電影作品至今仍然受到人們的喜愛和推崇。</ConText>
            <ConTitle order={2} size="h2">《最愛是誰》</ConTitle>
            <ConText>今年是哥哥張國榮逝世20周年，環球唱片推出 《REMEMBRANCE Leslie》，當中有從未曝光的《最愛是誰》，更找來李麗珍</ConText>
        </Container>
    );
}

export default function Page(){
    return(
        <>
            <Meta/>
            <ConPage/>
        </>
    );