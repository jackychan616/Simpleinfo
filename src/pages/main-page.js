import Nav from './nav';

function Body(){
    return(
        <div>
            <h1 className='display-5'>這是一個普通的資訊性網站</h1>
            
        </div>
    )
}

export default function App(){
    return(
        <div>
            <Nav/>
            <Body/>
        </div>
    );
}