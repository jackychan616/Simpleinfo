import { ConText, ConTitle } from '../../components/component';
import { Container, Image, Space ,List,Text} from '@mantine/core';


export default function Page(){
    return(
      <Container>
        <ConTitle order = {1}>新手必須知道的崩壞：星穹鐵道攻略</ConTitle>  
        <Image src="/img/honkai/Honkai：Star_Rail崩壞：星穹鐵道.webp" alt = "崩壞：星穹鐵道" maw = "500px" width="300px" height= "300px" />
        <Space h ="lg"/>
        <ConTitle order = {2}>甚麼是崩壞：星穹鐵道？</ConTitle>
        <ConText>崩壞：星穹鐵道是米哈游的最新遊戲，𠄘接崩壞3rd的宇宙，並結合了原神的一些遊戲機制，以全新的故事和回合制的玩法帶來全新的遊戲體驗。</ConText>
        <ConTitle order = {2}>角色機制 光錐、遺器和星魂 </ConTitle>
        <ConText>光錐可以理解為武器，光錐又分為3、4、5星，每件光錐有不同的效果。</ConText>
        <ConText>遺器簡單而言即是原神的聖遺物，穿上相同系列的遺器會給予不同的效果，效果分為兩件四件。在指定等級升級時會隨機給予新的項目。新手時期不需在意，不過在中後期極為重要。</ConText>
        <ConText>星魂是抽到重覆角色時即可開放的額外能力，即是原神的命之座。最多可升至6級。提升星魂等級會給予角色的新能力。</ConText>
        <ConTitle order = {2}>角色系統和抽取建議</ConTitle>
        <ConText>本作設有命途系統的角色機制。命途為角色提供不同的定位</ConText>
        <List
            spacing="xs"
            size = "sm"
            center
        >
            <List.Item>平衡類型：毀滅（傷+坦）</List.Item>
            <List.Item>攻擊類型：巡獵（單體高傷）/智識（群傷</List.Item>
            <List.Item><text>輔助類型：豐饒（回血奶媽）/存護（盾）/同諧（我分buff）/虛無敵方（debuff）</text></List.Item>
        </List>
        <ConText>還有，角色設有物理、量子、虛數、冰、火、風、雷七種屬性。當敵人使用合適的元素能夠為我方帶來優勢。</ConText>
        <ConText>角色抽取方面，目前1.0版本建議抽取「up池」蝶立鋒鍔的角色希兒。傷害可觀之餘還有顏值。即使抽不到也無妨，可以期待下一隻角色景元。</ConText>
        <ConTitle order ={2}>組隊建議</ConTitle>
        <ConText>玩家可從以下角度思考</ConText>
        <ConTitle order = {3}>持續性</ConTitle>
        <ConText>持續性是指隊伍可戰鬥的持續性。即隊伍應有一至二位盾系或奶系角色以確保隊伍的持續性</ConText>
        <ConTitle order ={3}>元素</ConTitle>
        <ConText>建議每個隊伍上陣不同類型的元素，以增加順利打擊敵人弱點的機會</ConText>
        <Image src = "/img/honkai/honkai_2.webp"  alt = "崩壞：星穹鐵道 元素" height="75px" width = "500" maw = "500px"/>
        <ConTitle order = {2}>1.0版本角色強度排行</ConTitle>
        <Text c ="gold" fw={700}>S Tier</Text>
        <List>
            <List.Item>攻擊+平衡：希兒、景元</List.Item>
            <List.Item>輔助：白露、布洛妮婭、杰帕德丶停雲</List.Item>
        </List>
        <Text c = "purple" fw={700}>A Tier</Text>
        <List>
            <List.Item>攻擊+平衡：克拉拉、姬子丶彦卿 </List.Item>
            <List.Item>輔助：艾絲妲、佩拉、瓦爾特、主角（火）</List.Item>
        </List>
        <Text c= "green" fw={700} >B Tier</Text>
        <List>
            <List.Item>攻擊+平衡：丹恆、素裳、希露瓦</List.Item>
            <List.Item>輔助：三月七、娜塔莎</List.Item>
        </List>
    </Container>
    )
}
export const getStaticProps = async () => {
    return {
      props: {
        openGraphData: [
          {
            name:'description',
            content:'崩壞：星穹鐵道是米哈游的最新遊戲，𠄘接崩壞3rd的宇宙，並結合了原神的一些遊戲機制，以全新的故事和回合制的玩法帶來全新的遊戲體驗。'
  
          },
          {
            name:'title',
            content:'新手必須知道的崩壞：星穹鐵道攻略'
          },
          {
            property: "og:image",
            content:
              "https://simpleinfohk.me/img/unrecord/unrecord-game-sence.jpg",
          },
          {
            property: "og:image:width",
            content: "600",
          },
          {
            property: "og:image:height",
            content: "400",
          },
          {
            property: "og:title",
            content: "新手必須知道的崩壞：星穹鐵道攻略",
          },
          {
            property: "og:description",
            content: "崩壞：星穹鐵道是米哈游的最新遊戲，𠄘接崩壞3rd的宇宙，並結合了原神的一些遊戲機制，以全新的故事和回合制的玩法帶來全新的遊戲體驗。",
          },
          {
            property: "og:type",
            content: "website",
          },
        ],
      },
    };
  };