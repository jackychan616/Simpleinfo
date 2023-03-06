import{ Page}  from '../../components/page_index';
import{ ArtiCard }from '../../components/card';
import Meta from '../../components/meta';

export default function ConPage(){
    return(
        <>
            <Meta/>
            <Page title={"玩具"} hTitle={"形形色色的玩具介紹"} img="https://unsplash.com/photos/LEPhZkQbUrk">
            </Page>
        </>
    );
}