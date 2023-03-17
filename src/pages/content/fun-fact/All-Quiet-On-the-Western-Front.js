import { ConTitle, ConText } from '../../components/component';
import { Container, Image, Space } from '@mantine/core';
import Meta from 'src/pages/components/meta';

function Conpage() {
  return (
    <Container>
      <ConTitle>
        <strong>西線無戰事</strong>
      </ConTitle>
      <Image
        src="/img/西線無戰事.jpeg"
        height="650px"
        width="650px"
        alt="西線無戰事"
      ></Image>
      <ConText>
        《西線無戰事》是一部德國反戰電影，改編自埃里希·瑪利亞·雷馬克的同名小說。該片由路易斯·邁爾斯執導，於
        1979
        年上映，獲得了眾多的好評與獎項，被譽為是史上最偉大的反戰電影之一。更奪得2023奧斯卡最佳國際電影、攝影、布景設計及配樂合共4個獎項
        , 擊敗多個對手
      </ConText>
      <ConText>
        該片講述了第一次世界大戰期間德國軍隊一名年輕士兵保羅·包美爾的故事，他和他的戰友們經歷了戰爭的種種痛苦和荒唐。從一位懵懂無知的少年到最後成為了一個充滿疲憊和傷痛的戰士，保羅的成長過程是該片的一大亮點。保羅在戰爭中看到了生命的脆弱和無常，他也體驗到了戰爭對於普通士兵的摧殘和心理上的傷害。
      </ConText>
      <Image
        src="/img/西線無戰事_02.jpg"
        caption="保羅"
        height="500px"
        width="500px"
        alt="保羅·包美爾"
      ></Image>
      <Space h="xl" />
      <ConTitle>電影的有趣之處</ConTitle>
      <ConText>
        影片通過保羅的視角，展現了戰爭中人性的扭曲和荒唐。戰爭讓士兵們不得不放棄自己的思想和人性，他們只能成為戰爭機器的一部分。影片將人性的可貴和珍貴體現在戰爭的殘酷中，將士兵的死亡描繪得非常真實和生動，觀眾可以感受到戰爭對於士兵的摧殘和心理上的傷害。
      </ConText>
      <Space h="lg" />
      <ConText>
        此外，影片也融入了人道主義的思想，反映了戰爭中的人性和善良。影片前半段利用一系列的幽默和輕鬆的場面來展現士兵們之間的感情和友誼，強調了人性的可貴和珍貴。電影中的角色塑造也非常出色，表現出每個人物的性格和特點。
      </ConText>
      <Image
        src="/img/西線無戰事_03.webp"
        height="300px"
        width="120px"
        caption="保羅和朋友偷鵝"
        alt="西線無戰事"
      />
      <ConText>
        除此之外，該片在技術製作方面也很出色。攝影師所拍攝的場景呈現出真實的感覺，並且音效將戰爭場景的氣氛展現得淋漓盡致。電影的配樂也非常精彩，強調了戰爭的緊張和悲傷。
      </ConText>
      <Space h="lg" />
      <Image
        src="/img/西線無戰事_04.jpg"
        height="300px"
        width="110px"
        caption="戰場上的軍官"
        alt="西線無戰事"
      />
      <ConText>
        總體而言，《西線無戰事》是一部非常優秀的反戰電影，以其幽默、真實和殘酷的方式呈現出戰爭的大恐懼。觀眾可以從中體會到戰爭的荒唐和人性的扭曲。影片在思想深度和制作技術上都可圈可點，不仅仅是一部反戰電影，更是一部關於人性的作品。
      </ConText>
      <Space h="lg" />
    </Container>
  );
}

export default function page() {
  return (
    <>
        <Meta
          pageTitle="西線無戰事 - 為何奪得奧斯卡最佳國際影片獎"
          description="《西線無戰事》是一部德國反戰電影，改編自埃里希·瑪利亞·雷馬克的同名小說。該片由路易斯·邁爾斯執導，於 1979 年上映，獲得了眾多的好評與獎項，被譽為是史上最偉大的反戰電影之一。更奪得2023奧斯卡最佳國際電影、攝影、布景設計及配樂合共4個獎項 , 擊敗多個對手"
          keywords="西線無戰事2023奧斯卡最佳國際電影、攝影、布景設計及配樂合共4個獎項,西線無戰事,德國反戰電影,2023奧斯卡,最佳國際電影,第一次世界大戰"
          img="/img/西線無戰事_01.jpeg"
        />
      <Conpage />
    </>
  );
}
