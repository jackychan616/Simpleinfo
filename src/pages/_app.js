import '../styles/globals.css'; 
import Layout  from './components/layout';
import { Analytics } from '@vercel/analytics/react';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { useState } from 'react';
export default function MyApp({ Component ,pageProps}) {
  return  (
    <Layout>
        <Component {...pageProps} />
        <Analytics/>
    </Layout>
    
  );
}
  