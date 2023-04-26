import React, { useEffect } from 'react'

export const GoogleAds = () => {
  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
   <ins className="adsbygoogle"
     style={{display:"inline-block" ,maxWidth:"728px",maxHeight:"90px"}}
     data-ad-client="ca-pub-3459129696587268"
     data-ad-slot="3071205647"></ins>
  )
}

export default function Page(){
  return(<></>);
}
