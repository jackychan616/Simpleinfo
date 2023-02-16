import Link from "next/link";

export default function Nav(){
    return (
        <div className="nav">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul>
                    <li><Link href="/" className="navbar-brand">Home</Link></li>
                    <li><Link href="/content" className="navbar-brand">電腦</Link></li>
                </ul> 
            </nav>
        </div>
    ); 
}