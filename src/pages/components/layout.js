import Header from './header';
import { Text, Paper, Group ,Image} from '@mantine/core';
function down(){

    return(

    <Paper withBorder p="lg" radius="md" shadow="md" style = {{backgroundColor : "rgba(82,113,255,255)"}}>
    <Group position="apart" mb="xs">
    <Image src ="img/simple_info.png" alt = "icon" width = "120px" height="150px"/>
    </Group>
    <Text color="dark" size="xs">
        built by simple info team
    </Text>
    </Paper>
    );
}
export default function Layout({children}){
    return (
        <>
            <div>
            <Header title=""/>
            <main>{children}</main>
            </div>
            {down()}
        </>
    );
}