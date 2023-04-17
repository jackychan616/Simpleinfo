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
          content:'香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊'

        },
        {
          name:'title',
          content:'Simple Info HK'
        },
        {
          property: "og:image",
          content:
            "https://simpleinfohk.me/img/simple_info.png",
        },
        {
          property: "og:image:width",
          content: "400",
        },
        {
          property: "og:image:height",
          content: "300",
        },
        {
          property: "og:title",
          content: "Simple Info Hk",
        },
        {
          property: "og:description",
          content: "香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊",
        },
        {
          property: "og:type",
          content: "website",
        },
      ],
    },
  };
};