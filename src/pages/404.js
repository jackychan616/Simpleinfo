import Link from 'next/link';

function Notfound(){
    return(
        <div className="container">
            <h2 >不好意思!這裡沒有任何東西</h2>
            <Link href="/">回到首頁</Link>
        </div>
    );
}

export default Notfound;