import {Loader,Container,Center} from '@mantine/core';

export default function Loading() {
    return(
        
        <Container fluid={true}>
            <Loader color="indigo" size="xl" variant="bars" />
        </Container>
        
        
    );
}
  