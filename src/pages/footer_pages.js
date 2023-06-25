import {Container,Blockquote,Avatar,Group,Space,Image ,AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,useMantineTheme,Center,Stepper,Table, createStyles,RingProgress} from "@mantine/core"
import {ConText, ConTitle} from './components/component'
import { useState,useRef  } from 'react';
import {TableOfContents} from './components/leftbar/table'
import { Link, Button, Element, Events} from 'react-scroll/modules'
import {Sub} from './components/leftbar/sub'
import {Goal2} from './components/goal'
const useStyles = createStyles((theme) =>({
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  }
}))
export function About_us(){
  return(
    <Container>
      <Center>
      <ConTitle order ={1}>關於我們</ConTitle>
      <Group>
      <Text 
      fw={700} fz="xl" 
      variant="gradient"
      gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>由一群熱愛開發的人 </Text>
      <Text  fw={700} fz="xl"       
      variant="gradient"
      gradient={{ from: 'orange', to: 'red', deg: 45 }}>共同打造全新的資訊</Text>
      </Group>

      <Group>
      <Text fw={550} fz="xl"
            variant="gradient"
            gradient={{ from: 'green', to: 'yellow', deg: 45 }}>精心策劃的平台內容</Text>
      <Text fw={700} fz="xl"      
      variant="gradient"
      gradient={{ from: 'magenta', to: 'violet', deg: 45 }}>發現最新的新興趨勢</Text>
      </Group>
      </Center>      
      <Space h ='lg'/>
      <Center>
            <ConTitle order = {2}>追求穩定 ,內容豐富</ConTitle>
      </Center>
      <Space h = "lg"/>
      <Group>
          <Group position="right">
          <Group position="right">
            <Image src = "/img/footer_page/footer_page_2.png" maw = {500} height = {270} width = {350} radius={"20px"}/>
          </Group>
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
      <Space h = "lg"/>
  </Container>
  )
}
function Goal(){
  const { classes } = useStyles();
  return(
    <Group>          
                <Table>
                  <thead>
                  <tr>
                    <th>
                      <Center><ConTitle>目標</ConTitle></Center>
                    </th>
                  </tr>
                  </thead>
                </Table>
                <Space h = "xl"/>
                <Stepper size="md" active={2} breakpoint="xl" orientation="vertical">
                  <Stepper.Step label="第一步"   description="制定目標"/>
                  <Stepper.Step label="第二步" description="創建團隊開發平台"/>
                  <Stepper.Step label = "第三步" description="提升Google seo排名" icon={      <RingProgress
        sections={[{ value: 45, color: 'blue' }]}
        label={
          <Text color="blue" weight={700} align="center" size="md">
            45%
          </Text>
        }
        size={50}
        thickness={3}
      />} />
                </Stepper>
                <Container>
                  <Image src="/img/footer/goal.png" maw = "200px" mah= "200px" className={classes.hiddenMobile}/>
                  <Image src="/img/footer/goal.png" maw = "150px" mah= "200px" className={classes.hiddenDesktop}/>
                </Container>
                <Space h= "lg"/>
                <Container>
                  <Goal2/>
                </Container>

    </Group>
  )
}
function Join_us(){
  const {classes} = useStyles();
  return(
    <Group>
      <Table>
        <thead>
          <tr>
            <th>
              <Center><ConTitle>加入我們</ConTitle></Center>
            </th>
          </tr>
        </thead>
      </Table>
      <Group>
        <Image src = "/img/footer_page/join_us.png" maw = "200px" mah= "200px" className={classes.hiddenMobile}/>
        <Image src = "/img/footer_page/join_us.png" maw = "150px" mah= "200px" className={classes.hiddenDesktop}/>
        <Container>
        <Center>
        <Text fz = "xl" fw = {700}>
          歡迎任何人加入
        </Text>
        </Center>
        <Text fz = "xl" fw = {700}>我們需要工程師,內容編輯,資訊搜尋等人才</Text>
        </Container>
      </Group>
    </Group>
    
  )
}
//<div className={styles.container}>

export default function Main() {
  const { classes } = useStyles();

  return (
    <Group>
      <div style = {{height:"100%"}} className={classes.hiddenMobile}>
        <Navbar height="100%"  width={{ base: 200 }} style={{position:"relative",top:"0px"}}>
          <TableOfContents/>
          <Space h = "lg"/>
          <Sub/>
        </Navbar>
      </div>
      <div style={{position:"relative",width : "1000px",height:"100%"}}>
      <Element name = "page" className="element" id = "page" style={{
        position: 'relative',
        height: '500px',
        width:'100%',
        overflowY:"scroll",
        marginBottom: '100px',

      }}>
                  <Element id = "about_us"name = "about_us"style={{
                     marginBottom: '100px'
                  }}>
                    <About_us/>
                  </Element>
                  <Element id = "goal" name = "goal"style={{
                    marginBottom: '100px'
                  }}>
                    <Goal/>
                  </Element>
                  <Element id = "join_us" name = "join_us" style = {{
                    marginBottom: "100px"
                  }}>
                    <Join_us/>
                  </Element>
        </Element>  
      </div>
    </Group>
  );
}
