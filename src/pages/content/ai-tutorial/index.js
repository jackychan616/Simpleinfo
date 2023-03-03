import Head from 'next/head';
import Link from 'next/link';



export default function content(){
    return (
        <>
            <Head>
                <title>Simple Blog Ai 教學</title>
            </Head>
            <div className='container'>
                <h1>Ai 教學</h1>
                <div className='container'>
                    <Link className='content-link' href="\content\ai-tutorial\photo-ai-tutorial">Photo ai tutorial</Link>
                </div>
            </div>
        </>
        
    );
}