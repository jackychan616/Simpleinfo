import '../styles/globals.css';
import Layout from './components/layout';
import { Analytics } from '@vercel/analytics/react';
import { MantineProvider, Global,ColorSchemeProvider,ColorScheme} from '@mantine/core';
import { useState,useEffect } from 'react';
import Loading from './loading';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import Router from 'next/router';
import {topic} from '../data/topics'
import { Recommend } from './components/recommend';
import {Get} from './components/getrecomm'
import { useRouter } from 'next/router';
import { ConTitle} from './components/component';
import { Space } from '@mantine/core';

Router.onRouteChangeStart = () => {
  console.log('onRouteChangeStart Triggered');
  <Loading />;
};

Router.onRouteChangeComplete = () => {
  console.log('onRouteChangeComplete Triggered');
  <Loading />;
};

Router.onRouteChangeError = () => {
  console.log('onRouteChangeError Triggered');
  <Loading />;
};

export default function MyApp({ Component, pageProps, ...appProps}) {
  const { asPath } = useRouter();
  function Basic_lay({children}){
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
        <Layout>
      
        {isLoading?<Loading/>: <Component {...pageProps} /> }
        {children}
          <Analytics/>
        </Layout>
      </MantineProvider>  
      </ColorSchemeProvider>
    )
  };   

    topic.push("/");
    if (topic.includes(appProps.router.pathname))
      return(
        <>
          <Basic_lay/>
        </>
      );
      return (
        <>
          <Basic_lay>
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

