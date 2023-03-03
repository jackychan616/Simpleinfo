import { Menu, Button, Text } from '@mantine/core';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import dynamic from "next/dynamic"

export default function Sharebutton() {
    return(
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Tooltip title="Share" >
                    <IconButton >
                        <ShareIcon color='primary'/>
                    </IconButton>
                </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item component='a' onClick={() => {navigator.clipboard.writeText("idk")}}>
                    複製鏈結
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}