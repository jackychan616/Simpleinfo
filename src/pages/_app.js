import '../styles/globals.css'; 
import Layout  from './components/layout';
import GoogleAds from './components/googleAds';

export default function MyApp({ Component ,pageProps}) {
  return  (
    <Layout>
      <GoogleAds/>
      <Component {...pageProps} />
    </Layout>
    
  );
}
  