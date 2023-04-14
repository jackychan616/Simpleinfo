import { Getblogdata } from './getrecomm';
import Head from 'next/head';
const siteTitle = "Simple Info HK";
const defaultDescription ="香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊";
import { NextSeo } from 'next-seo';
import { v4 as uuidv4 } from 'uuid';

export function Meta(pageTitle, keywords, description ,subtitle,img,alt,path){
  return <></>
  /*     <NextSeo
      title={pageTitle ? pageTitle :siteTitle}
      description={description ? description : defaultDescription}
      canonical="https://simpleinfohk.me/"
      openGraph={{
        title:pageTitle?pageTitle:siteTitle,
        description:description?description:defaultDescription,
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
    */
}
export default function Page(){
  return(<></>);
}