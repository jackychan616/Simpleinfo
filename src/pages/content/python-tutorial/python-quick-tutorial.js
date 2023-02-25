import Head from "next/head";


export default function page(){
    return(
        <>
        <Head>
            <title>Simple Blog - Python 入門</title>
        </Head>
        <div>
            <h1><strong>Python入門</strong></h1>

            <div >
                <div className我們將="container">
                    <h3>簡介</h3>
                    <p>Python 是一種易學、強大的程式語言，Python的設計哲學強調程式碼的可讀性和簡潔的語法，尤其是使用空格縮排來劃分程式碼塊。相比於C或Java，Python讓開發者能夠用更少的代碼表達想法。</p>
                </div>

                <div className="container">
                    <h3>下載Python</h3>
                    <p>我們將介紹如何在電腦設置Python開發環境</p>
                    <p>Python能在大多數平臺使用包括Windows,MacOS,Linux 等等</p>
                    <h4>下載</h4>
                    <p>一般建議在Python官網下載 <a href="https://www.python.org/downloads/">https://www.python.org/downloads/</a></p>

                    <h4>安裝</h4>
                    <p></p>
                </div>
            </div>
        </div>
        </>
    );
}