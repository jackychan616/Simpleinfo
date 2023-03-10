import {Text,Title,Space} from '@mantine/core';
import { Prism } from '@mantine/prism';

export function ConText({children,h1,h2}){
  return (
    <>
      <Space h={h1 ? h1: "sm"}/>
      <Text fz="lg" >{children}</Text>
      <Space h={h2 ? h2: "sm"}/>
    </>
    
  );
}

export function OutputText({children}){
  return (
    <Text fz="xs" >{children}</Text>
  );
}


export function PyPrism({children}){
  return (
    <Prism language='python' colorScheme="dark">
      {children}
    </Prism>
  );
} 

export function ConTitle({children,order,h1,h2}){
  return(
    <>
      <Space h={h1 ? h1: "sm"}></Space>
      <Title order={order}
      >{children}</Title>
      <Space h={h2 ? h2: "sm"}></Space>
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