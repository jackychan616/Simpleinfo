import loadable from '@loadable/component';
import { Children } from 'react';
import Head from 'next/head';
import pMinDelay from 'p-min-delay';
import Loading from './loading';
const App =loadable(() => pMinDelay(import('./main-page'),500) );
export default function Home() {
  return (
    <App fallback={<Loading/>}/>
  )
}
