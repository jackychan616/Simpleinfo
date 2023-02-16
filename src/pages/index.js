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
    <html lang="zh-Hant-HK">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta charset="utf-8"/>
      </head>
      <body>
        
        <div >
          <div>
            <Nav/>
          </div>
          
        </div>
      </body>
    </html>
  )
}
