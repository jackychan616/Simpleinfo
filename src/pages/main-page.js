
function Body(){
    return(
        <div className=" d-flex   justify-content-center align-items-center">

            <h1 className='display-5 '>這是一個普通的資訊性網站</h1>

            <div className='container'>
                <p>
                    container1
                </p>
            </div>

            <div className='container'>
                <p>
                    container2
                </p>
            </div>

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