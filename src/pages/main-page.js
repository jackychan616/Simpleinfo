import {
  Container,
  createStyles,
  SimpleGrid,
  Card,
  AspectRatio,
  Text,
  Group,
  Badge,
  Button,
  Box
} from '@mantine/core';
import {Meta} from './components/meta';
import Head  from 'next/head';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image'
import React, { useState } from 'react';
import styles from './page.module.css'
export const Bloglist = require('../data/Blog.json');
function Typing() {
  return (
    <TypeAnimation
      sequence={[
        'Simple info',
        3500,
        '前所未有嘅簡單', // '
        3500,
        '仲喺度?',
        3000,
        '搵你所要嘅資訊啦！',
        10000,
      ]}
      wrapper="div"
      cursor={true}
      repeat={3}
      speed={18}
      style={{ fontSize: '3em' }}
    />
  );
}
const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
  bigtitle: {
    textAlign: 'center',
    fontWeight: 1000,
    fontSize: 55,
    lineHeight: 1,
    color: '#1c7ed6',
  },
  text: {
    color: theme.colorScheme,
  },
}));


export default function Home() {
  const { classes } = useStyles();
  const [ postNum, setPostNum] = useState(6); // Default number of posts dislplayed

  function handleClick() {
    setPostNum(prevPostNum => prevPostNum + 6) // 3 is the number of posts you want to load per click
  }
  return (
<>      
  <Head>
    <title>Simple Info HK</title>
  </Head>
  <Container>
    <div
    className=" d-flex   justify-content-center align-items-center"
    style={{ backgroundColor: 'transparent', height: '150px' }}
    >
    <Typing />
    </div>
    <Container>
     
    </Container>
    </Container>
</>
  );
}


