import { Html, Head, Main, NextScript } from 'next/document';
import GoogleAds from './components/googleAds';
import TrafficStarsAds from './components/trafficstars';
export default function Document() {
  return (
    <Html lang="zh-Hant-HK">
      <Head>

      </Head>
      <body>
        <Main />
        <NextScript />
        <GoogleAds />
        <TrafficStarsAds/>
      </body>
    </Html>
  );
}
