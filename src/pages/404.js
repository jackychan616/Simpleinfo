import Link from 'next/link';

function Notfound(){
    return(
        <div className="container">
            <h2 >不好意思!這裡沒有任何東西</h2>
            <Link href="/" ><a>回到首頁</a></Link>
        </div>
    );
}

export default Notfound;