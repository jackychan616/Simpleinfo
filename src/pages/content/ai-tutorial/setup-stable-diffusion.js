import {
  Alert,
  Badge,
  Card,
  Code,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  List,
  Space,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconCircleCheck, IconInfoCircle } from '@tabler/icons-react';

const command = 'git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git';

function SectionTitle({ children }) {
  return <Title order={2} mt="xl" mb="sm">{children}</Title>;
}

export function ConPage() {
  return (
    <Container size="md" py="xl">
      <Stack spacing="md">
        <Grid align="center">
          <Grid.Col span={12} md={7}>
            <Stack spacing={6}>
              <Badge color="blue" variant="light">AI Tutorial</Badge>
              <Title order={1}>Stable Diffusion 本機部署指南（Windows）</Title>
              <Text color="dimmed">
                呢篇會用最實用方式，帶你由 0 到可用：安裝、啟動、放模型、第一次出圖。
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={12} md={5}>
            <Image src="/img/stable-diffusion.webp" alt="stable diffusion" radius="md" />
          </Grid.Col>
        </Grid>

        <Alert icon={<IconInfoCircle size={16} />} color="blue" radius="md">
          目標：15-30 分鐘內完成本機部署，並成功生成第一張圖。
        </Alert>

        <SectionTitle>前置條件</SectionTitle>
        <Card withBorder radius="md">
          <List
            spacing="sm"
            icon={
              <ThemeIcon color="teal" size={22} radius="xl">
                <IconCircleCheck size={14} />
              </ThemeIcon>
            }
          >
            <List.Item>安裝最新版 Python，並勾選加入 PATH</List.Item>
            <List.Item>安裝 Git</List.Item>
            <List.Item>建議顯卡 8GB VRAM 以上（入門可用，速度會慢啲）</List.Item>
          </List>
        </Card>

        <SectionTitle>步驟 1：下載 WebUI</SectionTitle>
        <Card withBorder radius="md">
          <Stack spacing="sm">
            <Text>喺你想安裝嘅資料夾，開 terminal / cmd，執行：</Text>
            <Code block>{command}</Code>
            <Text size="sm" color="dimmed">
              如果你習慣 .bat 方式都可以，但直接 terminal 會更簡潔、更少出錯。
            </Text>
          </Stack>
        </Card>

        <SectionTitle>步驟 2：首次啟動（自動安裝依賴）</SectionTitle>
        <Card withBorder radius="md">
          <Stack spacing="sm">
            <Text>進入 `stable-diffusion-webui` 資料夾，執行 `webui-user.bat`。</Text>
            <Image src="/img/setup-stable-diffusion/1.png" alt="step 1" radius="sm" />
            <Text size="sm" color="dimmed">首次啟動會安裝依賴，需等幾分鐘。</Text>
          </Stack>
        </Card>

        <SectionTitle>步驟 3：放入模型檔</SectionTitle>
        <Card withBorder radius="md">
          <Stack spacing="sm">
            <Text>
              將你的 `.ckpt` / `.safetensors` 模型放入：
              <Code>stable-diffusion-webui/models/Stable-diffusion</Code>
            </Text>
            <Image src="/img/setup-stable-diffusion/3.png" alt="model folder" radius="sm" />
            <Text size="sm" color="dimmed">模型檔請自行取得，本站不提供下載。</Text>
          </Stack>
        </Card>

        <SectionTitle>步驟 4：開 WebUI 開始出圖</SectionTitle>
        <Card withBorder radius="md">
          <Stack spacing="sm">
            <Text>再次執行 `webui-user.bat`，看到 `Running on local URL` 後，打開該網址即可。</Text>
            <Image src="/img/setup-stable-diffusion/4.png" alt="running" radius="sm" />
            <Image src="/img/setup-stable-diffusion/5.png" alt="web ui" radius="sm" />
          </Stack>
        </Card>

        <SectionTitle>核心參數（快速理解）</SectionTitle>
        <Card withBorder radius="md">
          <Stack spacing={6}>
            <Text><b>Prompt：</b>你想要的畫面描述，愈具體愈好。</Text>
            <Text><b>Negative prompt：</b>你唔想出現嘅元素。</Text>
            <Text><b>Sampler：</b>采樣方法，影響風格與細節。</Text>
            <Text><b>Steps：</b>步數，愈高通常愈慢。</Text>
            <Text><b>Width / Height：</b>圖片尺寸；超過顯存上限可能崩潰。</Text>
            <Text><b>Seed：</b>固定同一 seed 可重現相近結果，`-1` 為隨機。</Text>
          </Stack>
        </Card>

        <SectionTitle>參考配置（可直接試）</SectionTitle>
        <Card withBorder radius="md">
          <Stack spacing="sm">
            <Code block>
{`Prompt: epic view, fantasy, ice and fire
Negative prompt: blurry, watermark
Steps: 30
Sampler: Euler a
CFG scale: 7
Seed: 2002586862
Size: 1024x1024`}
            </Code>
            <Image src="/img/setup-stable-diffusion/6.png" alt="example image" maw={520} radius="sm" />
            <Text size="sm" color="dimmed">示例耗時約 11 秒（RTX 3060 Ti，實際視乎你 GPU）。</Text>
          </Stack>
        </Card>

        <Divider my="md" />
        <Text size="sm" color="dimmed">完成後你已可用本機 Stable Diffusion 生圖。下一步可學 LoRA / ControlNet 進階玩法。</Text>
      </Stack>
      <Space h="lg" />
    </Container>
  );
}

export default function Page() {
  return <ConPage />;
}

export const getStaticProps = async () => ({
  props: {
    openGraphData: [
      { name: 'description', content: '如何在 Windows 本機部署 Stable Diffusion，快速完成安裝並生成第一張 AI 圖像。' },
      { name: 'title', content: 'Stable Diffusion 本機部署指南（Windows）' },
      { property: 'og:image', content: 'https://simpleinfohk.me/img/stable-diffusion.webp' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:title', content: 'Stable Diffusion 本機部署指南（Windows）' },
      { property: 'og:description', content: '由安裝到第一張圖，一步步完成 Stable Diffusion 本機部署。' },
      { property: 'og:type', content: 'article' },
    ],
  },
});
