import Nav from './nav';
import Main from './main-page';
import 'bootstrap/dist/css/bootstrap.css';    

export default function Home() {
  return (
    <html lang="zh-Hant-HK">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta charset="utf-8"/>
      </head>
      <body>
        <div >
          <Nav/>
        </div>
      </body>
    </html>
  )
}
