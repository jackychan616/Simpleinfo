import React, { useEffect } from 'react'
export const Blogads = () => {
  useEffect(() => {
    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) { }
    }
}, []);
  return(
  <>
    <ins className="adsbygoogle"
      style={{display:"block", maxWidth:"500px" ,maxHeight:"500px"}}
      data-ad-format="fluid"
      data-ad-layout-key="-74+ex-1i-2r+ay"
      data-ad-client="ca-pub-3459129696587268"
      data-ad-slot="8411360296">
      </ins>  
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
