import type { AppProps } from 'next/app';
import { useEffect,useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import Layout from '../components/layout';
export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);  
  return(<>
      {isLoading ? <p>Loading</p>:
        <NextUIProvider><Layout><Component {...pageProps} /></Layout></NextUIProvider> }
        </>) ;
}
