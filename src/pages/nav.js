import Link from "next/link";
import Image from "next/image";
<<<<<<< HEAD

export default function Nav(){
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
=======
import styles from './page.module.css'
export default function Nav(){
    return (
        <div className="nav">
            <nav className={styles.navs}>
>>>>>>> bb2138a18d7a3217f14ccae200f7d1de5f2df9ad
                <Link href="/"><Image src="/logo.png"  width="50" height="50" className="d-inline-block align-top"/></Link>
                <ul>
                    <li><Link href="/content" className="navbar-brand">電腦</Link></li>
                    <li><Link href="/content" className="navbar-brand">2</Link></li>
                </ul>
            </nav>
    ); 
}