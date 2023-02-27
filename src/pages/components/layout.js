import Nav from './nav';
import Navs from './newnav';
import  MyHeader  from './header';
export default function Layout({children}){
    return (
        <>
            <MyHeader/>
            <main>{children}</main>
        </>
    );
}