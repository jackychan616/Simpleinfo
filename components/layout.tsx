import Header from  "./header" ;
import {Box} from "./Box";
export default function Layout({children}){
    return(
    <Box
    css={{
      maxW: "100%"
    }}>
    <Header/>
    {children}
    
    </Box>

    );
}