import { createStyles, Text, Container, ActionIcon, Group ,Image} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram,IconBrandFacebook} from '@tabler/icons-react';
import styles from "../page.module.css"
const data = [
        {
            "title": "Support",
            "links": [
            { "label": "尋求幫助", "link": "#" },
            { "label": "返回首頁", "link": "/" },
            { "label": "為你推薦", "link": "#" },
            ]
        },
        {
          "title": "About",
          "links": [
            { "label": "關於我們", "link": "#" },
            { "label": "政策", "link": "#" },
            { "label": "使用條款", "link": "#" },
          ]
        },
        {
          "title": "Community",
          "links": [
            { "label": "加入Discord", "link": "#" },
            { "label": "加入我們", "link": "#" },
            { "label": "發送郵件", "link": "#" },
          ]
        }
]
const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `${1} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color :'#0968fc'
    },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `${1} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}));



export function FooterLinks() {
  const { classes } = useStyles();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
    <Text
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title} >{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Group>
            <Image src = "/icon.png" alt = "Simple info" maw = {60} mah = {60}/>
            <Text fw = {700} size = {23} color='#0968fc'>Simple info</Text>
          </Group>
          
          <Text size="xs" color="dimmed" className={classes.description}>
            香港資訊性網站 ,追求穩定 ,內容豐富的各類型資訊
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2023 Simpleinfohk.me . All rights reserved.
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <IconBrandTwitter size="1.05rem" stroke={1.7} color={'#2d4686'} />
          </ActionIcon>
          <ActionIcon size="lg" component = 'a' href='https://www.facebook.com/profile.php?id=100092233176369&sk=followers'>
            <IconBrandFacebook size="1.05rem" stroke={1.7} color={'#2d4686'} />
          </ActionIcon>
          <ActionIcon size="lg" component='a' href='https://www.instagram.com/simpleinfohk/'>
            <IconBrandInstagram size="1.05rem" stroke={1.7}  color={'#2d4686'}/>
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );  
}
export default function Conpage(){
  return <></>
}