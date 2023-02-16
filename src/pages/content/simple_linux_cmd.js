import Image from "next/image";


export default function Page(){
    return(
        <div>
            <div id="web-title">
            <h1>
                Linux幾個必學指令(ls cd cat)
            </h1>
        </div>

        <div class="content" id="introduction">
            <h2 id="introduction-title">
                為甚麼用Linux?
            </h2>
            
            <p id="introduction-cotent">
                Linux 是一種開放和免費的源代碼，可以替代window 作系統用。另外，Linux 的操作系統提供了不同工具和支持多種語言令開發者更自由選擇。
            </p>

        </div>
        
        <div class="content" id="content-ls">
            <h2 id="point1">
                ls
            </h2>
            
            <h3>
                用途
            </h3>
            <p>顯示當前路徑文件</p>

            
            <h3>其他指令</h3>
            <code>
            <pre>    ls '['路徑']' 顯示其他路徑文件
    -d */     只顯示檔案
    -R        顯示當前路徑中檔案子檔案
    -l        顯示檔案資訊
    -a        顯示隱藏檔案
    -al       顯示隱藏檔案資訊
            </pre>    
            </code>
            <Image src="/img/img1.png" id="img1" width='500' height="300"/>
        </div>
        <div class="content" id="content-cd">
            <h1>
                cd
            </h1>
            <h3>
                用途
            </h3>
            <p>切換路徑</p>
            <h3>
                示範
            </h3>
            <Image src="/img/img2.png" id="img2" width="500" height='300'/>
        </div>

        <div class="content" id="content-cat">
            <h1>
                cat
            </h1>
            <h3>
                用途
            </h3>
            <p>cat 用途是獲取文件或輸入并打印出來,通常用來顯示文件內容處理文件</p>
            <h3>格式</h3>
            <code>
                <pre>
    cat '['-字母']' '['文件名稱']'
                </pre>
            </code>
            <h3>基本使用</h3>
            <code>
                <pre>
    cat '['filename.txt']'     顯示檔案內容
    cat '['文字或檔案名稱(file2name.txr)] '{'>'}' '['filename.txt']'   快速創建檔案並將內容寫入檔案
    cat *.'['副檔名']'    例如 *.txt   顯示所有txt的檔案內容 
                </pre>
            </code>
            
        </div>
        </div>
        
    );
}