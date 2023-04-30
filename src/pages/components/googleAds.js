import React, { useEffect } from 'react'
export const Blogads = () => {
  return(
  <>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3459129696587268"
  crossorigin="anonymous"></script>
  <ins class="adsbygoogle"
    style="display:block"
    data-ad-format="fluid"
    data-ad-layout-key="-74+ex-1i-2r+ay"
    data-ad-client="ca-pub-3459129696587268"
    data-ad-slot="8411360296"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
  </>)
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
