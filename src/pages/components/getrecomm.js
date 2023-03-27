
const Bloglist = require('../../data/Blog.json');
export function Get(path){
    const R = new Array();
    for (const i in Bloglist) {
        if (Bloglist[i]['path'] == path ){
						console.log(Bloglist[i]["name"])
            var tag = Bloglist[i]["tag"];
            break;
        }
    }

    for (const j in Bloglist){
        if (Bloglist[j]["tag"] == tag){    
                R.push(Bloglist[j]);
        }
    }
		return R;
}

function Context(){
    return(
        <></>
    );
}
export default Context;