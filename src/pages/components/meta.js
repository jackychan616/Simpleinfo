import Head from 'next/head';
import Image from 'next/image';
const siteTitle = "Simple Info HK";

export default function Meta({ pageTitle, keywords, description ,subtitle}) {
  return (
    <Head>
        <title>{pageTitle ? pageTitle : siteTitle+subtitle}</title>
        <meta name="description" content={description} />
        <meta property="og:locale" content="zh-Hant-HK"/>
        <meta property="og:type" content="article"/>
        <meta property="og:title" content={pageTitle || siteTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="brandonzhang.cn"/>
        <meta property='keyword' content={keywords}/>
        <meta property='og:image' content = {"/img/simple_info.png"}/>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3459129696587268"
        crossOrigin="anonymous"></script>
  
    </Head>    
  )
}