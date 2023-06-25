import { createStyles, Box, Text, Group, Container } from '@mantine/core';
import { IconListSearch } from '@tabler/icons-react';
import { Link, Button, Element, Events} from 'react-scroll/modules'
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: 'block',
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    lineHeight: 1.2,
    fontSize: theme.fontSizes.sm,
    padding: theme.spacing.xs,
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    borderLeft: `${1} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

}));

const links = [
  {
    "label": "關於我們",
    "link": "about_us",
    "order": 1
  },
  {
    "label": "目標",
    "link": "goal",
    "order": 1
  },
  {
    "label": "加入我們",
    "link": "join_us",
    "order":1
  }
]
export  function TableOfContents() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(1);
  const items = links.map((item,index) => (
    <Box

      key={item.label}
      className={cx(classes.link)}
      sx={(theme) => ({ paddingLeft: `calc(${item.order} * ${theme.spacing.md})` })}
    >
      <Link       
        onClick={(event) => 
        {event.preventDefault();
        setActive(index)}}
        activeClass = "active" to = {item.link} spy={true} smooth={true} duration={250} containerId="page" >
        <Text>{item.label}</Text>
      </Link>
    </Box>
  ));

  return (
    <div>
      <Group mb="md">
        <IconListSearch size="1.1rem" stroke={1.5} />
        <Text>在這文章里</Text>
      </Group>
        {items}
      </div>
  );
}
