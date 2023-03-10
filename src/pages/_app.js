import '../styles/globals.css'; 
import Layout  from './components/layout';
import { Analytics } from '@vercel/analytics/react';
import { MantineProvider, Global,ColorSchemeProvider,ColorScheme} from '@mantine/core';
import { useState } from 'react';
import Loading from './loading';
import { Suspense ,lazy} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

export default function MyApp({ Component ,pageProps}) {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = ( ColorScheme) =>
    setColorScheme((colorScheme === 'dark' ? 'light' : 'dark'));

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
  