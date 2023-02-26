import Head from "next/head";
import Image from "next/image";
import "prismjs/themes/prism-tomorrow.css";

import { useEffect } from "react"

import Prism from "prismjs";

require("prismjs/components/prism-python");



export default function page(){
    return(
        <>
        <Head>
            <title>Simple Blog - Python 入門</title>
   
        </Head>
        <div className="container">
            <h1><strong>Python入門</strong></h1>

            <div >
                <div className="page_container">
                    <h3>簡介</h3>
      
                    <p>Python 是一種易學、強大的程式語言，Python的設計哲學強調程式碼的可讀性和簡潔的語法，
                    尤其是使用空格縮排來劃分程式碼塊。相比於C或Java，Python讓開發者能夠用更少的代碼表達想法。</p>

                </div>

                <div className="page_container">
                    <h3>下載Python</h3>
                    <p>我們將介紹如何在電腦設置Python開發環境</p>
                    <p>Python能在大多數平臺使用包括Windows,MacOS,Linux 等等</p>
                    <h4>下載</h4>
                    <p>一般建議在Python官網下載 <a href="https://www.python.org/downloads/">https://www.python.org/downloads/</a></p>

                    <h4>安裝</h4>
                    <p>下載了合適的檔案後，按 <kbd>win + r </kbd>然後輸入<kbd>cmd</kbd> 打開終端，然後輸入python檢查是否安裝正確</p>
                    <Image src="/img/python-install-check.png" alt="" width="625" height="85"></Image>
                    <p>如果輸出與圖片差不多，證明下載正確</p>
                    <Image src="/img/python-tutorial-cmd.png" alt="" width="350" height="171"></Image>

                </div>

                <div className="page_container container">
                    <h4>語法</h4>
                    <p>文件輸入以下句子</p>
                    <pre><code className="language-python">print('ok')</code></pre>
                    <p>輸出</p>
                    <samp>ok</samp>
                </div>
                
                <div className="container">
                    <h4>變數</h4>
                    <p>在設計程式當中，我們常常需要儲存數據，我們能使用<kbd>變數</kbd>儲存數字和字串</p>
                    <ul>
                        <li><p>每個變數被使用前必須賦值</p></li>
                        <li><p><kbd>=</kbd>用來賦值給變數</p></li>
                        <li><p>每個變數被使用前必須賦值</p></li>
                        <li><p><kbd>變數 = 值</kbd></p></li>
                    </ul>
                            
        <pre>
            <code className="language-python">number = 1 </code>
            <code className="language-python">string = '這是一行句子'</code>
        </pre>
                </div>
                <div className="container">
                    <div className="col">
                        <button>123</button>
                    </div>
                </div>
            </div>  
        </div>
        </>
    );
}
