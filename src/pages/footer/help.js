import { ZoomQuestion } from 'tabler-icons-react';
import { Container} from '@mantine/core';
function Iconhelp() {
  return <ZoomQuestion
    size={60}
    strokeWidth={2}
    color={'#000000'}
  />;
}

export default function Page(){
    return(
        <Container>
            <Iconhelp/>
        </Container>
    )
}