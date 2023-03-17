import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import Layout from '#/layout';

const lightTheme = createTheme({
  type: 'light',
});

const darkTheme = createTheme({
  type: 'dark',
});

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1e3);
  }, []);
  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <NextUIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      )}
    </>
  );
}
