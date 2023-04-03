import { Getblogdata } from './getrecomm';
import Head from 'next/head';
const siteTitle = "Simple Info HK";
const defaultDescription ="香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊";
import { NextSeo } from 'next-seo';
import { v4 as uuidv4 } from 'uuid';
export function Meta({ children,pageTitle, keywords, description ,subtitle,img,alt,path}){
  return(
      <NextMeta pageTitle={pageTitle} description={description} img={img} alt={alt}/>
    
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
            url:'https://simpleinfohk.me'+img,
            alt:alt 
          }
        ]

      }}
      />
    </>
  );
}

export default function Page(){
  return(<></>);
}