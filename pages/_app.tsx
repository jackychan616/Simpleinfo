import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { NextUIProvider,createTheme,ThemeProvider  } from '@nextui-org/react';
import Layout from 'components/layout';
import useDarkMode from 'use-dark-mode';

const lightTheme = createTheme({
    type: 'light'
  })
  
  const darkTheme = createTheme({
    type: 'dark'
  })



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
          <NextUIProvider >
            <Layout><Component {...pageProps} /></Layout>
          </NextUIProvider>
      )}
    </>
  );
}
