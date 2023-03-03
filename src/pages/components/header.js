import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  Title
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { blue } from '@mui/material/colors';
import Link from 'next/link';
import Image from 'next/image';
import { DevicesPc, DeviceGamepad2 } from 'tabler-icons-react';


const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 600,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  }
}));


const mockdata=[
  {icon:DevicesPc,
  title:'電腦編程教學',
  description:'詳細易明的教學' 
  },
  {
    icon: DeviceGamepad2,
    title:'遊戲',
    description:'分享游戲中大小事'
  }
];

export default function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start"> 
      <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" weight={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));



  return (
    <Box pb={20}  >
      <Header height={60} px="md" >
        <Group position="apart" sx={{ height: '100%' }}>
          
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <Link href="/" 
                  style={{
                    textDecoration: 'none',
                  }}
            ><Title>Simple Info</Title></Link>
            
            <Link href="/" className={classes.link}>
              <Box component="span" mr={5}>
                      首頁
              </Box>
            </Link>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <Link href="/content" className={classes.link} >
                  <Center inline>
                    <Box component="span" mr={5}>
                      文章
                    </Box>

                  </Center>
                </Link>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                <Group position="apart" px="md">
                  <Text weight={500}>主題</Text>
                  <Anchor href="/content" size="xs">
                    查看所有
                  </Anchor>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                />
                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>
                

                <div className={classes.dropdownFooter}>
                  <Group position="apart">
                    <div>
                      <Text weight={500} >
                        最近更新
                      </Text>
                      <Text size="xs" color="dimmed">
                        
                      </Text>
                    </div>
                    <Button variant="default">前往</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            
          </Group>

          <Group className={classes.hiddenMobile}>
            <Button>訂閱</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Link href="/" className={classes.link}>
            首頁
          </Link>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                文章
              </Box>
            </Center>
          </UnstyledButton>
          

        </ScrollArea>
      </Drawer>
    </Box>
  );
}