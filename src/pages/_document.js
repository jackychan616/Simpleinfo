import { Html, Head, Main, NextScript } from "next/document";
import Meta from './components/meta';
import { MantineProvider } from '@mantine/core';

export default function Document() {
  return(
    <Html lang="zh-Hant-HK">
        <Head>
            <link rel="icon" type="image/png" href="/icon.png"/>
            <meta charSet="utf-8"/>


        </Head>
          <body>
            <Main/>
            <NextScript/>
        </body>
        
    </Html>
  );
}