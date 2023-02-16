import Link from "next/link";

function Nav(){
    return (
        <div className="nav">
           <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/content">電腦</Link></li>
            </ul> 
        </div>
    ); 
}