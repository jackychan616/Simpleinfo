import {Container,List,Image} from '@mantine/core';
import {ConText,ConTitle} from '../../components/component';
import {Meta} from '../../components/meta';
import Head  from 'next/head';
function Page(){
    return(
        <Container>
            <ConTitle order={1} size="h1">OpenXLA:史上最強開源項目，Google、微軟、蘋果、Meta，整合現有AI框架和硬件</ConTitle>

            <ConText>2022年 10 月的 Google Cloud Next 2022 活動中，OpenXLA 項目正式浮出水面，Google與包括Meta、Apple、AMD、Arm、亞馬遜、英特爾、英偉達、阿里巴巴等科技公司推動的開源 AI 框架合作，致力於匯集不同機器學習框架，讓機器學習開發人員獲得能主動選擇框架、硬件的能力。</ConText>
            <Image alt="OpenXLA" maw={650} caption="OpenXLA" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgBvB_qhPf0xhQnOcL4hIPp0HVPh5TvRDNUnMbwlYJx7_u0SBcHGjE_NiT0MgUsYzJmIAX5i5Z7ZoAVYdzuOuQmw9CY63a3rwPcDvv44l-zD9n33KUS2MlfteVGEfiNtM0dw_KI-AS8jl0AfIiSRKfUtB9k2DDgx6Jw_KkMF5AMwjxqKuVQLQyelMMr/s1600/OpenXLA-Logo-RGB-HORIZ-LIGHT-BG.png"/>
            <ConText>前往項目:<a href='https://github.com/openxla/xla'>https://github.com/openxla/xla</a></ConText>
            <ConTitle order={2} size="h2">XLA</ConTitle>
            <ConText>XLA (Accelerated Linear Algebra) 是一款開源的機器學習編譯器，適用於 GPU、CPU 和機器學習加速器。該編譯器從流行的機器學習框架如 PyTorch、TensorFlow 和 JAX 中獲取模型，並優化它們在各種硬件平台上的高性能執行，包括 GPU、CPU 和機器學習加速器。</ConText>
            <ConTitle order={2} size="h2">OpenXLA 能夠解決的問題</ConTitle>
            <ConText>OpenXLA 項目提供一個先進的機器學習編譯器，可以在機器學習基礎設施的覆雜性中穩健地擴展。其關鍵支柱是性能、可擴展性、可移植性、靈活性和可擴展性，以滿足用戶的需求。OpenXLA致力於加速機器學習的開發和推廣，從而實現人工智能在現實世界中的真正潛力。 </ConText>
            <ConTitle order={2} size="h2">OpenXLA開發目的</ConTitle>
            <List type="ordered">
                <List.Item>使開發人員更容易在他們的偏好框架中編譯和優化任何模型，並為廣泛的硬件平台提供一種統一的編譯器 API，以及可插拔的設備特定的後端和優化選項。</List.Item>
                <List.Item>供當前和新興模型的行業領先的性能，這些模型能夠在不同主機和加速器上擴展，解決部署的限制，普遍化到未來的新興模型架構。</List.Item>
                <List.Item>構建一個可擴展和分層的機器學習編譯平台，為開發者提供基於 MLIR 的可重構組件，以適用於其獨特的應用場景插接點，以進行硬件特定的編譯流程定制。</List.Item>
            </List>
            <ConTitle order={2} size="h2">OpenXLA 生態系統提高性能、規模和可移植性</ConTitle>
            <Image alt="OpenXLA 編譯流程和架構" maw={700} caption="OpenXLA 編譯流程和架構" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7Qy3HIlVtmVD7Gsp3Gh9iL0kwUwHUHtcx-dTMxrZGPrHGQ-4OVdpLyjTiQm26wmHcCcpODYlEBTCNkJr_p5yfvwUBm0yUNfaIqeZB1Lws5t0PkNUrnCEnWTXbM8AQqA01CapXb_mWMCTcxwBNprcWkJY1TYzNDeVDUaCoruHH3jLpBCxeXF8ZQilT/s1600/image1.png"/>
            <ConText>OpenXLA 通過一套可模塊化的編譯工具鏈為機器學習開發者提供支持，該工具鏈通過通用編譯接口與所有主要框架兼容，並利用可移植的標準模型表示形式，同時提供針對特定領域的編譯器，支持強大的目標無關和硬件特定的優化。該工具鏈包括 XLA、StableHLO 和 IREE，它們都依賴於 MLIR:一個編譯基礎設施，使機器學習模型能 consistently 表示、優化和在硬件上執行。</ConText>
            <ConTitle order={2} size="h2">OpenXLA 可使用的範圍</ConTitle>
            <ConText>OpenXLA 涵蓋了機器學習(ML)用例的範圍。包括</ConText>
            <List>
                <List.Item>訓練阿里雲DeepMind 的 AlphaFold</List.Item>
                <List.Item>訓練GPT-2</List.Item>
                <List.Item>在Amazon上進行多模式 LLM</List.Item>
                <List.Item>優化配備 AMD RDNA™ 3 的本地機器上的穩定擴散服務</List.Item>
            </List>

            <ConTitle order={2} size="h2">增加工作負載</ConTitle>
            <ConText>開發<a href="https://zh.wikipedia.org/zh-hk/%E5%B9%B6%E8%A1%8C%E8%AE%A1%E7%AE%97">並行化算法</a>非常耗時並且需要專業知識。借助 GSPMD 等功能，開發人員只需註釋關鍵張量的一個子集，然後編譯器就可以使用這些子集自動生成並行計算。 這消除了跨多個硬件主機和加速器對模型進行分區和高效並行化所需的大量工作。</ConText>
            <ConTitle order={2} size="h2">OpenXLA 改善AI開發的硬件兼容性問題</ConTitle>
            <ConText>OpenXLA 為多種硬件設備提供使用開箱即用的支持，包括 AMD 和 NVIDIA GPU、x86 CPU 和 Arm 架構，以及 ML 加速器，如 Google TPU、AWS Trainium 和 Inferentia、Graphcore IPU、Cerebras Wafer-Scale Engine ， 還有很多。 OpenXLA 還通過 StableHLO 支持 TensorFlow、PyTorch 和 JAX，StableHLO 是一個用作 OpenXLA 輸入格式的可移植層。</ConText>
            <ConTitle order={3} size="h2">提升AI開發的靈活性</ConTitle>
            <ConText>OpenXLA 讓用戶可以靈活地手動調整模型。Custom-call等擴展機制使用戶能夠使用CUDA、HIP、SYCL、Triton等內核語言編寫深度學習原語，從而充分利用硬件特性。</ConText>
            <ConTitle order={2} size="h2">OpenXLA 開發成員的說話</ConTitle>
            <ConTitle order={3} size="h3">Google</ConTitle>
            <ConText>“開源軟件讓每個人都有機會幫助在 AI 領域取得突破。 在谷歌，我們正在 OpenXLA 項目上進行合作，以進一步實現我們對開源的承諾，並促進人工智能工具的採用，這些工具提高了 ML 性能的標準，解決了框架和硬件之間的不兼容性問題，並且可以重新配置以解決開發人員的定制用例。 我們很高興與 OpenXLA 社區一起開發這些工具，以便開發人員可以推動 AI 堆棧的許多不同層的進步。” </ConText>
            <ConText>– Jeff Dean，Google Research 和 AI 高級研究員兼高級副總裁</ConText>
            <ConTitle order={3} size="h3">亞馬遜</ConTitle>
            <ConText>“我們很高興成為 OpenXLA 項目的創始成員，該項目將使對高性能、可擴展和可擴展的 AI 基礎設施的訪問民主化，並在開源社區內進一步合作以推動創新。 在 AWS，我們的客戶在 AWS Trainium 和 Inferentia 上擴展他們的生成 AI 應用程序，我們的 Neuron SDK 依靠 XLA 來優化 ML 模型以獲得高性能和一流的每瓦性能。 借助強大的 OpenXLA 生態系統，開發人員可以繼續創新並通過可持續的 ML 基礎架構提供出色的性能，並且知道他們的代碼可以移植到他們選擇的硬件上使用。” </ConText>
            <ConText>– AWS 副總裁兼傑出工程師 Nafea Bshara</ConText>
            <ConTitle order={3} size="h3">Meta</ConTitle>
            <ConText>“在研究方面，在 Meta AI，我們一直在使用 OpenXLA 項目的核心技術 XLA 來為雲 TPU 啟用 PyTorch 模型，並能夠在重要項目上實現顯著的性能改進。 我們相信開源加速了世界創新的步伐，很高興成為 OpenXLA 項目的一部分。” </ConText>
            <ConText>– Soumith Chintala，PyTorch 首席維護者</ConText>
            <ConTitle order={3} size="h3">AMD</ConTitle>
            <ConText>“我們對 OpenXLA 在廣泛的 AMD 設備系列（CPU、GPU、AIE）上的未來發展方向感到興奮，並為成為這個社區的一員而感到自豪。 我們重視具有開放治理、靈活廣泛的適用性、尖端功能和一流性能的項目，並期待繼續合作，為 ML 開發人員擴展開源生態系統。” </ConText>
            <ConText>– Alan Lee，AMD 公司軟件開發副總裁</ConText>
            <ConTitle order={2} size="h2">參考文章</ConTitle>
            <List>
                <List.Item><a href="https://opensource.googleblog.com/2023/03/openxla-is-ready-to-accelerate-and-simplify-ml-development.html">Google OpenXLA</a></List.Item>
                <List.Item><a href="https://zh.wikipedia.org/zh-hk/%E5%B9%B6%E8%A1%8C%E8%AE%A1%E7%AE%97">平行計算</a></List.Item>
                <List.Item><a href="https://github.com/openxla/xla">OpenXLA 開源代碼庫</a></List.Item>
            </List>
        </Container>
    );
}

export default function ConPage(){
    return(
        <>
            <Page/>
            <Head>
                <title>
                    史上最強開源項目，Google、微軟、Apple、Meta共同開發OpenXLA項目
                </title>
            </Head>
        </>
    );
}

export const getStaticProps = async () => {
    return {
      props: {
        openGraphData: [
          {
            name:'description',
            content:'2022年 10 月的 Google Cloud Next 2022 活動中，OpenXLA 項目正式浮出水面，Google與包括Meta、Apple、AMD、Arm、亞馬遜、英特爾、英偉達、阿里巴巴等科技公司推動的開源 AI 框架合作，致力於匯集不同機器學習框架，讓機器學習開發人員獲得能主動選擇框架、硬件的能力。'

          },
          {
            name:'title',
            content:'史上最強開源項目，Google、微軟、Apple、Meta共同開發OpenXLA項目'
          },
          {
            property: "og:image",
            content:
              "https://avatars.githubusercontent.com/u/107584881?s=200&v=4",
          },
          {
            property: "og:image:width",
            content: "400",
          },
          {
            property: "og:image:height",
            content: "300",
          },
          {
            property: "og:title",
            content: "史上最強開源項目，Google、微軟、Apple、Meta共同開發OpenXLA項目",
          },
          {
            property: "og:description",
            content: "2022年 10 月的 Google Cloud Next 2022 活動中，OpenXLA 項目正式浮出水面，Google與包括Meta、Apple、AMD、Arm、亞馬遜、英特爾、英偉達、阿里巴巴等科技公司推動的開源 AI 框架合作，致力於匯集不同機器學習框架，讓機器學習開發人員獲得能主動選擇框架、硬件的能力。",
          },
          {
            property: "og:type",
            content: "website",
          },
        ],
      },
    };
  };