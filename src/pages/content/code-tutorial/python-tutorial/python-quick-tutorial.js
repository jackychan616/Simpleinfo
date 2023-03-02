import Head from "next/head";
import {Title,Image,Text,Table} from "@mantine/core";


import {ConText,OutputText,PyPrism} from "../../../components/component";
import Sharebox from "../../../components/share";

const code1=`
print('ok')
`;

const code2=`
number = 1 
print(number) 
`;

const code3=`
text = '這是一行句子' 
print(text) 
`;
const code4=`
Bool =True
if Bool :
    //Bool 是True則執行這一行
else :
    //Bool 是False則執行這一行
`;

const code5=`
age = 16
if age >=18:
    print('adult')
else:
    print('kids')
`;

function Page(){
    return(
        <>
        <Head>
            <meta name="title" content="Python入門"></meta>
            <meta name="description" content="入門快速學習Python,即使新手也很快速掌握"></meta>
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
                    <ConText fz="lg">我們將介紹如何在電腦設置Python開發環境</ConText>
                    <ConText fz="lg">Python能在大多數平臺使用包括Windows,MacOS,Linux 等等</ConText>
                    <Title order={3}>下載</Title>
                    <ConText fz="lg">一般建議在Python官網下載 <a href="https://www.python.org/downloads/">https://www.python.org/downloads/</a></ConText>

                    <Title order={3}>安裝</Title>
                    <ConText fz="lg">下載了合適的檔案後，按 <kbd>win + r </kbd>然後輸入<kbd>cmd</kbd> 打開終端，然後輸入python檢查是否安裝正確</ConText>
                    <Image src="/img/python-install-check.png" alt="" ></Image>
                    <ConText>如果輸出與圖片差不多，證明下載正確</ConText>
                    <Image src="/img/python-tutorial-cmd.png" alt="" ></Image>

                </div>

                <div className="page_container container">
                    <Title order={3}>語法</Title>
                    <ConText>文件輸入以下句子</ConText>
                    <PyPrism language="python">{code1}</PyPrism>
                    <ConText>輸出</ConText>
                    <samp>ok</samp>
                </div>
                
                <div className="container">
                    <Title order={3}>變數</Title>
                    <ConText>在設計程式當中，我們常常需要儲存數據，我們能使用<kbd>變數</kbd>儲存數字和字串</ConText>
                    <ul>
                        <li><ConText fz="lg">每個變數被使用前必須賦值</ConText></li>
                        <li><ConText><kbd>=</kbd>用來賦值給變數</ConText></li>
                        <li><ConText>每個變數被使用前必須賦值</ConText></li>
                        <li><ConText><kbd>變數 = 值</kbd></ConText></li>
                    </ul>
                            

                        <PyPrism >{code2}</PyPrism>
                        <OutputText >結果:1</OutputText>
                        <PyPrism >{code3}</PyPrism>
                </div>
        <div className="container">
            <Title order={4}>變數類型</Title>
            <ConText>Python 有很多變數類型,用來處理數字和文字</ConText>
            <Table horizontalSpacing="xs">
                <thread>
                    <tr>
                        <th>變數</th>
                        <th>類型</th>
                    </tr>   
                    <tbody>
                        <tr>
                            <td>

                            </td>
                        </tr>
                    </tbody>
                </thread>
            </Table>
        </div>    
        
        <div>
            <Title order={2}>條件句</Title>
            <ConText>條件句是基於布林(Boolean 即是True & False)執行不同段落</ConText>
            <Title order={3}>例子 1 </Title>
            <PyPrism >{code4}</PyPrism>
            <Title order={4}>例子 2</Title>
            <Text>結合運算符</Text>
            <PyPrism >{code5}</PyPrism>
        </div>
        
            </div>  
        </div>
        </>
    );
}

export default function _Page(){
    return(
        <>
            <Head>
                <title>Simple Blog - Python 入門</title>
    
            </Head>
            <div>
                <Sharebox/>
            </div>
            
            <Page />
        </>
    );
}