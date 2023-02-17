import Nav from './nav';
import App from './main-page';
import 'bootstrap/dist/css/bootstrap.css';    
import style from '../styles/Home.module.css'
import { Children } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Home() {
  return (
    <html lang="zh-Hant-HK" className={style.html}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta charset="utf-8"/>
      </head>
      <body>
          <Main/>
      </body>
    </html>
  )
}
