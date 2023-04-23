
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
            if (Bloglist[j]["path"] != path){
                R.push(Bloglist[j]);
            }
        }
    }
    if (R.length < 2){
        for (let i = 0; i<3; i++){
            R.push(Bloglist[Math.floor(Math.random() * Bloglist.length)])
        }
    }
	return R;
}
export function Gettag(path){
    var tag = "";
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
export function Gethottopicimg(name,tag){
    const R =[];
    for(const i in Bloglist){
        if (Bloglist[i]["tag"] == name || Bloglist[i]["tag"] == tag){
            R.push(Bloglist[i]["img"]);
        }
    }
    return R.slice(-1)[0] 
}
export function Getblogbytag(tag,name){
    const R = [];
    for (const i in Bloglist) {
        if (Bloglist[i]['tag'] == tag){
            R.push(Bloglist[i]);
        }
        if (Bloglist[i]['tag'] == name){
            R.push(Bloglist[i])
        }
    }
    return R;
}
export function Getblogint(path){
    for (const i in Bloglist) {
        if (Bloglist[i]["path"] == path){
            return i
        }
    }
}
function Context(){
    return(
        <></>
    );
}
export default Context;