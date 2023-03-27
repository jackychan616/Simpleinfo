import { Container } from '@mantine/core';
import { ArtiCard } from '../../components/card';
import { Page } from '../../components/page_index';
import Meta from '../../components/meta';

const Bloglist = [
  {
    name: 'python 快速入門',
    path: '/code-tutorial/python-quick-tutorial',
    date: '',
    img: '/img/py-icon.png',
  },
  {
    name: 'Linux幾個必學指令 ',
    path: '/code-tutorial/simple_linux_cmd',
    date: '',
    img: '/img/linux.jpeg',
  },
  {
    name: 'Python 教學 [第一章]基礎語法',
    path: '/code-tutorial/python-ch1',
    date: '14/3/2023',
    img: '/img/python-2.png',
  },
];

export default function page() {
  return (
    <>
      <Meta
        pageTitle={'電腦編程教學'}
        description="電腦編程教學,包括Python,Javascript語言等等,以及Linux和Windows的電腦資訊"
      />
      <Container>
        <Page
          title="電腦編程教學"
          img="/img/coding.webp"
          hTitle="電腦編程教學"
        />
        <ArtiCard data={Bloglist} />
      </Container>
    </>
  );
}
