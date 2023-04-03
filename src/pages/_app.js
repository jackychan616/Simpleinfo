import styles from '../styles/globals.css';
import Layout from './components/layout';
import { Analytics } from '@vercel/analytics/react';
import { MantineProvider, ColorSchemeProvider,Badge} from '@mantine/core';
import { useState,useEffect } from 'react';
import Loading from './loading';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import Router from 'next/router';
import {topic} from '../data/topics'
import { Recommend } from './components/recommend';
import {Get,Gettag} from './components/getrecomm'
import { useRouter } from 'next/router';
import { ConTitle} from './components/component';
import { Space } from '@mantine/core';
import stlyes from './page.module.css';
import { Sharebutton } from './components/share';
import Meta from './components/meta';
import Head from 'next/head';


export default function MyApp({ Component, pageProps, ...appProps}) {
  const { asPath } = useRouter();
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
        <div><Head><title>test</title></Head> </div>
        <Layout>
            {tag}
            {isLoading?<Loading/>: <Component {...pageProps} /> }
            {children}
          <Analytics/>
        </Layout>
      </MantineProvider>  
      </ColorSchemeProvider>
    )
  }    
    topic.push(...["/","/content"]);
    if (topic.includes(appProps.router.pathname))
      return(
        <>
          <Basic_lay/>
        </>
      );
      const Tag = () => {
        return(
          <>
            <div className={stlyes.tag_div}>
              <Badge variant="filled" >{Gettag(asPath.replace("/content",''))}</Badge>
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
            <>
              <Space h ="lg"/>
              <ConTitle>閱讀更多</ConTitle>
              <Space h = "xl"/>
              <Recommend data = {Get(asPath.replace("/content",''))}/>
            </>
          </Basic_lay>
        </>
        
      )
    }
