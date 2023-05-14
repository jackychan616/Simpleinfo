import {Container,Space,Image,List} from '@mantine/core';
import {ConText,ConTitle} from '../../components/component';

export default function Page(){
    return(
        <Container>
            <ConTitle>Google推出全新AI大型模型PaLM 2 ，可在手機運行與結合多個Google工具完勝OpenAI</ConTitle>
            <Space h="lg"/>
            <Image src="/img/google-palm/google-palm.webp" alt="Google I/O 2023" maw={980}/>
            <ConText>在這一週，谷歌 {`"開大了"`}，丟出了 PaLM 2 這顆大型模型 {`"重磅炸彈"`}，在 Google I/O 2023 大會上展示了多項能力對比，再一次向 GPT-4 下了 {`"戰書"`}。</ConText>
            <ConText>在5 月 11 日，舉辦了Google I/O 2023，除了發布旗下搭載自研處理器的首款摺疊手機 Pixel Fold和Android 14 新系統外，本屆大會的重頭戲更多的是在 AI 領域。</ConText>
            <Space h="sm"/>
            <Image src="/img/google-palm/palm2.webp" alt="Google PaLM 2"/>
            <ConText>Google介紹了全新大語言模型PaLM 2，Google聲稱它在部分任務超越GPT-4。更新後的 Bard 能力大大提升並能支援多種新語言，Google版AI辦公助手也一併推出，將在Gmail中搶先亮相。 </ConText>
            <Space h="lg"/> 
            <ConText>發表會結束後，Google股價上漲4%。</ConText>
            <ConTitle>介紹 PaLM 2</ConTitle>
            <ConText>Google 宣布有超過25個自家產品由PaLM 2 作為底層技術支援。</ConText>
            <Space h="sm"/> 
            <ConText>以下是PaLM 2 具有的特點</ConText>
            <List>
                <List.Item>
                <br>多語言性：</br> PaLM 2 在多語言文本方面接受了更多的訓練，涵蓋 100 多種語言。這顯著提高了它在多種語言中理解、生成和翻譯細微差別文本（包括成語、詩歌和謎語）的能力，這是一個很難解決的問題。 PaLM 2 還通過了“精通”級別的高級語言能力考試。
                </List.Item>
                <List.Item>
                <br>推理：</br> PaLM 2 的數據集包括科學論文和包含數學表達式的網頁。因此，它具有邏輯、常識推理和數學方面的改進能力
                </List.Item>
                <List.Item>
                <br>程式設計：</br> PaLM 2 在大量公開可用的源代碼數據集上進行了預訓練。這意味著它擅長 Python 和 JavaScript 等流行的編程語言，但也可以生成 Prolog、Fortran 和 Verilog 等語言的專用代碼。
                </List.Item>
            </List>
            <Space h="sm"/>
            <ConText>AI 功能就算再強大，也並不是可以部署到任何裝置上，但PaLM 2 有多種尺寸可供選擇，這使得它可以輕鬆部署到各種裝置中，PaLM 2 提供四種尺寸，從最小到最大：Gecko、Otter、Bison 和 Unicorn。(由四種由小到大的動物命名，很有創意) Gecko 非常輕巧，可以在移動設備上工作，並且速度足夠快，即使在離線時也能在設備上運行出色的交互式應用程序。這種多功能性意味著可以對 PaLM 2 進行微調，以更多方式支持整個類別的產品，從而令AI應用程序更親民。</ConText>
            <Space h="lg"/>
            <ConTitle>PaLM 2 支持超過 25 種 Google 產品和功能</ConTitle>
            <List>
                <List.Item>
                Google搜索： Bard可以通過Google搜索獲取和處理現實的信息，並使它的回答與搜索結果保持一致。這意味著Bard可以全面而詳實地回答你的問題，即使這些問題是開放式的、具有挑戰性的或奇怪的。例如，如果你問我 {`"法國的首都是什麽？"`}，Bard可以進入谷歌搜索，找到答案，那就是巴黎。然後，它可以向你提供更多關於巴黎的信息，例如它的人口、氣候和景點。
                </List.Item>
                <List.Item>
                    Google翻譯： Bard可以在200多種語言之間進行翻譯。這意味著你可以用Bard來翻譯文本、文件，甚至是對話。例如，如果你正在閱讀一個外語網站，你可以用Bard把它翻譯成你的母語。你也可以用Bard來翻譯兩個講不同語言的人之間的對話。
                </List.Item>
                <List.Item>
                Google Doc： Bard可以幫助你在Google Doc中編寫文件。它可以生成文本，格式化文本，甚至幫助你處理語法和拼寫。例如，如果你正在寫一份報告，你可以用Bard來生成想法，寫段落，甚至檢查你的語法。Bard還可以幫助你格式化你的文件，如添加標題、副標題和列表。
                </List.Item>
                <List.Item>
                Google Sheet： Bard可以幫助你在Google Sheet中制作電子表格。Bard可以生成數據，格式化數據，甚至幫助你進行計算。例如，如果你正在跟蹤你的支出，你可以用Bard生成一個電子表格來跟蹤你的收入和支出。Bard還可以幫助你格式化你的電子表格，如添加公式和圖表。
                </List.Item>
                <List.Item>
                Google Slide： Bard可以幫助你在谷歌幻燈片中創建演示文稿。它我可以生成文本，格式化文本，甚至幫助你制作動畫。例如，如果你要做一個演講，你可以用Bard來創建一個演示文稿，幫助說明你的觀點。還能夠幫助你格式化你的演示文稿，如添加圖片和視頻。
                </List.Item>
            </List>
        </Container>
    );
}


export const getStaticProps = async () => {
    return {
      props: {
        openGraphData: [
          {
            name:'description',
            content:'在這一週，谷歌 "開大了"，丟出了 PaLM 2 這顆大型模型 "重磅炸彈"，在 Google I/O 2023 大會上展示了多項能力對比，再一次向 GPT-4 下了 戰書"。'

          },
          {
            name:'title',
            content:'Google推出全新AI大型模型PaLM 2 ，可在手機運行與結合多個Google工具完勝OpenAI'
          },
          {
            property: "og:image",
            content:
              "https://simpleinfohk.me/img/google-palm/google-palm.webp",
          },
          {
            property: "og:image:width",
            content: "400",
          },
          {
            property: "og:image:height",
            content: "300",
          },
          {
            property: "og:title",
            content: "Google推出全新AI大型模型PaLM 2 ，可在手機運行與結合多個Google工具完勝OpenAI",
          },
          {
            property: "og:description",
            content: '在這一週，谷歌 "開大了"，丟出了 PaLM 2 這顆大型模型 "重磅炸彈"，在 Google I/O 2023 大會上展示了多項能力對比，再一次向 GPT-4 下了 戰書"。',
          },
          {
            property: "og:type",
            content: "blog",
          },
        ],
      },
    };
  };