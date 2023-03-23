import { Navbar, Text ,useTheme,Button ,changeTheme } from '@nextui-org/react';
import React from "react";
import {IconMoon,IconSunHigh} from '@tabler/icons-react';
export default function Header() {
  const {type, isDark} = useTheme();
  const handleChange = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    window.localStorage.setItem('data-theme', nextTheme); // you can use any storage
    changeTheme(nextTheme);
  };
  const DarkModeToggle =()=>(isDark ? <IconMoon /> :<IconSunHigh />);

  return(
    <Navbar isBordered variant="sticky">
      <Navbar.Brand>
        <Text>Simple Info</Text>
      </Navbar.Brand>
      <Navbar.Content activeColor='primary' variant="underline">
        <Navbar.Link href="/">首頁</Navbar.Link>
        <Navbar.Link href="/">文章</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button 
            size="xs"
            ghost
            onClick={handleChange}
            icon={<DarkModeToggle/>}
        />  
        </Navbar.Item>
        
      </Navbar.Content>
    </Navbar>
  );
}
