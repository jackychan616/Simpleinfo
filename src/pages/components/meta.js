const siteTitle = "Simple Info HK";
const defaultDescription ="香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊";
import { NextSeo } from 'next-seo';
import Head from 'next/head';
export default function Meta({ pageTitle, keywords, description ,subtitle,img,alt}){
  return(
    <>
      <Head>
        <meta name="title" content={pageTitle ? pageTitle : siteTitle+(subtitle ?'-'+subtitle:'')}/>
        <meta name="description" content={description ? description : defaultDescription}/>
        <meta name="og:title" content={pageTitle ? pageTitle : siteTitle}/>
        <meta mame="og:image" content={img}/>
        <meta property="og:description" content={description ? description : defaultDescription} />
      </Head>
      
    </>
  );
}

function NextMeta({ pageTitle, keywords, description ,subtitle,img,alt}){
  const D=description ? description : defaultDescription;
  return(
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
  );
}