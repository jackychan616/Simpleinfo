import React, { useEffect } from 'react';
import {Adsense} from '@ctrl/react-adsense';

export const Blogads = () => {
  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, [])
  return(
    <Adsense
     style={{display:"block"}}
     client="ca-pub-3459129696587268"
     slot="8401458294"
     layout="in-article"
     format="fluid"/>
  )
}
export const recommend_ads = () => {
  return(
    <>
      <Adsense
        style = {{display:"block"}}
        client = "ca-pub-3459129696587268"
        slot = "9908328699"
        layout = "in-article"
        format = "fluid"
      />
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
