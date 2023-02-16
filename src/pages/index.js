import Nav from './nav';
import Main from './main-page';
import 'bootstrap/dist/css/bootstrap.css';    
import style from '../styles/Home.module.css'
import Document, {
  Html,
  Head,
  Main
} from 'next/document'


import { Children } from 'react'


export default function Home() {
  return (
<<<<<<< HEAD
    <Html lang="zh-Hant-HK" className={style.html}>
      <Head>
=======
    <html lang="zh-Hant-HK">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
>>>>>>> c5ea5d977a2b4e88d5558e43d1024f3509491422
        <meta charset="utf-8"/>
      </Head>
      <body>
          <Main/>
      </body>
    </Html>
  )
}
