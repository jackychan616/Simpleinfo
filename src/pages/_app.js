import '../styles/globals.css'; 
import Layout  from './components/layout';


export default function MyApp({ Component ,pageProps}) {
  return  (
    <Layout>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3459129696587268"
     crossorigin="anonymous"></script>
      <Component {...pageProps} />
    </Layout>
    
  );
}
  