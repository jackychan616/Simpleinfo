import { Menu, Button, Text, Image } from '@mantine/core';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import dynamic from "next/dynamic"


export function Sharebutton({children,url}) {
    return(
        <>
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Tooltip title="Share" >
                    <IconButton >
                        <ShareIcon color='primary'/ >
                    </IconButton>
                </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item component='a' onClick={() => {navigator.clipboard.writeText(url)}}>
                    複製鏈結
                </Menu.Item>
                <Menu.Item scr = "/img/facebook.png">
                    Share to facebook
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
        {children}
        </>
        
    );
}