import { CssBaseline } from '@nextui-org/react';
import { NextPage } from 'next';
import BaseDocument, { Head, Html, Main, NextScript } from 'next/document';
import { Children } from 'react';

export interface Props {}

const Document: NextPage = () => {
  return (
    <Html lang="zh-hant">
      <Head>{CssBaseline.flush()}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

Document.getInitialProps = async (ctx) => {
  const initialProps = await BaseDocument.getInitialProps(ctx as any);

  return { ...initialProps, styles: Children.toArray([initialProps.styles]) };
};

export default Document;
