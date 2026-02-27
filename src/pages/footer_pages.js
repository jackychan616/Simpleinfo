import {
  Avatar,
  Blockquote,
  Center,
  Container,
  Group,
  Image,
  Navbar,
  RingProgress,
  Space,
  Stepper,
  Table,
  Text,
  createStyles,
} from '@mantine/core';
import { ConTitle } from './components/component';
import { TableOfContents } from './components/leftbar/table';
import { Sub } from './components/leftbar/sub';
import { Goal2 } from './components/goal';

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: { display: 'none' },
  },
  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: { display: 'none' },
  },
  pageWrap: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing.lg,
    width: '100%',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  section: {
    marginBottom: 72,
  },
}));

export function AboutUsSection() {
  return (
    <Container>
      <Center>
        <ConTitle order={1}>關於我們</ConTitle>
      </Center>

      <Group position="center" mt="md">
        <Text fw={700} fz="xl" variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
          由一群熱愛開發的人
        </Text>
        <Text fw={700} fz="xl" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 45 }}>
          共同打造全新的資訊平台
        </Text>
      </Group>

      <Group position="center">
        <Text fw={550} fz="xl" variant="gradient" gradient={{ from: 'green', to: 'yellow', deg: 45 }}>
          精心策劃的平台內容
        </Text>
        <Text fw={700} fz="xl" variant="gradient" gradient={{ from: 'magenta', to: 'violet', deg: 45 }}>
          發現最新的新興趨勢
        </Text>
      </Group>

      <Space h="xl" />
      <Center>
        <ConTitle order={2}>追求穩定，內容豐富</ConTitle>
      </Center>
      <Space h="xl" />

      <Group position="right" align="center">
        <Image src="/img/footer_page/footer_page_2.png" alt="Simpleinfo 團隊理念配圖" maw={500} height={270} width={350} radius="20px" />
        <Blockquote cite="Simpleinfo 開發團隊" icon={<Avatar src="/img/simple_info.png" alt="simpleinfo" radius="xl" />}>
          我們的理念是從無到有，塑造一個開源的資訊性平台。
        </Blockquote>
      </Group>

      <Space h="lg" />

      <Group position="right">
        <Blockquote cite="Simpleinfo 網站工程師 Jacky Chan">以目標為結果。</Blockquote>
      </Group>
      <Group>
        <Blockquote cite="Simpleinfo 策劃師 GC">為學日益，是我學到的。</Blockquote>
      </Group>

      <Group position="center">
        <Image src="/img/footer_page/footer_page_1.png" alt="Simpleinfo 團隊插圖" maw={500} height={200} width={275} radius="15px" />
      </Group>
    </Container>
  );
}

function GoalSection() {
  const { classes } = useStyles();
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>
              <Center>
                <ConTitle>目標</ConTitle>
              </Center>
            </th>
          </tr>
        </thead>
      </Table>

      <Space h="xl" />
      <Stepper size="md" active={2} breakpoint="xl" orientation="vertical">
        <Stepper.Step label="第一步" description="制定目標" />
        <Stepper.Step label="第二步" description="創建團隊開發平台" />
        <Stepper.Step
          label="第三步"
          description="提升 Google SEO 排名"
          icon={
            <RingProgress
              sections={[{ value: 45, color: 'blue' }]}
              label={
                <Text color="blue" weight={700} align="center" size="md">
                  45%
                </Text>
              }
              size={50}
              thickness={3}
            />
          }
        />
      </Stepper>

      <Space h="lg" />
      <Center>
        <Image src="/img/footer/goal.png" alt="網站目標進度圖" maw="200px" mah="200px" className={classes.hiddenMobile} />
        <Image src="/img/footer/goal.png" alt="網站目標進度圖" maw="150px" mah="200px" className={classes.hiddenDesktop} />
      </Center>

      <Space h="lg" />
      <Goal2 />
    </Container>
  );
}

function JoinUsSection() {
  const { classes } = useStyles();
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>
              <Center>
                <ConTitle>加入我們</ConTitle>
              </Center>
            </th>
          </tr>
        </thead>
      </Table>

      <Group mt="md" align="center">
        <Image src="/img/footer_page/join_us.png" alt="加入我們插圖" maw="200px" mah="200px" className={classes.hiddenMobile} />
        <Image src="/img/footer_page/join_us.png" alt="加入我們插圖" maw="150px" mah="200px" className={classes.hiddenDesktop} />
        <Container>
          <Center>
            <Text fz="xl" fw={700}>
              歡迎任何人加入
            </Text>
          </Center>
          <Text fz="xl" fw={700}>
            我們需要工程師、內容編輯、資訊搜尋等人才
          </Text>
        </Container>
      </Group>
    </Container>
  );
}

export default function FooterPagesMain() {
  const { classes } = useStyles();

  return (
    <div className={classes.pageWrap}>
      <div className={classes.hiddenMobile}>
        <Navbar width={{ base: 220 }} style={{ position: 'sticky', top: 88 }}>
          <TableOfContents />
          <Space h="lg" />
          <Sub />
        </Navbar>
      </div>

      <main className={classes.content}>
        <section id="about_us" className={classes.section}>
          <AboutUsSection />
        </section>
        <section id="goal" className={classes.section}>
          <GoalSection />
        </section>
        <section id="join_us" className={classes.section}>
          <JoinUsSection />
        </section>
      </main>
    </div>
  );
}
