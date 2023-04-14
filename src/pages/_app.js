import styles from '../styles/globals.css';
import Layout from './components/layout';
import { Analytics } from '@vercel/analytics/react';
import { MantineProvider, ColorSchemeProvider,Badge,Container} from '@mantine/core';
import { useState,useEffect } from 'react';
import Loading from './loading';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import {topic} from '../data/topics'
import { Recommend } from './components/recommend';
import {Get,Gettag} from './components/getrecomm'
import { useRouter } from 'next/router';
import { ConTitle} from './components/component';
import { Space } from '@mantine/core';
import stlyes from './page.module.css';
import { Sharebutton } from './components/share';
import Head from 'next/head';
import { NotificationsProvider } from '@mantine/notifications';
import { DefaultSeo } from 'next-seo';

export default function MyApp({ Component, pageProps, ...appProps}) {
  const { asPath } = useRouter();
  const tag = Gettag(asPath.replace("/content",''));
  function Basic_lay({children,tag}){
    const [colorScheme, setColorScheme] = useLocalStorage({
      key: 'mantine-color-scheme',
      defaultValue: 'light',
      getInitialValueInEffect: true,
    });
    const toggleColorScheme = (ColorScheme) =>
      setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    useHotkeys([['mod+J', () => toggleColorScheme()]]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => setIsLoading(false), 1e3);
    }, []);
    return(
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
        <Head>
          <meta property="og:locale" content="zh-Hant-HK"/>
          <meta property="og:type" content="article"/>
        </Head>
      <DefaultSeo
          description='香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊'
          openGraph={{
            type: 'website',
            locale: 'zh-Hant-HK',
            url: 'https://simpleinfohk.me/',
            siteName: 'Simple Info HK',
            description: '香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊',
            images:[
              {
                url:'https://simpleinfohk.me/icon.png',
                height:128,
                width:128,
                alt:'Simple Info HK',
                type:'image/png',
              }],
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
        <Layout>
            {tag}
            {isLoading?<Loading/>: <Component {...pageProps} /> }
            {children}
          <Analytics/>
        </Layout>
        </NotificationsProvider>
      </MantineProvider>  
      </ColorSchemeProvider>
    )
  }    
    topic.push(...["/","/content"]);
    if (topic.includes(appProps.router.pathname) || tag == "")
      return(
        <>
          <Basic_lay/>
        </>
      );
      const Tag = () => {
        if (tag == ""){
          return <></>
        }
        return(
          <>
            <div className={stlyes.tag_div}>
              <Badge variant="filled" >{tag}</Badge>
              <Space h = "lg"/>
              <Sharebutton url = {"https://simpleinfohk.me" + appProps.router.pathname}/>
            </div>
            <Space h = "lg"/>
            <Space h = "lg"/>
            <Space h = "lg"/>

          </>
        )
      }
      return (
        <>
          <Basic_lay tag = {<Tag/>}>
              <Container size="30rem">
                <Space h ="lg"/>
                <span><ConTitle>閱讀更多</ConTitle></span>
                <span><Badge variant="filled" >{Gettag(asPath.replace("/content",''))}</Badge></span>
                <Space h = "xl"/>   
                <Recommend data = {Get(asPath.replace("/content",''))}/>
              </Container>
          </Basic_lay>
        </>
        
      )
    }