import { Navbar, Text } from '@nextui-org/react';

export default function Header() {
  return (
    <Navbar variant="sticky">
      <Navbar.Brand>
        <Text>Simple Info</Text>
      </Navbar.Brand>
      <Navbar.Content variant="underline">
        <Navbar.Link href="/">首頁</Navbar.Link>
        <Navbar.Link href="/">文章</Navbar.Link>
      </Navbar.Content>
    </Navbar>
  );
}
