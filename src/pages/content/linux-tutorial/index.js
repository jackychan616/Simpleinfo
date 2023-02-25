import Head from 'next/head';
import Link from 'next/link';

const components=[
    'Linux幾個必學指令',

]

export default function content(){
    return (
        <>
            <Head>
                <title>Simple Blog - Linux 教學</title>
            </Head>
            <div className='container'>
                <h1>Linux 教學</h1>
                <div className='container'>
                    <Link className='content-link' href="/content/linux-tutorial/simple_linux_cmd">Linux幾個必學指令</Link>
                </div>
            </div>
        </>
        
    );
}