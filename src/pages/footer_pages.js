import {Container,Blockquote,Avatar,Group,Space,Image} from "@mantine/core"
import {ConText, ConTitle} from './components/component'

export default function about_us(){
  return(
    <Container>
      <ConTitle order ={1}>關於我們</ConTitle>
      <ConTitle order = {2}>追求穩定 ,內容豐富</ConTitle>
      <ConText>由一群熱愛開發的人 , 共同打造全新的資訊性平台</ConText>
      <Space h ='lg'/>
      <Group>
          <Image src = "/img/footer_page/footer_page_2.png" maw = {500} height = {270} width = {350} radius={"20px"}/>
          <Group position="right">
            <Blockquote
              cite="Simpleinfo 開發團隊"
              icon={<Avatar src = "/img/simple_info.png" alt = "simpleinfo" radius="xl"/>}
            >
              我們的理念是從無到有 , 塑造一個開源的資訊性平台
            </Blockquote>
          </Group>
      </Group>
      <Space h = "lg"/>

      <Group position = "right">
          <Blockquote
            cite = "Simpleinfo 網站工程師 Jacky Chan"
          >
            以目標為結果
          </Blockquote>
      </Group>
      <Group >
        <Group position="right">  
            <Blockquote
              cite="Simpleinfo 策劃師 GC">
              為學日益 是我學到的
            </Blockquote>
        </Group>
      </Group>
      <Group position="center">
        <Image src = "/img/footer_page/footer_page_1.png" maw = {500} height={200} width = {275} radius={"15px"}/>
      </Group>
  </Container>
  )
}
