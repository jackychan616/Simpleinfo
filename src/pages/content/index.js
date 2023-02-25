import Link from "next/link";



export default function Page(){
    return (
        <div className="container">
           <Link href="/content/linux-tutorial"><p>Linux 教學</p></Link>
        </div>
    );
}