import Link from "next/link";
import Image from "next/image";



export default function Page(){
    return (
        <div className="container">
            <div className="row">
                <div className="col container-lg content-container border border-primary">
                    <Link className="content-link" href="/content/linux-tutorial"><h4>Linux 教學</h4></Link>
                    <Image src="/img/linux.jpeg" width="341" height="256"></Image>

                </div>
            </div>
            <div className="row">
            <div className="col container-lg content-container border border-primary">
                    <Link className="content-link" href="/content/card-game/poker_21point_quick_talk"><h4>桌遊</h4></Link>
                    <Image src="/img/poker.jpg" width="341" height="226"></Image>
            </div>
            </div>

            <div className="row">
                <div className="col container-lg content-container border border-primary">
                    <Link href="/content/python-tutorial" className="content-link"><h4>Python 教學</h4></Link>
                    <Image src="/img/python.png" width="314" height="150"></Image>
                </div>  
            </div>
            
                
           
        </div>
    );
}