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
     style={{display:"inline-block" ,maxWidth:"135px",maxHeight:"700px"}}
     data-ad-client="ca-pub-3459129696587268"
     data-ad-slot="3071205647"></ins>
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
export const recommend_blog_ads =() => {
  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, [])

  return(
  <>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4293438601126518"
     crossorigin="anonymous"></script>
  <ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-fc+1g-6h-ix+1mw"
     data-ad-client="ca-pub-4293438601126518"
     data-ad-slot="4947807756"></ins>
</>
)
}
export default function Page(){
  return(<></>);
}
