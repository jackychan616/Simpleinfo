import ConHeader from './header';
import { Text, Paper, Group ,Image, Box, TextInput} from '@mantine/core';
import { useState,useEffect } from 'react';
import Script from 'next/script'
function Down(){

    return(
    <div style = {{bottom:"0px"}}> 
        <Paper withBorder p="lg" radius="md" shadow="md" style = {{backgroundColor : "rgba(82,113,255,255)"}}>
        <Group position="apart" mb="xs">
            <Image src ="/img/simple_info.png" alt = "icon" width = "120px" height="150px"/>
            <Box position= "right" width = "500" height = "500">
                <TextInput label = "訂閱我們" placeholder = "電郵" style = {{color : "white"}}/>
            </Box>
        </Group>
        <Text color="White"  fw ={1500}>
            built by simple info team
        </Text>
        </Paper>
    </div>
    );
}
function Kofi(){
    return (
            <Script type='text/javascript' src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js' id="onload-id"
            onLoad={() => {
                kofiWidgetOverlay.draw('simpleinfo', {
                    'type': 'floating-chat',
                    'floating-chat.donateButton.text': '幫我買杯咖啡',
                    'floating-chat.donateButton.background-color': '#00b9fe',
                    'floating-chat.donateButton.text-color': '#fff'
                  });
            }}

        />
    );
}
export default function Layout({children}){
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1e3);
      }, []);
    return (
        <>
            {isLoading ? <></>: <ConHeader title="" />}
            <main>{children}</main>
            <Down/>
            <Kofi/>
        </>
    );
}