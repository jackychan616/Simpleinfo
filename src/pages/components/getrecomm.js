
const Bloglist = require('../../data/Blog.json');
export function Get(path){
    const R = [];
    for (const i in Bloglist) {
        if (Bloglist[i]['path'] == path ){
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
export function Gettag(path){
    for (const i in Bloglist) {
        if (Bloglist[i]['path'] == path) {
            var tag = Bloglist[i]['tag'];
            break;
        }
    }
    return tag
}
export function Getblogdata(path){
    for (const i in Bloglist) {
        if (Bloglist[i]['path'] == path) {
            return Bloglist[i];
        }
    }
}
function Context(){
    return(
        <></>
    );
}
export default Context;