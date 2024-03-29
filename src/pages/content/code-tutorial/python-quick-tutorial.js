import {
  Text,
  Table,
  Image,
  Container,
  Kbd,
  Code,
  List,
} from '@mantine/core';
import {
  ConText,
  OutputText,
  PyPrism,
  ConTitle,
} from '../../components/component';
import Head from 'next/head';
const kbd1 = `
print('ok')
`;

const kbd2 = `
number = 1
print(number)
`;

const kbd3 = `
text = '這是一行句子'
print(text)
`;
const kbd4 = `
Bool =True
if Bool :
    //Bool 是True則執行這一行
else :
    //Bool 是False則執行這一行
`;

const kbd5 = `
age = 16
if age >=18:
    print('adult')
else:
    print('kids')
`;
const elements = [
  {
    name: 'str',
    type: '句子',
    example: `s='這是一行句子'`,
    kbd: `print(s+',這也是')`,
    output: `'這是一行句子,這也是'`,
  },
  {
    name: 'int',
    type: '整數(1 , 2 ,3)',
    example: 'number= 120',
    kbd: `print(number+50)`,
    output: '170',
  },
  {
    name: 'list',
    type: `列表,列表中可以包含多種變數,每個元素都有分配一個索引，第一個索引是0，第二個索引是1，如此類推`,
    example: `list=['apple','orange',1,2,3]`,
    kbd: `print(list[0]+list[0])`,
    output: `'appleorange'`,
  },
  {
    name: 'dict',
    type: '字典,能夠儲存變數,每個數據都有獨特的名稱作為索引',
    example: `dict={'number1':1,'number2':2}`,
    kbd: `print(dict['number1']+dict['number2'])`,
    output: '3',
  },
];

function ConPage() {
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.type}</td>
      <td>{element.example}</td>
      <td>{element.kbd}</td>
      <td>{element.output}</td>
    </tr>
  ));

  return (
    <Container>
      <ConTitle order={1}>Python入門</ConTitle>

      <ConTitle order={2}>簡介</ConTitle>

      <ConText>
        Python 是一種易學、強大的程式語言，
        Python的設計哲學強調程式碼的可讀性和簡潔的語法，
        尤其是使用空格縮排來劃分程式碼塊。相比於C或Java，
        Python讓開發者能夠用更少的代碼表達想法。
      </ConText>

      <ConTitle order={2}>下載Python</ConTitle>
      <ConText fz="lg">我們將介紹如何在電腦設置Python開發環境</ConText>
      <ConText fz="lg">
        Python能在大多數平臺使用包括Windows,MacOS,Linux 等等
      </ConText>
      <ConTitle order={3}>下載</ConTitle>
      <ConText h1="sm" h2="sm" fz="lg">
        一般建議在Python官網下載{' '}
        <a href="https://www.python.org/downloads/">
          https://www.python.org/downloads/
        </a>
      </ConText>

      <ConTitle order={3}>安裝</ConTitle>
      <ConText fz="lg">
        下載了合適的檔案後，按 <Kbd>win + r </Kbd>然後輸入<Kbd>cmd</Kbd>{' '}
        打開終端，然後輸入python檢查是否安裝正確
      </ConText>
      <Image src="/img/python-install-check.png" alt=""></Image>
      <ConText>如果輸出與圖片差不多，證明下載正確</ConText>
      <Image src="/img/python-tutorial-cmd.png" alt=""></Image>

      <ConTitle order={3}>語法</ConTitle>
      <ConText>文件輸入以下句子</ConText>
      <PyPrism language="python">{kbd1}</PyPrism>
      <ConText>輸出</ConText>
      <Code block>ok</Code>
      <ConTitle order={4}>Python 標識符</ConTitle>
      <Text>在Python中, 標識符由英文字母、符號及橫綫{`(_)`}組成</Text>
      <Text>但不能由數字做開頭</Text>
      <ConText>
        能夠以大小寫區分,例如<Kbd>Print </Kbd>和<Kbd>print</Kbd>不一樣
      </ConText>
      <ConTitle order={4}>標識符例子</ConTitle>

      <ConTitle order={3}>變數</ConTitle>
      <ConText>
        在設計程式當中，我們常常需要儲存數據，我們能使用<Kbd>變數</Kbd>
        儲存數字和字串
      </ConText>
      <List>
        <List.Item>
          <ConText fz="lg">每個變數被使用前必須賦值</ConText>
        </List.Item>
        <List.Item>
          <ConText>
            <Kbd>=</Kbd>用來賦值給變數
          </ConText>
        </List.Item>
        <List.Item>
          <ConText>每個變數被使用前必須賦值</ConText>
        </List.Item>
        <List.Item>
          <ConText>
            <Kbd>變數 = 值</Kbd>
          </ConText>
        </List.Item>
      </List>

      <PyPrism>{kbd2}</PyPrism>
      <OutputText>結果:1</OutputText>
      <PyPrism>{kbd3}</PyPrism>

      <ConTitle order={4}>變數類型</ConTitle>
      <ConText>Python 有很多變數類型,用來處理數字和文字</ConText>
      <Table
        horizontalSpacing="xs"
        striped
        highlightOnHover
        withBorder
        withColumnBorders
      >
        <thread>
          <tr>
            <th>變數</th>
            <th>類型</th>
            <th>例子</th>
            <th>執行</th>
            <th>結果</th>
          </tr>
          <tbody>{rows}</tbody>
        </thread>
      </Table>

      <ConTitle order={2}>條件句</ConTitle>
      <ConText>條件句是基於布林(Boolean 即是True & False)執行不同段落</ConText>
      <ConTitle order={3}>例子 1 </ConTitle>
      <PyPrism>{kbd4}</PyPrism>
      <ConTitle order={4}>例子 2</ConTitle>
      <Text>結合運算符</Text>
      <PyPrism>{kbd5}</PyPrism>
    </Container>
  );
}

export default function Page() {
  return (
    <>
      <Head>
        <title>Python入門</title>
      </Head>
      <ConPage />
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      openGraphData: [
        {
          name:'description',
          content:'入門快速學習Python,即使新手也很快速掌握'

        },
        {
          name:'title',
          content:'Python入門'
        },
        {
          property: "og:image",
          content:
            "https://simpleinfohk.me/img/python.png",
        },
        {
          property: "og:image:width",
          content: "300",
        },
        {
          property: "og:image:height",
          content: "200",
        },
        {
          property: "og:title",
          content: "Python入門",
        },
        {
          property: "og:description",
          content: "入門快速學習Python,即使新手也很快速掌握",
        },
        {
          property: "og:type",
          content: "website",
        },
      ],
    },
  };
};