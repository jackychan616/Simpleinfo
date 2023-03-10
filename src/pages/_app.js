import '../styles/globals.css'; 
import Layout  from './components/layout';
import { Analytics } from '@vercel/analytics/react';
import { MantineProvider, Global,ColorSchemeProvider,ColorScheme} from '@mantine/core';
import { useState } from 'react';
import Loading from './loading';
import { Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


export default function MyApp({ Component ,pageProps}) {

  return  (
    <Layout>
      
          <Suspense fallback={<Loading/>}>
            <Component {...pageProps} />  
          </Suspense>
          <Analytics/>
        
      </Layout>
    
    
  );
}
  