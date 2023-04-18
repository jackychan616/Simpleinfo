import { Container, Image } from '@mantine/core';
import { ConText, ConTitle } from '../../components/component';
import {Meta} from '../../components/meta';

function Page() {
  return (
    <Container>
      <ConTitle order={1}>海布里之王-亨利大帝</ConTitle>
      <ConText>
        亨利作為阿仙奴的標誌性人物於早年間便充滿天賦被摩洛哥青年軍收入旗下，
        因其飛快的速度及強大的一對一突破能力和較差的身體對抗，他最初被視為翼鋒的不二人選，他亦在此時與恩師雲加相遇。
        在雲加離開後亨利亦被售至祖雲達斯，但當時意甲的強盛和嚴密的防守令其一直無法適應。
        在一次飛機上遇上恩師雲加，亨利選擇向雲加表達想要離開意甲。
      </ConText>
      <Image
        maw={400}
        alt="亨利"
        src="https://tmssl.akamaized.net/images/foto/galerie/thierry-henry-arsenal-jubel-2012-1592828479-41984.jpg?lm=1592828454"
      />
      <ConText>
        隨即阿仙奴便買下亨利，亨利亦很快表現出強大的實力以26球聯賽入球結束賽季，
        值得一提的是亨利於阿仙奴開始轉型至前鋒位，雲加要求亨利有便強的身體對抗及組織力。
      </ConText>
      <ConText>
        隨著亨利加盟，英超的曼聯與阿仙奴爭霸的時代亦展開序幕，在03-04賽季阿仙奴以不敗之身奪冠，
        達成前無古人的成就。05-06賽季阿仙奴專注於歐冠，殺入決賽可惜最終被巴塞隆拿擊敗。
        巴塞亦因此希望收購亨利，亨利仍決定留在阿仙奴。06-07賽季亨利受到巨大傷患，
        他意識到自己的職業生涯並不長久。
      </ConText>

      <ConText>
        07-08賽秀亨利離開阿仙奴，他亦留下諾言自己一定會回來。在西班牙他再次成為翼鋒亦𣎴再是主角，
        他成為了幫助美斯成長的其中一員。隨着亨利奪得各大獎杯，
        他亦再次離開前往美職的紅午足球隊。11-12賽季他曾借回阿仙奴三個月，
        完成曾經的諾言並幫助阿仙奴奪得足總杯。回歸紅牛不久在14年他就宣佈退休。
      </ConText>
    </Container>
  );
}

export default function ConPage() {
  return(
    <Container>
      <Page/>
    </Container>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      openGraphData: [
        {
          name:'description',
          content:'海布里之王-亨利(Thierry Henry)，亨利作為阿仙奴的標誌性人物於早年間便充滿天賦被摩洛哥青年軍收入旗下...'

        },
        {
          name:'keywords',
          content:'世界足壇法國最佳巨星,法國,海布里之王,亨利大帝,亨利,大帝,傳奇巨星,巴塞隆拿,足球,球星'
        },
        {
          name:'title',
          content:'海布里之王-亨利'
        },
        {
          property: "og:image",
          content:
            "https://simpleinfohk.me//img/football-big-news/1.webp",
        },
        {
          property: "og:image:width",
          content: "300",
        },
        {
          property: "og:image:height",
          content: "200",
        },
        {
          property: "og:title",
          content: "海布里之王-亨利",
        },
        {
          property: "og:description",
          content: "海布里之王-亨利(Thierry Henry)，亨利作為阿仙奴的標誌性人物於早年間便充滿天賦被摩洛哥青年軍收入旗下...",
        },
        {
          property: "og:type",
          content: "website",
        },
      ],
    },
  };
};