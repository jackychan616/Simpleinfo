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
    <Html lang="zh-Hant-HK" className={style.html}>
      <Head>
        <meta charset="utf-8"/>
      </Head>
      <body>
          <Main/>
      </body>
    </Html>
  )
}
