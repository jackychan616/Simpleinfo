import Nav from './nav';
import Navs from './newnav';
export default function Layout({children}){
    return (
        <>
            <Navs/>
            <main>{children}</main>
        </>
    );
}