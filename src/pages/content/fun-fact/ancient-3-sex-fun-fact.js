import { ConTitle, ConText } from '../../components/component';
import { Container, Image } from '@mantine/core';
import Meta from 'src/pages/components/meta';
import { Blockquote } from '@mantine/core';
function Page(){
    return(
        <Container>
            <ConTitle order={1} size="h1">孫中山、張飛是蘿莉控？蘇軾竟是… 我們一起來看看古人的性癖好！</ConTitle>
            <ConTitle order={2} size="h2">孫中山</ConTitle>
            <ConText>我們若說到中國近代史的傳奇人物，那麼孫中山必定榜上有名。孫中山是著名的革命先鋒，為辛亥革命的重要人物之一。可是，這位革命烈士在性方面有着有趣的一面。</ConText>
            <ConText>孫中山有一位伴侶（非正妻），叫大月薰。據說孫中山在流亡日本時認識了友人的女兒，那人即大月薰（當時10歲）。過後孫文愛上了她並向其父大月素堂提親，在一番波折後大月薰在15歲時與孫文結婚。</ConText>
            <Image src="/img/十二歲的大月薰.jpg" alt="十二歲的大月薰" caption="十二歲的大月薰"/>
            <Image src="/img/宋慶齡.jpg" alt="宋慶齡" caption="宋慶齡"/>
            <ConText >另外，孫中山的二妻宋慶齡，比孫中山年輕27歲，即使在宋家的反對之下，孫文亦堅持與之結婚。</ConText>
            <ConTitle order={2} size="h2">張飛</ConTitle>
            <ConText>在三國時代，有位武將，無人不曉；他跟隨劉備征戰四方，又與關羽被世人稱為「萬人敵」之人：張飛。史書《魏略》記載，建安五年，劉備被曹操打敗，張飛有次外出，遇上小「蘿莉」夏侯氏（名不詳），她其實是夏侯淵的侄女，才十三四歲，張飛對其一見鍾情，就娶為妻了</ConText>
            <ConTitle order={2} size="h2">蘇軾</ConTitle>
            <ConTitle order={3} size="h3">江城子</ConTitle>
            <ConText>宋朝的詞人蘇軾，為豪放派代表人物，有次他作下一首婉約詞:</ConText>
            <Blockquote cite="江城子·乙卯正月二十日夜記夢">十年生死兩茫茫，不思量，自難忘。千里孤墳，無處話淒涼。</Blockquote>
            <ConText>描寫妻子去世十年後，對她的思念仍是絲毫未減，詞句動人，成千古傳頌。讓世人認定他忠一愛妻形象。但蘇東坡在元配死後再娶王閨之，此後又把一位12歲小蘿莉王朝雲帶回家。據說蘇軾被分發到杭州任官時，太守陳襄經常舉辨宴會，邀請與當地文人一起寫詩唱和。一次宴會上，他與12歲的青樓歌妓王朝雲相遇（有一說王朝雲本來叫花兒)，之後蘇軾將她帶回家。在她16歲成年後，便正式納入妾室。</ConText>
            <ConTitle order={2} size="h2">最後想說的...</ConTitle>
            <ConText>其實在古代，醫學並不發達，男女壽命都不長，自然要及早嫁人生子。愈早生就可以生愈多，況且嬰孩存活率也很低。所以在讀歷史的時候，不需用著現代的標準攻擊古代的人，用現代的價值觀評量百年之前的古人其實並不實際。</ConText>
        </Container>
    );
}

export default function ConPage(){
    return(
        <Meta img="/img/十二歲的大月薰.jpg" pageTitle={"孫中山、張飛是蘿莉控？蘇軾竟是… 我們一起來看看古人的性癖好！"} description={"孫中山、張飛是蘿莉控？蘇軾竟是… 我們一起來看看古人的性癖好！孫中山的二妻宋慶齡，比孫中山年輕27歲，即使在宋家的反對之下，孫文亦堅持與之結婚,飛對夏侯淵的侄女一見鍾情，就娶為妻了,蘇軾與12歲的青樓歌妓王朝雲相遇,之後將她帶回家。在她16歲成年後，便正式納入妾室。"}
    );
}