const siteTitle = "Simple Info HK";
const defaultDescription ="香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊";
import { NextSeo } from 'next-seo';
export default function Meta({ pageTitle, keywords, description ,subtitle,img}) {
  return (
    <>
      <NextMeta/>
    </>
  )
}

function NextMeta({ pageTitle, keywords, description ,subtitle,img,alt}){
  return(
    <>
      <NextSeo
      title={pageTitle ? pageTitle : siteTitle+(subtitle ?'-'+subtitle:'')}
      canonical="https://simpleinfohk.me/"
      description= {description ? description : defaultDescription}
      openGraph={{
        url:"https://simpleinfohk.me/",
        Title:pageTitle||siteTitle,
        description:description ? description : defaultDescription,
        images:[
          {
            url:img,
            alt:alt 
          }
        ]

      }}
      />
    </>
  );
}