import {Text,Title,Space} from '@mantine/core';
import { Prism } from '@mantine/prism';

export function ConText({children}){
  return (
    <>
    <Text fz="md" c="dark.3">{children}</Text>
    <Space h="sm"></Space>
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

export function ConTitle({children,order}){
  return(
    <>
      <Title order={order}
      >{children}</Title>
      <Space h="lg"></Space>
    </>
    
  );
}


