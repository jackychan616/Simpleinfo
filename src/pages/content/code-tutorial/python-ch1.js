import { ConText, ConTitle, PyPrism } from '../../components/component';
import { Container, Space } from '@mantine/core';
import {Meta} from '../../components/meta';

function Page() {
  const code1 = `
# 宣告整數
a = 10
b = -5

# 宣告浮點數
c = 3.14
d = -2.71828

# 宣告布林值
e = True
f = False

`;

  const code2 = `
# 宣告字串
g = 'Hello World'
h = "Python教學"
i = """我是一個多行字串，
    可以換行輸入"""

# 字串索引與切片
print(g[0])     #輸出 H
print(g[1:5])   #輸出 ello

`;
  const code3 = `
# 宣告列表
j = [1, 2, 3, 4, 5]
k = ['apple', 'banana', 'orange']
l = [1, 'hello', True, [2.2, 'world']]

# 列表索引與切片
print(j[0])         #輸出: 1
print(k[1:3])       #輸出: ['banana', 'orange']

# 附加元素
j.append(6)         # [1, 2, 3, 4, 5, 6]
k.insert(1, 'pear') # ['apple', 'pear', 'banana', 'orange']
`;
  const code4 = `
# 宣告元組
m = (1, 2, 3, 4, 5)
n = ('apple', 'banana', 'orange')

# 元組索引與切片
print(m[0])         #輸出: 1
print(n[1:])        #輸出: ('banana', 'orange')

print(n[1:])        #輸出: ('banana', 'orange')
`;
  const code5 = `
# 宣告字典
o = {'name': 'Tom', 'age': 20, 'gender': 'male'}

# 存取字典
print(o['name'])    #輸出: Tom
o['name'] = 'Jerry' #輸出: {'name': 'Jerry', 'age': 20, 'gender': 'male'}

# 新增鍵值對
o['phone'] = '0912345678' # {'name': 'Jerry', 'age': 20, 'gender': 'male', 'phone': '0912345678'}
`;
  const code6 = `
# 單條件判斷
a = 10
if a > 0:
    print('a is positive') # 只執行這一行
elif a == 0:
    print('a is zero') #如果a=0 ,只執行這一行
else:
    print('a is negative') #如果a<0 ,只執行這一行
`;
  const code7 = `
# for 迴圈
for i in range(10):
    print(i)

# 遍歷列表
a = [1, 2, 3, 4, 5]
for i in a:
    print(i)
#輸出:12345

# 遍歷字串
s = 'Simple Info'
for c in s:
    print(c)
#輸出:Simple Info
`;

  const code8 = `
# while 迴圈
i = 0
while i < 5:
    print(i)
    i += 1
#輸出:01234
`;
  const code9 = `
# print 函式
print(10) #輸出:10

`;
  const code10 = `
# 宣告函式
def add(a, b):
    c = a + b
    return c

# 呼叫函式
x = add(3, 4)   # x = 7
`;
  return (
    <Container>
      <ConTitle order={1} size={'h1'}>
        Python [第一章]基礎語法
      </ConTitle>
      <ConText>
        Python是一種高級編程語言，可讀性高的程式語言，常被用於科學計算、網路開發、機器學習、大數據機器學習分析等領域。它簡單易學、語法清晰、具有強大的標準庫和活躍的社區支持，因此越來越多的人在使用Python來解決問題和開發程序。
      </ConText>
      <ConText>
        Python最初由Guido van
        Rossum於1989年創造，之後逐步發展成為一種多範式、面向對象的編程語言。它是一種解釋性的、交互式的語言，可以快速地進行原型設計、調試和開發。Python同時也適用於大型項目的開發和部署，易於維護的代碼。
      </ConText>
      <Space h="lg" />
      <ConTitle order={2} size="h2">
        1. 資料型別
      </ConTitle>
      <ConText>
        在 Python 中，資料型別包括整數 (int)、浮點數 (float)、字串
        (string)、布林值 (boolean)、列表 (list)、元組 (tuple)、字典 (dictionary)
        等。
      </ConText>
      <ConTitle order={3} size="h3">
        1.1 整數、浮點數與布林值
      </ConTitle>
      <ConText>整數、浮點數和布林值是 Python 基本的資料型別。</ConText>
      <PyPrism>{code1}</PyPrism>
      <ConTitle order={3} size="h3">
        1.2 字串
      </ConTitle>
      <ConText>
        字串是由零個或多個字元組成的序列，可以用單引號、雙引號或三個雙引號來表示。
      </ConText>
      <PyPrism>{code2}</PyPrism>
      <ConTitle order={3} size="h3">
        1.3 列表
      </ConTitle>
      <ConText>
        列表是由零個或多個元素組成的序列，元素可以是任何類型，並且可變。
      </ConText>
      <PyPrism>{code3}</PyPrism>
      <ConTitle order={3} size="h3">
        1.4 元組
      </ConTitle>
      <ConText>
        元組與列表類似，是由零個或多個元素組成的序列，但元素不可變。
      </ConText>
      <PyPrism>{code4}</PyPrism>
      <ConTitle order={3} size="h3">
        1.5 字典
      </ConTitle>
      <ConText>字典是由鍵值對組成的集合，鍵和值可以是任何資料型別。</ConText>
      <PyPrism>{code5}</PyPrism>
      <ConTitle order={2} size="h2">
        2. 控制流程
      </ConTitle>
      <ConText>Python 提供了條件判斷、迴圈和函式等控制流程。</ConText>
      <ConTitle order={3} size="h3">
        2.1 條件判斷
      </ConTitle>
      <ConText>
        條件判斷可以通過 if、elif 和 else 來實現，條件表達式的結果必須是布林型別
        (True 或 False)。
      </ConText>
      <PyPrism>{code6}</PyPrism>
      <ConTitle order={3} size="h3">
        2.2 迴圈
      </ConTitle>
      <ConText>
        Python 提供了 for 和 while 兩種迴圈，可以用於重複執行某個程式區塊。
      </ConText>
      <ConTitle order={4} size="h3">
        for 迴圈
      </ConTitle>
      <ConText>
        for 迴圈可以遍歷序列、字串等可迭代物件，通常與 range 函式一起使用。
      </ConText>
      <ConTitle order={4} size="h3">
        while 迴圈
      </ConTitle>
      <ConText>
        while
        迴圈可以在條件滿足的情況下重複執行整個程式區塊。直到條件布林值是False
      </ConText>
      <ConTitle order={3} size="h3">
        2.3 函式
      </ConTitle>
      <ConText>
        函式是一段完成特定任務的程式碼，通過給定輸入參數和返回值來實現。
      </ConText>
      <PyPrism>{code9}</PyPrism>
      <Space h="lg" />
      <PyPrism>{code10}</PyPrism>
      <Space h="lg" />
    </Container>
  );
}

export default function ConPage() {
  return (
    <>
      <Meta
        pageTitle="Python [第一章]基礎語法"
        description={'在這一章，我們將淺易地講解Python基礎語法'}
      />
      <Container>
        <Page />
      </Container>
    </>
  );
}
