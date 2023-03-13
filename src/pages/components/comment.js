import {DiscussionEmbed} from "disqus-react"
  
export function  Comments(page,title){
  const disqusShortname = "simpleinfo"
  const url = "https://simpleinfo.live"
  const disqusConfig = {
    url: url.concat(page),
    identifier:'123', 
    title: title
  }
  
  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}

function Context(){
    return (
      <>
      </>
    );
  }
  export default Context;