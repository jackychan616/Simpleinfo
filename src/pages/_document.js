import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return(
    <Html lang="zh-Hant-HK">
        <Head>
            <link rel="icon" type="image/png" href="/icon.png"/>
            <meta charSet="utf-8"/>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3459129696587268"
     crossorigin="anonymous"></script>
        </Head>
        <body>
            <Main/>
            <NextScript/>
        </body>
    </Html>
  );
}