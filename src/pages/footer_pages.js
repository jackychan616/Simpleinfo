import { useState } from 'react';
import { createStyles, Box, Text, Group, rem,Container } from '@mantine/core';
import { IconListSearch } from '@tabler/icons-react';

const LINK_HEIGHT = 38;
const INDICATOR_SIZE = 10;
const INDICATOR_OFFSET = (LINK_HEIGHT - INDICATOR_SIZE) / 2;
const link = [
  {
    "label": "Usage",
    "link": "#usage",
    "order": 1
  },
  {
    "label": "Position and placement",
    "link": "#position",
    "order": 1
  },
  {
    "label": "With other overlays",
    "link": "#overlays",
    "order": 1
  },
  {
    "label": "Manage focus",
    "link": "#focus",
    "order": 1
  },
  {
    "label": "Examples",
    "link": "#1",
    "order": 1
  },
  {
    "label": "Show on focus",
    "link": "#2",
    "order": 2
  },
  {
    "label": "Show on hover",
    "link": "#3",
    "order": 2
  },
  {
    "label": "With form",
    "link": "#4",
    "order": 2
  }
]
const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: 'block',
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    lineHeight: LINK_HEIGHT,
    fontSize: theme.fontSizes.sm,
    height: LINK_HEIGHT,
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    borderLeft: `${2} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    fontWeight: 500,
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
  },

  links: {
    position: 'relative',
  },

  indicator: {
    transition: 'transform 150ms ease',
    border: `${2} solid ${
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7]
    }`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    height: INDICATOR_SIZE,
    width: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE,
    position: 'absolute',
    left: `calc(-${INDICATOR_SIZE} / 2 + ${1})`,
  },
}));


export function TableOfContentsFloating() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(2);

  const items = link.map((item, index) => (
    <Box
      component="a"
      href={item.link}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
      }}
      key={item.label}
      className={cx(classes.link, { [classes.linkActive]: active === index })}
      sx={(theme) => ({ paddingLeft: `calc(${item.order} * ${theme.spacing.lg})` })}
    >
      {item.label}
    </Box>
  ));

  return (
    <div>
      <Group mb="md">
        <IconListSearch size="1.1rem" stroke={1.5} />
        <Text>Table of contents</Text>
      </Group>
      <div className={classes.links}>
        <div
          className={classes.indicator}
          style={{ transform: `translateY(${active * LINK_HEIGHT + INDICATOR_OFFSET})` }}
        />
        {items}
      </div>
    </div>
  );
}
export default function Page(){
  return(
    <>
      <Container size = "md">
        <TableOfContentsFloating/>
      </Container>
    </>
  )
}