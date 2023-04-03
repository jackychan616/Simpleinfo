import { Getblogdata } from './getrecomm';
import Head from 'next/head';
const siteTitle = "Simple Info HK";
const defaultDescription ="香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊";
import { NextSeo } from 'next-seo';
import { v4 as uuidv4 } from 'uuid';
export function Meta({ children,pageTitle, keywords, description ,subtitle,img,alt,path}){
  return(
    <div>
      <Head>
          <title >{pageTitle ? pageTitle : siteTitle+(subtitle ?'-'+subtitle:'')}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:locale" content="zh-Hant-HK"/>
          <meta property="og:type" content="article"/>
          <meta property="og:title" content={pageTitle || siteTitle} />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content="simpleinfohk.me"/>
          <meta property='keyword' content={keywords}/>
          <meta property='og:image' content = {"https://simpleinfo.live" + img}/>
      </Head>
    </div>
  );
}

function NextMeta({ pageTitle, keywords, description ,subtitle,img,alt}){
  return(
    <div>

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
            url:'https://simpleinfohk.me'+img,
            alt:alt 
          }
        ]

      }}
      />
    </div>
  );
}

export default function Page(){
  return(<></>);
}