import Head from 'next/head';
import Script from 'next/script';
const siteTitle = "Simple Info HK";
const defaultDescription ="香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊";
import { NextSeo } from 'next-seo';
export default function Meta({ pageTitle, keywords, description ,subtitle,img}) {
  return (
    <>
    <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3459129696587268"
          crossOrigin="anonymous"></Script>
      <Head>
          <title >{pageTitle ? pageTitle : siteTitle+(subtitle ?'-'+subtitle:'')}</title>
          <meta property="og:locale" content="zh-Hant-HK"/>
          <meta property="og:type" content="article"/>
          <meta property="og:title" content={pageTitle || siteTitle} />
          <meta property="og:description" content={description}  />
          <meta property="og:site_name" content="simpleinfohk.me"/>
          <meta property='keyword' content={keywords}/>
          <meta property='og:image' content = {img}/>
          
    
      </Head>    
    </>
    
  )
}

function NextMeta({ pageTitle, keywords, description ,subtitle,img,alt}){
  return(
    <>
      <NextSeo
      title={pageTitle ? pageTitle : siteTitle+(subtitle ?'-'+subtitle:'')}
      canonical="https://simpleinfohk.me/"
      openGraph={{
        url:"https://simpleinfohk.me/",
        Title:pageTitle,
        description:description ? description : defaultDescription,
        images:[
          {
            url:img,
            alt:alt 
          }
        ]

      }}
      >

      </NextSeo>
    </>
  );
}