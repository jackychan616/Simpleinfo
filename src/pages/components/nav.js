import Link from "next/link";
import Image from "next/image";

export default function Nav(){
    return (    
            <nav className="  navbar navbar-expand-lg navbar-light bg-light">
                <Link href="/" className="navbar-brand">
                    <Image src="/logo.png"  height='30' width='30' alt=""/>
                    <span className="h3 mx-1">Simple Info</span>
                </Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item active">
                            <Link className="nav-link" href="/">首頁</Link>
                        </li>

                        <li class="nav-item">
                            <Link className="nav-link" href="/">最近更新</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" href="/content"> 教學文章</Link>
                        </li>
                        
                    </ul>
                </div>
            </nav>
    ); 
}