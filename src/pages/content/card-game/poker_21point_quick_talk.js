import Head from 'next/head'
import Script from 'next/script';
const title = '[porker 撲克牌] 二十一點玩法教學 ';



function page(){
    return(
    <>  
    <Head>
        <title>{title}</title>
        <meta name="description" content={title}></meta>
        <meta property='og:title' content={title}></meta>
        <meta property='og:description' content={title}></meta>
        <meta property='og:url' content=''></meta>
        <meta name="keywords" content="啤牌,樸克牌,21點,二十一點,桌遊,教學,親子,聯誼,香港,臺灣,大學"></meta>
    </Head>
        <h1>{title}</h1>
        
        <h3>流程</h3>
        
        <div className='page_container'>
            <div className='container'>
                <p>洗牌</p>
                <p>向各玩家分別派發一張牌</p>
                <p>如果莊家明牌是A、荷官會詢問玩家是否購買保險</p>
                <p>玩家可進行加注、投降、分牌等動作</p>
                <p>莊家逐位詢問玩家是否加牌、直至閒家不加牌才詢問下一位玩家，輪流詢問玩家直至最後一位玩家加牌完成</p>
                <p>莊家如不足17點便需加牌直至超過或等於17點</p>
                <p>對未有爆二十一點的玩家，比點數大小，大者勝，可得賠金</p>
                <p>回收已使用的牌及給小費</p>
            </div>
            

            <div className='container '>
                <h3>玩法</h3>

                <div className='container'>
                    <p>擁有最高點數的玩家獲勝,其點數必須等於或低於21點,2點至10點的牌以牌面的點數計算,J、Q、K 每張為10點。A可記為1點或11點,</p>
                    <p>若玩家會因A而爆二十一點則A可算為1點。通常每次以四至六副撲克牌遊玩,直至玩剩一副或一半為止,再重新洗牌</p>
                </div>
            </div>
            

            <h2>特別規例</h2>

            <div className='container'>
                <h4>保險</h4>
                <p>當莊家面牌是A,閒家可以注碼的一半選擇是否購買保險,以賭莊家的首二張牌總和會不會是21點,如莊家不是21點會立即沒收保險金,若是21點便可獲得保險金額的2倍賠償。</p>
            </div>
            
            <div className='container'>
                <p>若閒家首兩張牌點數之和為11點,可以選擇加倍投注,但加注後僅獲發1張牌。</p>
            </div>
            <h4>雙倍下注</h4>

            <div className='container' >
                <h4>分牌</h4>
                <p>若閒家首兩張牌點數相同,可以選擇分牌,並須加注。分出每門的下注金額須與原注相同。若閒家打兩張A分開,則每張A只獲發1張牌,不可再要牌。有些分牌後不可再分牌</p>                 
            </div>

            <div className='container '>
                <h4>對子</h4>
                <p>在投注區上的區位,在投注同時可以放對子區,按順方向派發,如果開牌出現相同號碼,可有5倍中,若是同花對子,則30倍中</p>
                        
            </div>

            <div className='container '>
                <h4>「二十一點」Black Jack</h4>
                <p>如果閒家手中的一張暗牌和一張明牌等於21點,這副牌叫做二十一莊家須向該閒家賠上1.5倍（或1.2倍）注碼。</p>        
            </div>
    
            <div className='container v'>
                <h4>五龍（過五關）</h4>
                <p>如果要牌直至手上有5張牌而又沒有爆21點,對面如果為21點 則平手 反之則陪對方3倍</p>
            </div>

            <div className='container'>
                <h4>平手</h4>
                <p>若莊家和眾閒家要以點數決勝,若該閒家和莊家手上所擁有的牌的總點數一樣或Black Jack的話,算平手,閒家可拿回原賭注。</p>

            </div>

            <div className='container'>
                <h4>投降</h4>
                <p>在所有閒家未要牌之前閒家可選擇投降，並取回一半注碼，俗稱投降輸一半</p>   
            </div>
        </div>    

    </>
    
    );
}

export default () =>(
    <>
        <page/>
    </>
);
