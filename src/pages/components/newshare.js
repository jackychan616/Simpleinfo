import { Menu, Button, Text } from '@mantine/core';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Share } from 'tabler-icons-react';
              

export function Sharebutton({children,url}) {
    return(
        <>
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Tooltip title="Share" >
                    <IconButton >
                        <Share color='primary'/ >
                    </IconButton>
                </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item component='a' onClick={() => {navigator.clipboard.writeText(url)}}>
                    複製鏈結
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
        {children}
        </>
        
    );
}