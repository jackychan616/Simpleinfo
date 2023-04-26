import React, { useEffect } from 'react'
export const Blogads = () => {
  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (<>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3459129696587268"
     crossOrigin="anonymous"></script>
   <ins className="adsbygoogle"
     style={{display:"inline-block" ,width:"320px",height:"50px"}}
     data-ad-client="ca-pub-3459129696587268"
     data-ad-slot="3071205647"></ins>
  </>
  )
}
export const GoogleAds = () => {
  return (<>
   <ins className="adsbygoogle"
     style={{display:"inline-block" ,width:"728px",height:"90px"}}
     data-ad-client="ca-pub-3459129696587268"
     data-ad-slot="3071205647"></ins>
  </>
    
  )
}

export default function Page(){
  return(<></>);
}
