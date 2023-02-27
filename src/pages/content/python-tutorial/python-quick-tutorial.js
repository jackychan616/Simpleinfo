import Head from "next/head";
import Image from "next/image";
import {Title,Text } from "@mantine/core";
import { Prism } from '@mantine/prism';
import ConText from "@/pages/components/MyText";
import { useEffect } from "react"




export default function page(){
    return(
        <>
        <Head>
            <title>Simple Blog - Python 入門</title>
   
        </Head>
        <div className="container">
            <Title order={1}>Python入門</Title>

            <div >
                <div className="page_container">
                    <Title order={2}>簡介</Title>
      
                    <ConText >Python 是一種易學、強大的程式語言，
                    Python的設計哲學強調程式碼的可讀性和簡潔的語法，
                    尤其是使用空格縮排來劃分程式碼塊。相比於C或Java，
                    Python讓開發者能夠用更少的代碼表達想法。</ConText>

                </div>

                <div className="page_container">
                    <Title order={2}>下載Python</Title>
                    <Text fz="lg">我們將介紹如何在電腦設置Python開發環境</Text>
                    <Text fz="lg">Python能在大多數平臺使用包括Windows,MacOS,Linux 等等</Text>
                    <Text fz="lg">下載</Text>
                    <Text fz="lg">一般建議在Python官網下載 <a href="https://www.python.org/downloads/">https://www.python.org/downloads/</a></Text>

                    <Text fz="lg">安裝</Text>
                    <Text fz="lg">下載了合適的檔案後，按 <kbd>win + r </kbd>然後輸入<kbd>cmd</kbd> 打開終端，然後輸入python檢查是否安裝正確</Text>
                    <Image src="/img/python-install-check.png" alt="" width="625" height="85"></Image>
                    <Text>如果輸出與圖片差不多，證明下載正確</Text>
                    <Image src="/img/python-tutorial-cmd.png" alt="" width="350" height="171"></Image>

                </div>

                <div className="page_container container">
                    <Title order={3}>語法</Title>
                    <Text>文件輸入以下句子</Text>
                    <Prism language="python">print('ok')</Prism>
                    <Text>輸出</Text>
                    <samp>ok</samp>
                </div>
                
                <div className="container">
                    <Title order={3}>變數</Title>
                    <Text>在設計程式當中，我們常常需要儲存數據，我們能使用<kbd>變數</kbd>儲存數字和字串</Text>
                    <ul>
                        <li><Text fz="lg">每個變數被使用前必須賦值</Text></li>
                        <li><Text><kbd>=</kbd>用來賦值給變數</Text></li>
                        <li><Text>每個變數被使用前必須賦值</Text></li>
                        <li><Text><kbd>變數 = 值</kbd></Text></li>
                    </ul>
                            
        <pre>
            <Prism language = "python">number = 1 # print(number) output : 1 </Prism>
            <Prism language = "python">string = '這是一行句子' # print(string) output: 這是一行句子</Prism>
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
