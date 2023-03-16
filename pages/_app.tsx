import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect,useState } from 'react';


export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);  
  return <>{isLoading ? <p>Loading</p>:<Component {...pageProps} />}</>;
}
