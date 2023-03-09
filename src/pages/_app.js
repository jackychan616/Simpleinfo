import '../styles/globals.css'; 
import Layout  from './components/layout';
import { Analytics } from '@vercel/analytics/react';
import { MantineProvider, Global,ColorScheme} from '@mantine/core';
import { useState } from 'react';
import Loading from './loading';
import { Suspense } from 'react';

function MyGlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        backgroundColor:'darkblue'
      })}
    />
  );
}
export default function MyApp({ Component ,pageProps}) {
  return  (
  <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS> 
    <Layout>
      
          <MyGlobalStyles />
          <Suspense fallback={<Loading/>}>
            <Component {...pageProps} />  
          </Suspense>
          <Analytics/>
        
        
    </Layout>
    </MantineProvider>
  );
}
  