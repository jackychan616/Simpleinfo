import { Getblogdata } from './getrecomm';
import Head from 'next/head';
const siteTitle = "Simple Info HK";
const defaultDescription ="香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊";
import { NextSeo } from 'next-seo';
import { v4 as uuidv4 } from 'uuid';
export default function Meta({ children,pageTitle, keywords, description ,subtitle,img,alt,path}){
  return(
      <ConMeta/>
    
  );
}
function ConMeta({ children,pageTitle, keywords, description ,subtitle,img,alt,path}){
  <Head>
          <meta name="description" content={description} key={uuidv4()}/>
          <meta property="og:locale" content="zh-Hant-HK" key={uuidv4()}/>
          <meta property="og:type" content="article" key={uuidv4()}/>
          <meta property="og:description" content={description}  key={uuidv4()}/>
          <meta property="og:site_name" content="simpleinfohk.me" key={uuidv4()}/>
          <meta property="keyword" content={keywords} key={uuidv4()}/>
          <meta property="og:image" content = {img} key={uuidv4()}/>  
      </Head>
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