import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
export default function Document() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-L6NG9DRBHS');
  return (
    <Html lang="zh-Hant-HK">
      <Head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3459129696587268"
     crossOrigin="anonymous"
     strategy="lazy"></script>
     <Script async src="https://www.googletagmanager.com/gtag/js?id=G-L6NG9DRBHS"></Script>
    
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
