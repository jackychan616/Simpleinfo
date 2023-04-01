import { Html, Head, Main, NextScript } from 'next/document';
import GoogleAds from './components/googleAds';
import TrafficStarsAds from './components/trafficstars';
import Meta from './components/meta';
export default function Document() {
  return (
    <Html lang="zh-Hant-HK">
      <Head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <meta charSet="utf-8" />
        <Meta/>
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
