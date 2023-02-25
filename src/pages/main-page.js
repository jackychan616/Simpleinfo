import Link from "next/link";
function Body(){
    return(
        <div className=" d-flex   justify-content-center align-items-center" style={{backgroundColor : "#37BC9B",height : "150px"}} >
            <h1 className='display-5 ' >Simple info</h1>
            <p> Keep it simple </p>
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