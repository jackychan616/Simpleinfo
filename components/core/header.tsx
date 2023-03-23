import { Navbar, Text ,useTheme,Button } from '@nextui-org/react';
import React from "react";
import {IconMoon,IconSunHigh} from '@tabler/icons-react';
export default function Header() {
  const isDark = useTheme();
  const [activeColor, setActiveColor] = React.useState("primary");
  return (
    <Navbar isBordered={isDark} variant="sticky">
      <Navbar.Brand>
        <Text>Simple Info</Text>
      </Navbar.Brand>
      <Navbar.Content activeColor={activeColor} variant="underline">
        <Navbar.Link href="/">首頁</Navbar.Link>
        <Navbar.Link href="/">文章</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Button 
        color={isDark? 'yel     low':'primary'}
                icon={isDark ?<IconMoon/> :<IconSunHigh/>}
        />
      </Navbar.Content>
    </Navbar>
  );
}
