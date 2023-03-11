import { Container ,Timeline,Text,Image,Space} from "@mantine/core";
import {ConTitle,ConText} from '../../components/component';
import Meta from '../../components/meta';
 function CPage(){
    return(
        <Container>
            <Image src="/img/football-big-news/1.webp"  width ={500}alt=" 曼聯"/>
            <ConTitle order={1}>球隊大事記 曼聯</ConTitle>
            <conText>曼徹斯特聯足球俱樂部，簡稱曼聯，目前在英格蘭超級聯賽比賽。在22-23賽季，曼聯在創造了曼聯歷史最大失利被利物浦7比0大比數戰勝，這個歴史悠久的球會是如何在英超中掘起？又如何在近年沒落？讓我們一起回顧這段曼聯的歷史。</conText>
            <ConTitle order={2}>第一階段：畢士比皇朝（1945年至1969年）</ConTitle>
            <Image src="/img/football-big-news/2.webp" width={300} alt="畢士比上任為主帥"/>
            <ConText>曼聯在畢士比上任為主帥前，有接近60年的低谷期，在當時，曼聯並非一支強大的球球。60年間只獲得一次英格蘭頂級聯賽冠軍和英格蘭足總盃。</ConText>
            <ConText>然而在1958年2月6日發   生的慕尼黑空難使八名球員死於空難，球隊從此跌入低谷，該季結束後曼聯僅僅名列聯賽第九。</ConText>
            <Image src="/img/football-big-news/3.jpg" alt="1958年2月6日發生的慕尼黑空難使八名球員死於空難"/>
            <ConText>可是，曼聯的故事並未結束。畢士比不久後便開始重建球隊，簽下「大帝」丹尼士·羅{"（Denis Law)"} 、 </ConText>    
            <Image src="/img/football-big-news/3.5.webp"  alt="大帝」丹尼士·羅"/>
            <ConText>佐治·貝斯(George Best) 等名將。 </ConText>
            <Image src="/img/football-big-news/4.webp" width={250} alt=""/>
            <ConText>球隊在67至68年球季歐聯決賽中大勝賓菲加，奪得曼聯史上第一座歐聯獎盃。</ConText>
            <Image src="/img/football-big-news/5.5.jpg" width={500} alt="曼聯史上第一座歐聯獎盃"/>
            <ConTitle order={2}>第二階段：費格遜皇朝（1986年至2013年）</ConTitle>
            <Image src="/img/football-big-news/5.webp" width={300} caption="畢士比" alt=""/>
            <Space h="lg"/>
            <ConText>在畢士比退下主帥一職後，球隊再次陷入一段低谷期。十多年內連續更換過5位領隊，但是都沒有獲得聯賽冠軍。</ConText>
            <ConText> 1986年11月曼聯傳奇教頭費格遜上任。1987年費格遜拜訪並簽下賴恩·傑斯。在1992/93年球季曼聯結束了獎杯乾早期，奪得英超冠軍。在1991賽季中簽下了許多名將，例如：丹麥門將彼得·舒米高、「大帝」艾力·簡東拿等。 </ConText>
            <Timeline active={20} lineWidth={3} bulletSize={16}>
                <Timeline.Item>
                    <Text color="dimmed" size="sm">1992年簽下碧咸，並在翌年簽下中場史高斯。</Text>
                </Timeline.Item>
                <Timeline.Item>
                    <Text color="dimmed" size="sm">1993年簽下愛爾蘭中場萊·堅尼。</Text>
                </Timeline.Item>
                <Timeline.Item>
                    <Text color="dimmed" size="sm"> 1998/99年球季英超聯賽中以1分優勢拿下英超冠軍，同季又奪得足總盃冠軍，最後更捧得了歐洲聯賽冠軍盃獎盃，「三冠王」的偉業得以達成。</Text>
                </Timeline.Item>
                <Timeline.Item>
                    <Text color="dimmed" size="sm">在2002/03年球季，依靠着「禁區之王」雲尼斯達萊的表現，曼聯重奪英超錦標。這個球季結束後曼聯引進了當年掘起的C朗作為接任。同年又簽下朗尼，曼聯球隊陣容開始重建。</Text>
                </Timeline.Item>
                <Timeline.Item>
                    <Text color="dimmed" size="sm">2005年球季簽下身高1.98米的門將雲達沙</Text>
                </Timeline.Item>
                <Timeline.Item>
                    <Text color="dimmed" size="sm">在2006/07年球季，C朗、朗尼等球員的努力之下曼聯重奪英超冠軍，在歐聯上也殺入四強。</Text>
                </Timeline.Item>
                <Timeline.Item>
                    <Text color="dimmed" size="sm">在2007/08年球季，曼聯在英超聯賽以奪得歷史上第三座歐洲冠軍獎盃</Text>
                </Timeline.Item>
                <Timeline.Item>
                    <Text color="dimmed" size="sm">在2008/09年球季，曼聯奪得世界冠軍球會盃、英格蘭聯賽盃和英格蘭超級聯賽冠軍，再次成就英超三連冠。</Text>
                </Timeline.Item>
                <Timeline.Item>
                    <Text color="dimmed" size="sm">2009年，C朗以轉會皇家馬德里。為了填補損失，曼聯引進了路爾斯·華倫西亞和米高·奧雲。曼聯在歐洲聯賽冠軍盃，於八強賽敗在拜仁腳下出局，無緣冠軍。曼聯出局令英超球隊7年來首次未能在歐聯4強取得任何席位。聯賽也未能衛冕成功。慶幸的是聯賽盃決賽擊敗阿士東維拉成功衛冕。</Text>
                </Timeline.Item>
                <Timeline.Item>
                    <Text color="dimmed" size="sm">2010年曼聯提前一輪奪得英格蘭超級聯賽冠軍。</Text>
                </Timeline.Item>
                <Timeline.Item>
                    <Text color="dimmed" size="sm">2011-12轉會期之初便迎來了西班牙門將大衛·迪基亞，2011年曼聯最終不敵曼城，未能衛冕英超冠軍。</Text>
                </Timeline.Item>
                <Timeline.Item>
                    <Text color="dimmed" size="sm">2012年，曼聯成功邀請宿敵阿仙奴的前鋒羅賓雲佩斯加盟。在2013年提前奪得第13座英超冠軍。年中5月8日，領隊費格遜宣佈於本季球賽結束後退休，結束在曼聯26年間的執教生涯，費格遜時代結束。</Text>
                </Timeline.Item>
            </Timeline>
            <ConTitle order={2}>第三陛段：衰敗期</ConTitle>
            <conText>2013年，莫耶斯上任。他帶領的曼聯成績不如人意，聯賽排名一直在前五名之外，更在足總盃第三圈出局。又宣佈無緣下屆歐聯，同時終止球隊連續十八年參加歐聯的紀錄。最後曼聯在這球季只取得聯賽第七名，並失去下季歐霸盃的參賽資格。4月22日，曼聯宣佈解僱莫耶斯，結束其不足10個月的任期，並由傑斯兼任暫代領隊。這個賽季季也是曼聯英超以來最黑暗的賽季。</conText>
            <Image src="/img/football-big-news/7.jpg" width={600} alt="成績不如人意曼聯"/>
            <ConText>2013年，莫耶斯上任。他帶領的曼聯成績不如人意，聯賽排名一直在前五名之外，更在足總盃第三圈出局。又宣佈無緣下屆歐聯，同時終止球隊連續十八年參加歐聯的紀錄。最後曼聯在這球季只取得聯賽第七名，並失去下季歐霸盃的參賽資格。4月22日，曼聯宣佈解僱莫耶斯，結束其不足10個月的任期，並由傑斯兼任暫代領隊。這個賽季季也是曼聯英超以來最黑暗的賽季。</ConText>
            <ConText>由此年至今，球隊經歷過雲高爾、摩連奴、蘇斯克查、蘭歷克和坦夏格時代，九年間僅獲一足總盃、歐霸冠軍、兩英超亞軍和季軍，這九年間曼聯表現欠佳，容我不逐一細說，在2023年更破球隊歷史上自1931年來的最大敗績，更見球隊的凋零。作為球迷，只能希望曼聯能夠重新改革，重奪昔日的光輝。 </ConText>

            <Image src="/img/football-big-news/8.jpg" caption="1998勝利"width={600} alt="1998"/>
            <Image src="/img/football-big-news/9.avif" caption ="2003 勝利"width={650} alt="2003"/>
            <Image src="/img/football-big-news/10.jpg"  caption="舒米高" width={350} alt="舒米高"/>
            <Image src="/img/football-big-news/11.jpg" caption="朗尼" width={800} alt="朗尼"/>
            <Image src="/img/football-big-news/12.jpg" caption="迪基亞" width={600 } alt="迪基亞"/>
            <Image src="/img/football-big-news/13.jpg"caption="雲佩斯" width={800} alt="雲佩斯"/>
        </Container>
    );
}

export default function ConPage(){
    return(
        <>
            <Meta pageTitle={"球隊大事記—曼聯"} img="/img/football-big-news/1.webp" description={"曼徹斯特聯足球俱樂部，簡稱曼聯，目前在英格蘭超級聯賽比賽。在22-23賽季，曼聯在創造了曼聯歷史最大失利被利物浦7比0大比數戰勝，這個歴史悠久的球會是如何在英超中掘起？又如何在近年沒落？讓我們一起回顧這段曼聯的歷史。"}/>
           <Container>
            <CPage/>
           </Container>
           
        </>
    );
}