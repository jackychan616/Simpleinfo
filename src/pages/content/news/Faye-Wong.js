import { ConTitle, ConText } from '../../components/component';
import { Container } from '@mantine/core';
import Image from 'next/image';
import Meta from 'src/pages/components/meta';

function Body() {
  return (
    <Container>
      <ConTitle order={1}>不在藏了? 王菲和謝霆鋒</ConTitle>
      <Image
        src="/img/Faye_Wong_03.jpg"
        width="650"
        height="420"
        alt="王菲"
      ></Image>
      <ConText>
        王菲對中國樂壇有無與倫比的貢獻，她至今發出過大大小小20多張華語專輯，唱過的華語歌曲更是數以百計。她曾在中國內地，臺灣，香港等地區開過演唱會，她現時已經擁有過百萬的粉絲數量。
      </ConText>
      <ConText>
        作為知名歌手演員，王菲曾包攬大中華地區兩岸三地包括叱咤樂壇流行榜頒獎典禮、十大中文金曲頒獎音樂會、勁歌金曲頒獎典禮、新城勁爆頒獎禮、四台聯頒音樂大獎、台灣金曲獎、全球華語榜中榜、音樂風雲榜、新加坡金曲獎、全球華語歌曲排行榜、CASH金帆音樂獎、華語音樂傳媒大獎、CCTV-MTV音樂盛典等各地區權威頒獎典禮「最佳女歌手」獎項，也獲得過如健力士世界紀錄銷量最高粵語女歌手、健力士世界紀錄銷量最高的遊戲主題曲、福布斯中國名人榜最吸金女藝人、二十世紀十大文化偶像、中國慈善名人榜榜首、
        新中國六十年最有影響力文化人物第二名等榮譽。她也曾獲瑞典斯德哥爾摩電影節銅馬獎和香港電影評論學會影后，並多次被提名香港電影金像獎、台灣電影金馬獎影后。
      </ConText>
      <Image
        src="/img/1200px-Faye_Wong_03.jpg"
        width="600"
        height="1000"
        alt="王菲"
      ></Image>
      <ConText>
        可惜，作為女人的王菲并未能收穫美滿的感情生活。她曾與三人戀愛，並與兩人結婚，而二次的婚姻都因男方有出軌，性格不合等情況而分手，而這一次，她與謝霆鋒再談戀愛，卻亦是分分合合，合合分分。而這一次，根據最新消息，她與謝霆鋒在機場放閃的樣子，而不禁令人祈禱這次她能收穫美滿的愛情。
      </ConText>
      <Image
        src="/img/faye_Wong_with_a_man.jpg"
        width="720"
        height="450"
        alt="王菲和謝霆鋒一起"
      ></Image>
    </Container>
  );
}

export default function Page() {
  return (
    <>
      <Meta
        pageTitle={'不在藏了? 王菲和謝霆鋒'}
        description={
          '謝霆鋒和王菲合作過多首歌曲，其中最著名的是<<因為愛情>>、<<傳奇>>和<<曖昧>>。這些歌曲都非常成功，成為了中國音樂歷史上的經典作品。'
        }
        img={'https://simpleinfo.live/img/Faye_Wong_03.jpg'}
        keywords={'王菲,謝霆鋒,謝霆鋒王菲,流行音樂,王菲離婚'}
        alt={'王菲'}
      />
      <Container>
        <Body />
      </Container>
    </>
  );
}
