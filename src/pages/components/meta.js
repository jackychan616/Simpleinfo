import Head from 'next/head';
import Image from 'next/image';
const siteTitle = "Simple Info HK";
const defaultDescription ="香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊";

export default function Meta({ pageTitle, keywords, description ,subtitle}) {
  return (
    <Head>
        <title>{pageTitle ? pageTitle : siteTitle+(subtitle ?'-'+ subtitle:'')}</title>
        <meta name="description" content={defaultDescription ? defaultDescription: description + defaultDescription } />
        <meta property="og:locale" content="zh-Hant-HK"/>
        <meta property="og:type" content="article"/>
        <meta property="og:title" content={pageTitle || siteTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="simpleinfohk.me"/>
        <meta property='keyword' content={keywords}/>
        <meta property='og:image' content = {"https://simpleinfo.live/img/simple_info.png"}/>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3459129696587268"
        crossOrigin="anonymous"></script>
  
    </Head>    
  )
}