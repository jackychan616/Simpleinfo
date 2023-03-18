import type { AppProps } from 'next/app';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import '../styles/globals.css';

const lightTheme = createTheme({
  type: 'light',
});

const darkTheme = createTheme({
  type: 'dark',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
