import { Container,List ,Space,Image} from "@mantine/core";
import { ConText,ConTitle } from "../../components/component";
import Meta from '../../components/meta';
function Page(){
    return(
        <Container>
            <ConTitle order={1}>什麼是AI? 10分鐘內學懂AI</ConTitle>
            <ConTitle  order={2}>定義AI</ConTitle>
            <ConText>AI(人工智慧)  是電腦科學的一個領域，用於解決與人類智慧相關的常見認知問題 ，例如學習、解決問題和模式辨識。
                    而這類行動原本需要人類智慧判斷或涉及超出人為分析能力上限的資料規模
                    AI 是一個廣泛版圖，包含許多不同的專業領域，
                    包括電腦科學、資料分析與統計資料、硬體與軟體工程、語言學、神經科學，甚至是哲學和心理學。
            </ConText>
            <ConTitle order={2}>AI類型</ConTitle>
            <Image maw={700} src="https://149695847.v2.pressablecdn.com/wp-content/uploads/2019/08/PEDRO-DOMiNGOS-8.jpg" alt="Pedro Domingos"/>
            <ConText><a href="https://en.wikipedia.org/wiki/Pedro_Domingos">Pedro Domingos</a> 是人工智能領域聲譽卓著的研究人員，提出機器學習的「五大流派」，
                    包括：符號主義 (Symbolists)，源自於邏輯和哲學；聯結主義 (Connectionists)，
                    神經科學的分支；進化主義 (Evolutionaries)，與進化生物學相關；貝葉斯派 (Bayesians)，採用統計學和概率方法；
                    以及類比主義 (Analogizers)，源自於心理學。
                    由於近年統計電腦運算能力的提高，所以貝葉斯派的學者成功地讓「機器學習」在很多領域發展。
                    網路運算方面的進展也讓聯結主義流派的學者進一步發展「深度學習」這個分支。
                    機器學習與深度學習分為「監督」和「未監督」兩種學習技巧，
                    AI 獲得的資訊越多，它就會變得「越聰明」而且學習更快，
            </ConText>
            <ConText>「監督」使用包含預期結果的訓練資料，「未監督」則使用不包含預期結果的訓練資料。</ConText>

            <ConTitle size="h3" order={3}>Machine Learning(ML)  機器學習</ConTitle>
            <ConText>機器學習 是透過演算法將收集到的資料進行分類或預測模型訓練，
                在未來中，當得到新的資料時，可以透過訓練出的模型進行預測 
                ，如果這些效能評估可以透過利用過往資料來提升的話，就叫機器學習。
                </ConText>
            <ConText>機器學習應用非常的廣泛，例如:自動駕駛汽車、人臉辨識、車牌辨識...等。</ConText>
            <ConTitle size="h3" order={3}>Deep learning (DL)深度學習</ConTitle>
            <ConText>深度學習是什麼?深度學習便是令到電腦能人像一樣學習。深度學習是一種方法可指導電腦以受人腦啟發的方式來處理資料。
                這樣的技術稱為深度神經網絡。神經網路是一種                                                                                                                                                                                  建構函數的方式。當我們問了問題，
                並準備許多歷史資料當做的「考古題」，希望能訓練神經網路看到新的問題時也可以正確回答：比如說狗類辨識的神經網路在訓練後，
                可以正確叫出沒看過的狗名。
                </ConText>
            <ConText>深度學習技術推動了許多AI 應用程式產品化的發展，例如:</ConText>
            <List >
                <List.Item>聊天機械人</List.Item>
                <List.Item>自動駕駛</List.Item>
                <List.Item>醫學</List.Item>
            </List>
            <ConTitle size="h3" order={2}>AI 的重要性?</ConTitle>
            <ConText>AI能幫助企業成長、找到新的收入管道，並解決企業遇到的難題
                機器學習實現了自動化和優化一些傳統工作，例如顧客回饋、財報...等
                亦能夠自動高速</ConText>
            <ConTitle size="h3" order={2}>AI如何運作？</ConTitle>
            <ConTitle size="h3" order={3}>機器學習</ConTitle>
            <ConText>機器學習的核心概念是找到輸入與輸出資料之間的數學關聯。
                機器學習模型一開始並不知道這個關聯，但隨著給予其足夠的資料，模型的預測會越來越準確。
                每個機器學習演算法都是基於一個可修改的數學函數建立的。以下的例子可幫助您了解基本原理：
                </ConText>
            <List type="ordered" >
                <List.Item >我們可以使用這些輸入/輸出資料對 (input,output) 來「訓練」演算法 – (1,7)、(5,19) 和 (10,34)</List.Item>
                <List.Item >演算法運算出這些輸入與輸出之間的關聯為：output=3*input+4</List.Item>
                <List.Item >我們將輸入設為 2，並要求算法給出預測的輸出。算法算出輸出為 10。</List.Item>
            </List>
            <ConText>機器學習的原理便是找到資料的關聯性，
                無論多複雜的資料，只要有足夠資料和電腦算力，資料之間的數學關聯總能夠被找出來。
                因此結果的準確性與資料的輸入量相關 </ConText>
            <ConTitle size="h3" order={3}>深度學習</ConTitle>
            <ConText>深度學習演算法是以人類大腦為模型的神經網絡。人腦包含數百萬個互連的神經元，這些神經元會協同合作學習和處理資訊。同樣地，深度學習神經網路或人工神經網路，也包含了許多人工神經元層，其可在電腦內部協同運作。  </ConText>
            <ConTitle size="h3" order={4}>人工神經元</ConTitle>
            <ConText>人工神經元是節點的軟體模組，使用數學計算來處理資料。</ConText>
            
            <ConTitle size="h3" order={4}>人工神經網路</ConTitle>
            <Image src="/img/ai-deep-learning-network.jpg"  maw={500} alt="深度學習神經網路"/>
            <ConText>人工神經網路屬於深度學習演算法，可使用這些節點來解決複雜問題。</ConText>
            
            <ConTitle size="h3" order={4}>深度學習網路組成部分</ConTitle>
            <ConTitle size="h3" order={5}>輸入層</ConTitle>
            <ConText>人工神經網路有幾個節點，用來接收資料。這些節點構成了系統的輸入層。</ConText>
            <ConTitle size="h3"  order={5}>隱藏層</ConTitle>
            <ConText>隱藏層會處理資訊，並把資料傳遞到神經網路的其他層中。不同層級處理不同資訊。
深度學習可以有數百個隱藏層，用來從不同的角度分析問題。</ConText>
            <ConTitle size="h3" order={5}>例子</ConTitle>
            <ConText>一個能分類動物的深度學習系統，會嘗試從不同方面比較，例如它的皮毛的顏色圖案、腿的數量、身型大小以及耳朵形狀。
這系統將會這樣識別:</ConText>
            <List type="ordered">
                <List.Item>有4條腿，可能是牛、羊、馬</List.Item>
                <List.Item> 有黑白班紋，有可能是斑馬</List.Item>
            </List>
            <ConText>所有隱藏層會以相同的方式運作。如果一個深度學習嘗試為動物作分類，其每個隱藏層會識別動物的不同特徵，作出分類。</ConText>
            <ConTitle size="h3" order={6}>輸出層</ConTitle>
            <ConText>由輸出資料的節點組成。
輸出「是」或「否」答案的深度學習模型在輸出層中只有兩個節點。
範圍更廣的答案具有更多節點。 </ConText>
            <ConTitle>參考:</ConTitle>
            <ConText><a href="https://aws.amazon.com/tw/machine-learning/what-is-ai/">https://aws.amazon.com/tw/machine-learning/what-is-ai/</a></ConText>
            <ConText><a href="https://www.oracle.com/tw/artificial-intelligence/what-is-ai/">https://www.oracle.com/tw/artificial-intelligence/what-is-ai/</a></ConText>
            <ConText><a href="https://cloud.google.com/learn/what-is-artificial-intelligence?hl=zh-tw">https://cloud.google.com/learn/what-is-artificial-intelligence?hl=zh-tw</a></ConText>
        </Container>
        
    );
}

export default function ConPage(){
    return(
        <>
            <Meta pageTitle={"什麼是AI? 10分鐘內學懂AI"} img={"/img/ai.jpg"} description={"AI(人工智慧)  是電腦科學的一個領域，用於解決與人類智慧相關的常見認知問題 ，例如學習、解決問題和模式辨識。而這類行動原本需要人類智慧判斷或涉及超出人為分析能力上限的資料規模AI 是一個廣泛版圖，包含許多不同的專業領域，包括電"}/>
            <Container>
                <Page/>
                <Space h="lg"/>
            </Container>
        </>
    );
}