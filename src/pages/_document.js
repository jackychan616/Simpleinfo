import { Html, Head, Main, NextScript } from 'next/document';
export default function Document() {
  return (
    <Html lang="zh-Hant-HK">
      <Head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <meta charSet="utf-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
        
      </body>
    </Html>
  );
}
