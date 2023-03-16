import { Navbar ,Text} from "@nextui-org/react";

export default function Header(){
  return(
    <Navbar>
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">Simple Info</Text>
      </Navbar.Brand>

    </Navbar>
  );
}