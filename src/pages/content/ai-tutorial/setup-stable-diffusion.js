import {
  Code,
  Container,
  List,
  ThemeIcon,
  Image,
  Space,
  Grid,
  Badge
} from '@mantine/core';
import { ConTitle, ConText } from '../../components/component';
import { IconCircleCheck } from '@tabler/icons-react';
export function ConPage() {
  return (
    <>
      <Container>
        <Grid>
          <Grid.Col span="auto">
            <ConTitle order={1}>部署Stable Diffusion</ConTitle>
          </Grid.Col>
          <Grid.Col span="auto">
            <Image src="/img/stable-diffusion.webp" alt="main Image" />
          </Grid.Col>
        </Grid>
        <ConTitle order={2}>前置條件</ConTitle>
        <List
          spacing="xs"
          size="sm"
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
        >
          <List.Item>
            安裝<kbd>python</kbd>最新版，確保添加至“PATH”路徑
          </List.Item>
          <List.Item>安裝git</List.Item>
        </List>

        <ConTitle order={2}>正文</ConTitle>
        <ConText>在心儀的路徑下添加新的文件夾</ConText>
        <ConText>在路徑下創建一個新的txt檔</ConText>
        <ConText>複製以下命令，並添加至txt檔内，保存：</ConText>
        <Code display="block" style={{ color: 'primary' }}>
          <ConText>
            git clone{' '}
            <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui.git">
              https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
            </a>
          </ConText>
        </Code>
        <ConText>
          重命名txt檔，確保名稱不包含除英文外的字符，同時將.txt後綴改爲.bat
        </ConText>
        <Image src="/img/setup-stable-diffusion/1.png" alt="Image 1" />
        <ConText>
          運行bat檔，一個名爲stable-diffusion-webui的文件將會被創建，他將包含以下内容：
        </ConText>
        <Space h="lg"></Space>
        <Image
          src="/img/setup-stable-diffusion/2.png"
          alt="Image 2"
          height={429}
          width={293}
        />
        <Space h="lg"></Space>
        <ConText>
          將你手上的ckpt檔案添加至stable-diffusion-webui\models\Stable-diffusion，直接粘貼即可，以下爲完成后的樣子
          （請自行獲取ckpt檔，本站暫不提供）
        </ConText>
        <Space h="lg"></Space>
        <Image src="/img/setup-stable-diffusion/3.png" alt="Image 3" />
        <Space h="lg"></Space>
        <ConText>
          運行stable-diffusion-webui路徑下的webui-user.bat。
          若一切順利，你將獲得以下結果
        </ConText>
        <Image src="/img/setup-stable-diffusion/4.png" alt="Image 4" />
        <Space h="lg"></Space>
        <ConText>
          訪問最後一行的 Running on local URL:
          后的地址，你便可以開始隨心所欲的使用你自己搭建的Stable Diffusion站了。
        </ConText>
        <Image src="/img/setup-stable-diffusion/5.png"  maw = {500} alt="stable diffusion setup" />
        <ConText>
          Prompt：輸入Tag，將會影響圖片風格
        </ConText>
        <ConText>
          例子：Highest picture quality, Master's work，colorful, looking at viewer, expressionless, pale skin, blue eyes
        </ConText>
        <ConText>
          Negative prompt: 輸入Tag，但是圖片將避免包含所提及的風格
        </ConText>
        <ConText>
          例子extra fingers, fewer fingers，bad anatomy，inaccurate limb
        </ConText>
        <ConText>
          Sample method：采樣方式，不同的方式將直接影響圖片風格，取自己偏好即可
        </ConText>
        <ConText>
          Sample steps：采樣步驟數，將對圖片生成時間產生影響，數字越高 時間越久
        </ConText>
        <ConText>
          Width，Height：圖片的長、寬（以像素為單位）；顯卡顯存大小將決定其最高數字，超過上限時，網頁將會崩潰，8GB顯存上限約爲1024*1024。
        </ConText>
        <ConText>
        Seed：種子，不同種子將有不同結果，但相同的種子將導向同一結果，-1為隨機種子。
        </ConText>
        <ConText>
        配置各參數后， 點擊右上角Generate即可開始生成。
        </ConText>
        <Image src = "/img/setup-stable-diffusion/6.png" maw = "500px" caption="以下爲生成例子（耗時以RTX3060Ti 為基準，其時長將與你的GPU性能挂鈎)" alt = "emaple of stable diffusion"/>
        <ConText>
        Prompt: epic view, fantasy, ice and fire
        Negative prompt: blurry, watermark
        Steps: 30, Sampler: Euler a, CFG scale: 7, Seed: 2002586862, Size: 1024x1024, Model hash: 14749efc0a, Model: sd-v1-4-full-ema
        耗時11秒

        </ConText>
      </Container>
    </>
  );
}

export default function Page() {
  return (
    <>
      <ConPage />
    </>
  );
}
export const getStaticProps = async () => {
  return {
    props: {
      openGraphData: [
        {
          name:'description',
          content:'如何在Windows部署AI畫圖, 使用Python在電腦搭建Stable diffusion'

        },
        {
          name:'title',
          content:'如何在Windows部署AI畫圖'
        },
        {
          property: "og:image",
          content:
            "https://simpleinfohk.me/img/stable-diffusion.webp",
        },
        {
          property: "og:image:width",
          content: "300",
        },
        {
          property: "og:image:height",
          content: "200",
        },
        {
          property: "og:title",
          content: "如何在Windows部署AI畫圖",
        },
        {
          property: "og:description",
          content: "如何在Windows部署AI畫圖, 使用Python在電腦搭建Stable diffusion",
        },
        {
          property: "og:type",
          content: "website",
        },
      ],
    },
  };
};
