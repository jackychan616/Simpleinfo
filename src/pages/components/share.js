import { Menu ,Button ,MantineProvider } from '@mantine/core';
import { Share ,Copy,BrandFacebook} from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
export function Sharebutton({url}) {
    return(
    <>
        <Menu shadow="md" width={200} position="right-end">
            <Menu.Target>
                <Button
                leftIcon = {<Share/>}
                compact
                fullWidth variant="outline"
                >分享</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item 
                component='a' 
                onClick={() => {navigator.clipboard.writeText(url);
                    showNotification({
                    message: 'Copied',
                    icon: <IconCheck />,

                })}}
                icon = {<Copy/>}
                >
                    複製鏈結
                </Menu.Item>
                <Menu.Item
                icon = {<BrandFacebook/>}
                component='a'
                href={'https://www.facebook.com/sharer/sharer.php?u=https://simpleinfohk.me' + url}
                target = "_blank"
                >
                    分享至facebook
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    </>
    );
}

function Context(){
  return (
    <>
    </>
  );
}
export default Context;