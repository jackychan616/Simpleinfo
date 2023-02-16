import Nav from './nav';
import Main from './main-page'
export default function Home() {
  return (
    <html lang="zh-Hant-HK">
      <head>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
        <meta charset="utf-8"/>
      </head>
      <body>
        <div>
          <Nav/>
        </div>
      </body>
    </html>
  )
}
