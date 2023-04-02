
import Head from 'next/head';
const siteTitle = "Simple Info HK";
const defaultDescription ="香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊";
import { NextSeo } from 'next-seo';
export default function Meta({ children,pageTitle, keywords, description ,subtitle,img,alt}){
  return(
    <>
    <Head>
          <title >{pageTitle ? pageTitle : siteTitle+(subtitle ?'-'+subtitle:'')}</title>
          <meta name="description" content={description?description:defaultDescription} key="description"/>
          <meta property="og:locale" content="zh-Hant-HK" key="og:locale"/>
          <meta property="og:type" content="article" key="og:type"/>
          <meta property="og:title" content={pageTitle || siteTitle}  key="title"/>
          <meta property="og:description" content={description} key="og:description"/>
          <meta property="og:site_name" content="simpleinfohk.me" key="og:site_name"/>
          <meta property="keyword" content={keywords} key="keyword"/>
          <meta property="og:image" content = {img} key="og:image"/>
      </Head>    
    </>
      

  );
}
function NextMeta({ pageTitle, keywords, description ,subtitle,img,alt}){
  return(
    <>
      <NextSeo
      title={pageTitle ? pageTitle : siteTitle+(subtitle ?'-'+subtitle:'')}
      description={description?description:defaultDescription}
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
      />
    </>
  );
}