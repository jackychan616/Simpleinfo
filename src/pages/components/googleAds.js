import React, { useEffect } from 'react'
export const Blogads = () => {
  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, [])
  return(
  <>
    <ins class="adsbygoogle"
     style={{display:"block"}}
     data-ad-client="ca-pub-3459129696587268"
     data-ad-slot="8401458294"
     data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  </>
  )
}
export const GoogleAds = () => {
  return (<>
   <ins className="adsbygoogle"
     style={{display:"inline-block" ,maxWidth:"728px",maxHeight:"90px"}}
     data-ad-client="ca-pub-3459129696587268"
     data-ad-slot="3071205647"></ins>
  </>
    
  )
}

export default function Page(){
  return(<></>);
}
