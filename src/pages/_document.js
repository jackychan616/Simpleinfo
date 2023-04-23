import { Html, Head, Main, NextScript } from 'next/document';
import {GoogleAds} from './components/googleAds';
export default function Document() {
  return (
    <Html lang="zh-Hant-HK">
      <Head/>
      <body>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3459129696587268"
     crossOrigin="anonymous"></script>
        <GoogleAds/>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
