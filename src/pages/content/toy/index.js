import{ Page}  from '../../components/page_index';
import{ ArtiCard }from '../../components/card';
import Meta from '../../components/meta';

const BlogData=[
    {name:"RG 1/144系列必入手的商品",path:"/toy/5-gundam",img:"/img/5-gundam/1.jpg" ,date:"6/3/2023"}
]

export default function ConPage(){
    return(
        <>
            <Meta/>
                <Page title={"玩具"} hTitle={"形形色色的玩具介紹"} img="/img/toy.jpg" >
            </Page>
        </>
    );
}