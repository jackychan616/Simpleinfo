import React, { useEffect } from 'react'

const GoogleAds = () => {
  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
   <ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-3459129696587268"
     data-ad-slot="3071205647"></ins>
  )
}

export default GoogleAds
