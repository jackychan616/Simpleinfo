
import {ConTitle} from '../../components/component';
import {Container,Image} from '@mantine/core';
function ConContent(){
    return(
        <>
        <Container>

            <ConTitle order={1}>
                Linux幾個必學指令(ls cd cat)
            </ConTitle>


        
            <ConTitle order={2}id="introduction-title">
                為甚麼用Linux?
            </ConTitle>
            
            <p id="introduction-cotent">
                Linux 是一種開放和免費的源代碼，可以替代window 作系統用。另外，Linux 的操作系統提供了不同工具和支持多種語言令開發者更自由選擇。
            </p>


        
        
            <ConTitle order={2}>
                ls
            </ConTitle>
            
            <ConTitle order={3}>
                用途
            </ConTitle>
            <p>顯示當前路徑文件</p>

            
            <ConTitle>其他指令</ConTitle>
            <code><pre> ls [路徑] 顯示其他路徑文件   </pre> </code>
            <code><pre> -d */     只顯示檔案  </pre> </code>
            <code><pre> -R        顯示當前路徑中檔案子檔案  </pre> </code>
            <code><pre> -l        顯示檔案資訊  </pre> </code>
            <code><pre> -a        顯示隱藏檔案  </pre> </code>
            <code><pre> -al       顯示隱藏檔案資訊  </pre> </code>


            <Image src="/img/img1.png" id="img1" width='500' height="300" alt = " linux"/ >
        
            <ConTitle order={3}>
                cd
            </ConTitle>
            <ConTitle order={3}>
                用途
            </ConTitle>
            <p>切換路徑</p>
            <ConTitle order={3}>
                示範
            </ConTitle>
            <Image src="/img/img2.png" id="img2" width="500" height='100' alt = " linux"/>
        

        
            <ConTitle order={2}>
                cat
            </ConTitle>
            <ConTitle order={3}>
                用途
            </ConTitle>
            <p>cat 用途是獲取文件或輸入并打印出來,通常用來顯示文件內容處理文件</p>
            <ConTitle order={3}>格式</ConTitle>
            <code>{` cat [-字母] [文件名稱]`}</code>
            <ConTitle order={3}>基本使用</ConTitle>
            <code>{`cat filename.txt]     顯示檔案內容  `}</code>
            <code>{` cat ['文字或檔案名稱(file2name.txr)] {'>'} ['filename.txt']   快速創建檔案並將內容寫入檔案 `}</code>
            <code>{`cat *.['副檔名']    例如 *.txt   顯示所有txt的檔案內容 `} </code>          
       </Container>
    </>
    );
}

export default function Page(){
    return(
        <>
            <ConContent/>
        </>
        

    );
}
