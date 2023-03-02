import {Text,Title,} from '@mantine/core';
import { Prism } from '@mantine/prism';

export function ConText({children}){
  return (
    <Text fz="lg" c="dark.3">{children}</Text>
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


