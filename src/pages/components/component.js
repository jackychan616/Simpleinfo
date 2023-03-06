import {Text,Title,Space,List, ThemeIcon} from '@mantine/core';
import { Prism } from '@mantine/prism';

export function ConText({children,h1,h2}){
  return (
    <>
      <Space h={h1 ? h1: "sm"}/>
      <Text fz="lg" c="dark.3">{children}</Text>
      <Space h={h2 ? 2: "sm"}></Space>
    </>
    
  );
}

export function OutputText({children}){
  return (
    <Text fz="xs" c="gray">{children}</Text>
  );
}


export function PyPrism({children}){
  return (
    <Prism language='python'>
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