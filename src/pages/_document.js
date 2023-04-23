import { Html, Head, Main, NextScript } from 'next/document';
import {GoogleAds} from './components/googleAds';
export default function Document() {
  return (
    <Html lang="zh-Hant-HK">
      <Head/>
      <body>
        <GoogleAds/>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
