import Link from "next/link";
import { navLinks } from "../source/data";
function Nav(){
    return (
        <div className="nav">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
           <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/content">電腦</Link></li>
            </ul> 
        </div>
    ); 
}