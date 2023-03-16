import { Navbar ,Text} from "@nextui-org/react";

export default function Header(){
  return(
    <Navbar isBordered variant="sticky">
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">Simple Info</Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="/">首頁</Navbar.Link>
        <Navbar.Link href="/">文章</Navbar.Link>
      </Navbar.Content>
    </Navbar>
  );
}