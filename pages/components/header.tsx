import {
    createStyles,
    Menu,
    Center,
    Header,
    Container,
    Group,
    Button,
    Burger,
    rem,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  
  const HEADER_HEIGHT = rem(60);
  
  const useStyles = createStyles((theme) => ({
    inner: {
      height: HEADER_HEIGHT,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    links: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
  
    burger: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
  
    link: {
      display: 'block',
      lineHeight: 1,
      padding: `${rem(8)} ${rem(12)}`,
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      },
    },
  
    linkLabel: {
      marginRight: rem(5),
    },
  }));
  

const header = [
      {
        "link": "#",
        "label": "最近更新"
      },
      {
        "link": "#1",
        "label": "文章",
        "links": [
          {
            "link": "#",
            "label": "主題"
          },
          {
            "link": "#",
            "label": "Resources"
          }
        ]
      },
      {
        "link": "#",
        "label": "主題"
      },
      {
        "link": "#",
        "label": "About us"
      },
      {
        "link": "#2",
        "label": "Support",
        "links": [
          {
            "link": "/faq",
            "label": "FAQ"
          },
          {
            "link": "/forums",
            "label": "Forums"
          }
        ]
      }
];
  export function Conheader() {
    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const items = header.map((link) => {
      const menuItems = link.links?.map((item) => (
        <Menu.Item key={item.link}>{item.label}</Menu.Item>
      ));
  
      if (menuItems) {
        return (
          <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
            <Menu.Target>
              <a
                href={link.link}
                className={classes.link}
                onClick={(event) => event.preventDefault()}
              >
                <Center>
                  <span className={classes.linkLabel}>{link.label}</span>
                </Center>
              </a>
            </Menu.Target>
            <Menu.Dropdown>{menuItems}</Menu.Dropdown>
          </Menu>
        );
      }
  
      return (
        <a
          key={link.label}
          href={link.link}
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          {link.label}
        </a>
      );
    });
  
    return (
      <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
        <Container className={classes.inner} fluid>
          <Group>
            <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          </Group>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Button radius="xl" h={30}>
            訂閱
          </Button>
        </Container>
      </Header>
    );
  }