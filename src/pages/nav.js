import Link from "next/link";
import Image from "next/image";

export default function Nav(){
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link href="/" className="navbar-brand">
                    <Image src="/logo.png"  width="50" height="50" alt="" className="d-inline-block align-top"/>
                    <span className="h3 mx-1">Simple Info</span>
                </Link>

                <div classNAme="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item active">
                            <Link className="nav-link" href="/">首頁<span class="sr-only">(current)</span></Link>
                        </li>

                        <li class="nav-item">
                            <Link className="nav-link" href="/">最近更新</Link>
                        </li>
                        
                        <li class="nav-item">
                            <Link className="nav-link" href="/content"> 教學文章</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 更多</Link>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link className="dropdown-item" href="/">1</Link>
                                    <Link className="dropdown-item" href="/">2</Link>
                                </div>
                        </li>
                    </ul>
                </div>
            </nav>
    ); 
}