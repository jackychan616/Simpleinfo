import {Container} from '@mantine/core';
import {ConText,ConTitle,Image} from '../../components/component';
import Meta from '../../components/meta';
function Page(){
    return(
        <Container>
            <ConTitle order={1} size="h1">顛覆你對間諜的認知！有趣人物之間謀篇：時佩璞</ConTitle>
            <Image src="https://cc-image-resizer.cwg.tw/resize/uri/https%3A%2F%2Fi.cheers.com.tw%2Farticle%2F202011%2Farticle-5fac9bb7eb70f.jpg/?w=810&h=543&fit=fill" alt="孫子兵法"/>
            <ConText>《孫子兵法》有云：「因間者，因其鄉人而用之。」，指利用敵方人員作間諜，這次的主角使用「因間」的方式過於特殊。他身為男兒男扮女裝與法國駐華大使館職員維持了20年的伴侶關係，為中華人民共和國政府竊取法國政府情報，但是他是如何做到的？</ConText>
            <ConText>在1964年12月的一個聖誕派對上，法國駐華大使館職員布爾西科認識了26歲的時佩璞，當時時佩璞並沒有改女裝，但是眉清目秀，被形容「長得像個女孩子，還會像女孩子一樣害羞。」時佩璞居然對布爾西科說，他是女京劇演員，因為父親想要個兒子，自己被迫裝作男人。二人很快「戀愛」，並發生「性關係」，那麼問題來了？時佩璞要如何讓布爾西科確信自己是女人呢？</ConText>
            <ConText>答案其實是時佩璞以中國習俗為由要求性生活時不能開燈，且時佩璞有天生缺陷的隱藏式陰莖（陰莖被埋沒於包皮及恥骨區皮下脂肪組織內）。</ConText>
            <ConText>之後在1969年至1979年間，布爾西科利用職務之便，為中華人民共和國提供機密文件。布爾西科派駐在中國之外，因此不能經常見到時佩璞。杓他們一次見面的時候，時佩璞領給布爾西科一個叫時度度的4歲孩子，自稱之前自己懷孕並生下了「他們的孩子」。</ConText>
            <ConText>在1983年，布爾西科和時佩璞被捕。在羈押期間，時佩璞給醫生解釋了他如何隱藏生殖器騙過布爾西科，並承認時度度是他從新疆買來的孩子。布爾西科發現真相之後，曾試圖割喉自殺未遂。事情公開之後，布爾西科一度成為時人的笑柄。</ConText>
            <Image src="https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2019/08/29/20190829-054239_U5965_M546946_b3ab.jpg?itok=pwA-zkVU" alt="布爾西科和時佩璞被捕" caption="布爾西科和時佩璞被捕"/>
            <ConText>1987年4月，時佩璞被法國總統弗朗索瓦·密特朗特赦。2009年時佩璞去世。在去世前還表示他依然愛着布爾西科。</ConText>
            <ConTitle order={2} size="h2">《蝴蝶君》</ConTitle>
            <ConText>這個荒誕的間諜故事在1988年，甚至被黃哲倫改編為百老匯戲劇《蝴蝶君》。成為轟動一時的城中熱話。</ConText>
        </Container>
    );
}

export default function ConPage(){
    return(
        <>
            <Meta PageTitle="顛覆你對間諜的認知！有趣人物之間謀篇：時佩璞" img="https://upload.wikimedia.org/wikipedia/zh/7/73/Shi_Pei_Pu.jpeg" description={"顛覆你對間諜的認知！有趣人物之間謀篇：時佩璞《孫子兵法》有云：「因間者，因其鄉人而用之。」，指利用敵方人員作間諜，這次的主角使用「因間」的方式過於特殊。他身為男兒男扮女裝與法國駐華大使館職員維持了20年的伴侶關係，為中華人民共和國政府竊取法國政府情報，但是他是如何做到的？"}/>
            <Page/>
        </>
    );
}
