import App from './main-page';

export default function Home() {
  return <App />;
}

export const getStaticProps = async () => {
  return {
    props: {
      openGraphData: [
        {
          name:'description',
          content:'根據《華爾街日報》前日 (14)的一份新報告，埃隆-馬斯克在內華達州成立了一家新的人工智能公司，名為X.AI公司。馬斯克被列為該公司的董事，被廣泛認為是馬斯克幕後得力助手的賈里德-伯查爾被列為該公司的秘書。'

        },
        {
          name:'title',
          content:'Elon Musk 創立了 X.AI 公司對抗OpenAI'
        },
        {
          property: "og:image",
          content:
            "https://simpleinfohk.me/img/xai-quick-talk/elon-musk.jpg",
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
          content: "Elon Musk 創立了 X.AI 公司對抗OpenAI",
        },
        {
          property: "og:description",
          content: "根據《華爾街日報》前日 (14)的一份新報告，埃隆-馬斯克在內華達州成立了一家新的人工智能公司，名為X.AI公司。馬斯克被列為該公司的董事，被廣泛認為是馬斯克幕後得力助手的賈里德-伯查爾被列為該公司的秘書。",
        },
        {
          property: "og:type",
          content: "website",
        },
      ],
    },
  };
};