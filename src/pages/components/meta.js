const siteTitle = "Simple Info HK";
const defaultDescription ="香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊";
import { NextSeo } from 'next-seo';
import Head from 'next/head';
export default function Meta({ pageTitle, keywords, description ,subtitle,img,alt}){
  return(
    <>
      <Head>
          <title >{pageTitle ? pageTitle : siteTitle+(subtitle ?'-'+subtitle:'')}</title>
          <meta name="description" content={description?description:defaultDescription}/>
          <meta name="image" content={img}/>
          <meta property="og:locale" content="zh-Hant-HK"/>
          <meta property="og:type" content="article"/>
          <meta property="og:title" content={pageTitle || siteTitle} />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content="simpleinfohk.me"/>
          <meta property='keyword' content={keywords}/>
          <meta property='og:image' content = {img}/>
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