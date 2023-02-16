import Link from "next/link";
import Image from "next/image";
import styles from './page.module.css'
export default function Nav(){
    return (
        <div className="nav">
            <nav className={styles.navs}>
                <Link href="/"><Image src="/logo.png"  width="50" height="50" className="d-inline-block align-top"/></Link>
                <ul>
                    <li><Link href="/content" className="navbar-brand">電腦</Link></li>
                    <li><Link href="/content" className="navbar-brand">2</Link></li>
                </ul>
            </nav>
        </div>
    ); 
}