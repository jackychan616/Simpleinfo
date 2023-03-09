import '../styles/globals.css'; 
import Layout  from './components/layout';
import { Analytics } from '@vercel/analytics/react';


export default function MyApp({ Component ,pageProps}) {
  return  (
    <Layout>
      <Component {...pageProps} />
      <Analytics/>
    </Layout>
    
  );
}
  