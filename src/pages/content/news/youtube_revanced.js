import { ConTitle, ConText } from '../../components/component';
import { Container, Image } from '@mantine/core';


export default function Page(){
    return(
        <Container>
            <ConTitle order = {3}>無廣告版youtube / youtube music </ConTitle>
            <ConTitle order = {1}>YouTube ReVanced APK & Vanced Music 下載&安裝教學</ConTitle>
            <ConText>Youtube ReVanced是一款在安卓系統上使用的youtube修改版，它提供了包括跳過廣告，背景播放等所有 youtube premium 有的功能。</ConText>
            <ConText>Youtube ReVanced跟 Youtube Vanced 不同。理論上用戶自行構建apk不會被禁止，因此應該不會像Youtube Vanced開發團隊被禁掉。</ConText>
            <ConText>安裝方法非常簡單, 只需幾個步驟。</ConText>
            <ConText><h1>Step1</h1></ConText>

        </Container>
    )
}