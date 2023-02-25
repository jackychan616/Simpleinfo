import Link from "next/link";
import Image from "next/image";
function Body(){
    return(
        <div className=" d-flex   justify-content-center align-items-center" style={{backgroundColor : "rgb(56,60,68)",height : "150px"}}>
            <h1 className='display-5 'style={{color : "white"}}>Simple info</h1>
            <p style={{color : "white"}}> Keep it simple </p>
        </div>
    )
}   
export default function App(){
    return(
        <div>
            <Body/>
        </div>
    );  
}