import Head from 'next/head';
import Link from 'next/link';

const components=[
    'poker',

]

export default function content(){
    return (
        <>
            <Head>
                <title>Simple Blog poker 教學</title>
            </Head>
            <div className='container'>
                <h1>poker 教學</h1>
                <div className='container'>
                    <Link className='content-link' href="/content/linux-tutorial/simple_linux_cmd">[porker 撲克牌] 二十一點玩法教學</Link>
                </div>
            </div>
        </>
        
    );
}