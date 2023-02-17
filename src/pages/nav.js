import Link from "next/link";
import Image from "next/image";

export default function Nav(){
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link href="/"><Image src="/logo.png"  width="50" height="50" className="d-inline-block align-top"/></Link>
                <ul>
                    <li><Link href="/content" className="navbar-brand">電腦</Link></li>
                </ul>
            </nav>
    ); 
}