import { Container, List } from '@mantine/core';
import { ConText, ConTitle } from '../../components/component';
import {Meta} from '../../components/meta';

function Page() {
  return (
    <Container>
      <ConTitle order={1}>淺談AI</ConTitle>
      <ConTitle order={2}>介紹</ConTitle>
      <ConText>
        AI（Artificial
        Intelligence）也被稱為人工智能，是一項研究如何讓計算機實現類似人類智能的技術。它是一個廣泛的研究領域，涉及到計算機科學、統計學、數學和神經科學等多個學科。
      </ConText>
      <ConText>
        簡單來說，AI可以分為兩大類：一是“強人工智能”，這種人工智能可以像人類一樣思考，甚至超過人類思維水平；二是“弱人工智能”，這種人工智能只能執行特定任務，例如語音識別、圖像識別、自然語言處理等。
      </ConText>
      <ConTitle order={2}>如何實踐AI</ConTitle>
      <List type="ordered">
        <List.Item>
          數據收集與準備：AI的核心在數據。首先需要大量數據，然後對數據進行加工整理，進而生成訓練數據。
        </List.Item>
        <List.Item>
          訓練模型：在得到可用的訓練數據後，利用計算機運算能力，通過特定的算法進行反覆的訓練，在訓練過程中類似神經元的“模型”會慢慢地調整到最優狀態。
        </List.Item>
        <List.Item>
          測試模型：訓練完成後，需要進一步進行模型的測試，確認模型的功能是否正常和合適。如果模型有誤或不足，需要回到訓練模型階段進行更新。
        </List.Item>
        <List.Item>
          上線和監控：在確認模型可以正常使用後，需要上線並進行監控。一般需要使用特定的服務器將模型應用於實際工作，並對模型的表現進行實時監控。
        </List.Item>
        <List.Item>
          優化模型：通過數據的反饋、評估和調整，逐漸提高模型精度和適用範圍，不斷優化AI系統，提高水平與效率。
        </List.Item>
      </List>
      <ConTitle order={2}>總結</ConTitle>
      <ConText>
        總的來說，AI的實踐需要大量的數據積累和不斷優化，而這些都需要聯合大量的相關領域專家來共同構建。除了普通的技術人員之外，AI的實踐還需要涉及到專業的數據分析師、人工智能開發者、算法工程師等，共同協作構建更為穩定、高效和人性化的人工智能系統。
      </ConText>
    </Container>
  );
}

export default function ConPage() {
  return (
    <>
      <Meta
        img={'/img/ai-light-talk/ai-1.jpg'}
        pageTitle="淺談AI"
        description={
          'AI（Artificial Intelligence）也被稱為人工智能，是一項研究如何讓計算機實現類似人類智能的技術。它是一個廣泛的研究領域，涉及到計算機科學、統計學、數學和神經科學等多個學科。AI可以分為兩大類：一是“強人工智能”，這種人工智能可以像人類一樣思考，甚至超過人類思維水平；二是“弱人工智能”，這種人工智能只能執行特定任務，例如語音識別、圖像識別、自然語言處理等。'
        }
      />
      <Container>
        <Page />
      </Container>
    </>
  );
}
