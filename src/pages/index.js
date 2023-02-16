import Nav from './nav';
import Main from './main-page';
import 'bootstrap/dist/css/bootstrap.css';
export default function Home() {
  return (
    <html lang="zh-Hant-HK" className={styles.html}>
      <head>
  
        <meta charset="utf-8"/>
      </head>
      <body>
        <div className={styles.description}>
          <Nav/>
        </div>
      </body>
    </html>
  )
}
