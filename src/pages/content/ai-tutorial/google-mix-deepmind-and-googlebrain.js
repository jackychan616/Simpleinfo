import { ConText, ConTitle } from '../../components/component';
import { Container, Image, Space , Blockquote,Text,Divider} from '@mantine/core';
function Page(){
    return(
    <Container>          
        <ConTitle order={1} size="h1">Google宣布將會合拼燈DeepMind 和 Google Brain</ConTitle>    
        <Image src="/img/googlebrain-mix-deepmind/google-deepmind.webp" alt="Google deepMind" caption="Google DeepMind"/>
        <ConText>Google 母公司 Alphabet把DeepMind 和 Google Brain的內部研究團隊合拼，此舉使兩個專注於人智能的團隊在人工智能之爭白熱化時更加緊密地聯系在一起。 </ConText>      
         
        <ConTitle order={2} size="h2">DeepMind</ConTitle>
        <ConText>Google在2014年以5億美元的價格收購了DeepMind，直到目前為止，它一直作為一個獨立的部門在英國營運。</ConText>
        <ConText>2016 年，DeepMind 首次成功研發出 AlphaGo，擊敗了韓國圍棋冠軍李世石。此後 DeepMind 推出了 AlphaGo Zero、AlphaZero 等 AI 程序，成功在圍棋、將棋、國際象棋等遊戲中取得超越人類的表現。</ConText>
        <ConText>DeepMind 還在代碼生成、基因預測等領域取得成就。2022 年，他們發布了基於 Transformer 的新模型 AlphaCode，實現了大規模代碼生成。</ConText>
        <Space h="xl"/>
        <Divider size="sm"/>
        <Space h="xl"/>
        <ConText>新部門的 CEO將會由DeepMind的 CEO Demis Hassabis擔任，Google brain 的領導人 Jeff Dean 則將擔任 Google Research 和 Google DeepMind 的首席科學家。Google CEO Sundar Pichai 表示這一整合將為人工智能方面的進展提供巨大的計算資源支持。</ConText>        
        <ConTitle order={2} size="h2">Google宣布GoogleDeepMind成立</ConTitle>
        <Blockquote color="blue" >
            Google DeepMind首席執行官Demis Hassabis與員工分享的內容摘要
        </Blockquote>
        <Text color='blue' size="lg">
        當謝恩-萊格和我在2010年推出DeepMind時，許多人認為通用人工智能是一種牽強的科幻技術，離成為現實還有幾十年的時間。
        </Text>
        <Space h="xl"/>
        <Text color='blue' size="lg">現在，我們生活在一個人工智能研究和技術正在飛速發展的時代。在未來幾年，人工智能--以及最終的AGI--有可能推動歷史上最偉大的社會、經濟和科學變革之一。</Text>
        <Space h="xl"/>
        <Text color='blue' size="lg">這就是為什麽今天桑達爾宣布DeepMind和谷歌研究院的大腦團隊將聯合起來，成為一個名為谷歌DeepMind的單一重點部門。將我們的才能和努力結合起來，將加速我們走向一個人工智能幫助解決人類面臨的最大挑戰的世界，我非常高興能夠領導這個部門，並與你們所有人一起建設它。通過與谷歌產品領域的優秀同事密切合作，我們有一個真正的機會來提供人工智能研究和產品，從而極大地改善數十億人的生活，改變行業，推動科學，並為不同的社區服務。</Text>
        <Space h="xl"/>
        <Text color='blue' size="lg">通過創建谷歌DeepMind，我相信我們可以更快地實現這個未來。以安全和負責任的方式建立能力更強的通用人工智能，要求我們解決我們這個時代的一些最困難的科學和工程挑戰。為此，我們需要以更快的速度工作，加強協作和執行，並簡化我們的決策方式，以專注於實現最大的影響。</Text>
        <Space h="xl"/>
        <Text color='blue' size="lg">通過谷歌DeepMind，我們正將我們在人工智能領域的世界級人才與計算能力、基礎設施和資源結合起來，在谷歌和Alphabet創造下一代人工智能的突破和產品，並以大膽和負責任的方式來實現這一目標。驚人的大腦和DeepMind團隊的研究進展奠定了當前人工智能行業的大部分基礎，從深度強化學習到變形金剛，而我們現在作為這個新的合並單位的一部分要做的工作將創造下一波改變世界的突破。</Text>
        <Space h="xl"/>
        <Text color='blue' size="lg">我相信你會有很多問題，關於這個新單位對你、你的團隊和我們所有人來說會是什麽樣子，我們將努力工作，盡快為大家提供清晰的信息。請閱讀桑達爾的說明，並關注明天的全體會議。</Text>
        <Space h="xl"/>
        <Text color='blue' size="lg">我很高興能與你們一起走過這段旅程，並期待著很快見到大家。</Text>
    </Container>
    );
}

export default function ConPage(){
    return(
        <>
            <Page/>
        </>
    );
}