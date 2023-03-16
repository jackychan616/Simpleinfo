import '../styles/globals.css';
import Layout from './components/layout';
import { Analytics } from '@vercel/analytics/react';
import { MantineProvider, Global,ColorSchemeProvider,ColorScheme} from '@mantine/core';
import { useState,useEffect } from 'react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import Loading from './loading';
import { Suspense ,lazy} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import Router from 'next/router';

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

export default function MyApp({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (ColorScheme) =>
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  return  (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
    <Layout>
      
          <Suspense fallback={<Loading/>}>
           <Component {...pageProps} /> 
          </Suspense>
          <Analytics/>
        
      </Layout>
    </MantineProvider>  
    </ColorSchemeProvider>
    
    
  );
}
