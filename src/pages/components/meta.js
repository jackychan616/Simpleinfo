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

function NextMeta({ pageTitle, keywords, Description ,subtitle,img,alt}){
  const D=Description ? Description : defaultDescription;
  return(
    
    <>
      <NextSeo
      title={pageTitle ? pageTitle : siteTitle+(subtitle ?'-'+subtitle:'')}
      canonical="https://simpleinfohk.me/"
      description={D}
      openGraph={{
        url:"https://simpleinfohk.me/",
        siteName:'Simple Info',
        title:pageTitle||siteTitle,
        description:D,
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