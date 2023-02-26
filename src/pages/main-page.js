import Link from "next/link";
import Image from "next/image";
function Body(){
    return(
        <>
            <div className=" d-flex   justify-content-center align-items-center" style={{backgroundColor : "rgb(56,60,68)",height : "150px"}}>
                <h1 className='display-5 'style={{color : "white"}}>Simple info</h1>
                <p style={{color : "white"}}> Keep it simple </p>
                
                
            </div>
            <div  align="center">
                <h3 >快速探索</h3>
                <div className="row">
                    <div className="col">
                        <Link href="/content/linux-tutorial" passHref><button class>Linux 教學</button></Link>
                        <Link href="/content/python-tutorial"><button>Python 教學</button></Link>
                    </div>
                    
                </div>
            </div>
        </>
        
    )
}   
export default function App(){
    return(
        <div>
            <Body/>
        </div>
    );  
}