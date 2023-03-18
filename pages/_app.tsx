import type { AppProps } from 'next/app';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import Layout from '#/layout';
import { useSSR } from '@nextui-org/react';
const lightTheme = createTheme({
  type: 'light',
});

const darkTheme = createTheme({
  type: 'dark',
});

export default function App({ Component, pageProps }: AppProps) {
  const { isBrowser } = useSSR()
  return (
    isBrowser && (
      <NextUIProvider>
        <Layout><Component {...pageProps} /></Layout>
      </NextUIProvider>
    ));
}
