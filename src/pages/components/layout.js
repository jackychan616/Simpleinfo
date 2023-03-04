import Header from './header';
import { Text, Paper, Group ,Image, Box, TextInput} from '@mantine/core';


function Down(){

    return(

    <Paper withBorder p="lg" radius="md" shadow="md" style = {{backgroundColor : "rgba(82,113,255,255)"}}>
        <Group position="apart" mb="xs">
            <Image src ="/img/simple_info.png" alt = "icon" width = "120px" height="150px"/>
            <Box position= "right" width = "500" height = "500">
                <TextInput label = "Your gmail" placeholder = "電郵" style = {{color : "white"}}/>
            </Box>
        </Group>
        <Text color="White"  fw ={1500}>
            built by simple info team
        </Text>
    </Paper>
    );
}
export default function Layout({children}){
    return (
        <>
            <Header title=""/>
            <main>{children}</main>
            <Down/>
        </>
    );
}