import Link from "next/link";
import Image from "next/image";
export default function Nav(){
    return (
        <div className="nav">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link href="/"><Image src="logo.png"  width="300" height="200" className="d-inline-block align-top"/></Link>
                <ul>
                    <li></li>
                    <li><Link href="/" className="navbar-brand">Home</Link></li>
                    <li><Link href="/content" className="navbar-brand">電腦</Link></li>
                </ul>
            </nav>
        </div>
    ); 
}