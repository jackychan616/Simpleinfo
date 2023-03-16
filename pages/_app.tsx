import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      )}
    </>
  );
}
