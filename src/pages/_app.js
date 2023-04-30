import styles from '../styles/globals.css';
import Layout from './components/layout';
import { Analytics } from '@vercel/analytics/react';
import { MantineProvider, ColorSchemeProvider,Badge,Container,createStyles,Group} from '@mantine/core';
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
import {GoogleAds,Recommend_ads} from './components/googleAds';
import { NotificationsProvider } from '@mantine/notifications';
const useStyles = createStyles((theme) => ({
  tag_on_top :{
    position :"absolute",
    left : "10px",
  }
}))
export default function MyApp({ Component, pageProps, ...appProps}) {
  const { asPath } = useRouter();
  const canonicalUrl = "https://simpleinfohk.me" + asPath;
  if (asPath.includes("/savejson")){
    return<></>
  }
  const tag = Gettag(asPath.replace("/content",''));
  const { openGraphData = [] } = pageProps;
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
        <link rel='icon' href="/icon.png"/>
        {openGraphData.map((og,index) => (
          <meta {...og} key={index}/>
        ))}
        <meta name="charSet" content="utf-8"/>
        <meta property="og:locale" content="zh-Hant-HK"/>
      </Head>
        <Layout>
            <GoogleAds />
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
            <Container>
                <Badge variant="filled" >{tag}</Badge>
                <Space h = "lg"/>
                <Sharebutton url = {"https://simpleinfohk.me" + appProps.router.pathname}/>
            </Container>
            <Space h = "lg"/>
            <Space h = "lg"/>

          </>
        )
      }
      return (
        <>
          <Head>
            <link rel="canonical" href={canonicalUrl} />
          </Head>
          <Basic_lay tag = {<Tag/>}>
            <Group>
              <Container size="30rem">
                <Space h ="lg"/>
                <span><ConTitle>閱讀更多</ConTitle></span>
                <span><Badge variant="filled" >{Gettag(asPath.replace("/content",''))}</Badge></span>
                <Space h = "xl"/>   
                <Recommend data = {Get(asPath.replace("/content",''))}/>
              </Container>
            </Group>
          </Basic_lay>
        </>
        
      )
    }
