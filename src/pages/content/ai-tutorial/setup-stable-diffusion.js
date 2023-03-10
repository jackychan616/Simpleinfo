import Head from 'next/head';
import {Code, Container,List,ThemeIcon,Image,Space, Grid} from '@mantine/core';
import { ConTitle,ConText} from '../../components/component';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import { Sharebutton } from 'src/pages/components/newshare';
import Meta from '../../components/meta';

export function ConPage(){
    return(
        <>
            <Container>
                <Grid >
                    <Grid.Col span="auto">
                        <ConTitle order={1}>部署Stable Diffusion</ConTitle>
                        
                    </Grid.Col>
                    <Grid.Col span='auto'> 
                        <Image src="/img/stable-diffusion.webp" alt="main Image" />
                    </Grid.Col>
                </Grid>
                <ConTitle order={2}>前置條件</ConTitle>
                <List spacing="xs"
                        size="sm"
                        icon={
                            <ThemeIcon color="teal" size={24} radius="xl">
                              <IconCircleCheck size="1rem" />
                            </ThemeIcon>}
                        >
                    <List.Item>安裝<kbd>python</kbd>最新版，確保添加至“PATH”路徑</List.Item>
                    <List.Item>安裝git</List.Item>

                </List>
                
                <ConTitle order={2}>正文</ConTitle>
                <ConText >在心儀的路徑下添加新的文件夾</ConText>
                <ConText >在路徑下創建一個新的txt檔</ConText>
                <ConText >複製以下命令，並添加至txt檔内，保存：</ConText>
                <Code display="block" style={{color:"primary"}}><ConText>git clone <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui.git">https://github.com/AUTOMATIC1111/stable-diffusion-webui.git</a></ConText></Code>
                <ConText>重命名txt檔，確保名稱不包含除英文外的字符，同時將.txt後綴改爲.bat</ConText>
                <Image src="/img/setup-stable-diffusion/1.png" alt="Image 1"/>
                <ConText>運行bat檔，一個名爲stable-diffusion-webui的文件將會被創建，他將包含以下内容：</ConText>
                <Space h="lg"></Space>
                <Image src="/img/setup-stable-diffusion/2.png" alt="Image 2" height={429} width={293}/>
                <Space h="lg"></Space>
                <ConText>將你手上的ckpt檔案添加至stable-diffusion-webui\models\Stable-diffusion，直接粘貼即可，以下爲完成后的樣子
（請自行獲取ckpt檔，本站暫不提供）</ConText>
<Space h="lg"></Space>
<Image src="/img/setup-stable-diffusion/3.png" alt="Image 3"/>
<Space h="lg"></Space>
                <ConText>運行stable-diffusion-webui路徑下的webui-user.bat。 
	若一切順利，你將獲得以下結果</ConText>
                <Image src="/img/setup-stable-diffusion/4.png" alt="Image 4"/>
                <Space h="lg"></Space>
                <ConText>訪問最後一行的 Running on local URL: 后的地址，你便可以開始隨心所欲的使用你自己搭建的Stable Diffusion站了。
稍後可能會有關於Error的解決方式以及使用教程，祝君好運。
</ConText>  
            </Container>
        </>
    );
}

export default function page(){
    return(
        <>
            <Meta description={"如何在Windows部署AI畫圖, 使用Python在電腦搭建Stable diffusion"} pageTitle={"如何在Windows部署AI畫圖"} />
            <ConPage/>
        </>
    );
}