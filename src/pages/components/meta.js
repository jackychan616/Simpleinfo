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
          <meta name="description" content={description?description:defaultDescription}/>
          <title>{pageTitle ? pageTitle : siteTitle+(subtitle ?'-'+subtitle:'')}</title>
          <meta property="og:title" content={pageTitle || siteTitle} key = {description + img} />
          <meta property="og:description" content={description} key = {description} />
          <meta property="og:site_name" content="simpleinfohk.me" key = {pageTitle}/>
          <meta property='keyword' content={keywords ? keywords: pageTitle + description} key = {pageTitle + description}/>
          <meta property='og:image' content = {"https://simpleinfo.live" + img} key = {img}/>
      </Head>
    </div>
  );
}
export default function Page(){
  return(<></>);
}