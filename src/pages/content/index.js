import {Getblog} from '../components/getrecomm'
import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  SimpleGrid,
  Container,
  Space
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${"1rem"} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  body: {
    padding: theme.spacing.md,
  },
}));

const PostData = [
  {
    name: '電腦編程教學',
    img: '/img/coding.webp',
    path: '/code-tutorial',
    date: '',
    description:"詳細易明的編程教學 , python , c++ , javascript",
  },
  {
    name: 'AI 教學',
    img: '/img/ai.webp',
    path: '/ai-tutorial',
    date: '',
    description:"掌握最新AI資訊, 最新Openai教學 , Gpt-4應用操作",
  },
  {
    name: '遊戲',
    img: '/img/game.webp',
    path: '/card-game',
    date: '',
    description:"分享游戲中大小事",
  },
  {
    name: '有趣知識',
    img: '/img/fact.webp',
    path: '/fun-fact',
    date: '',
    description:"與你分享不平凡的知識",
  },
  {
    name: '玩具',
    img: '/img/toy.webp',
    path: '/toy',
    date: '',
    description:"形形色色的玩具介紹",
  },
  {
    name: '體育',
    img: 'https://library.sportingnews.com/styles/facebook_1200x630/s3/2021-08/world-cup-trophy-stand_133kk6nwawbmj16uhxvaiznup2.jpg?itok=bYPSCbur',
    path: '/sport',
    date: '',
    description:"分享體育大小事, 足球, 英超 ,西甲,各大聯賽等",
  },
];
function Blog({data}){
  const { classes } = useStyles();
  const blog = data.map((Data)=>(
    <>
    <Card key={Data.name} withBorder radius="xl" p={0} component="a" className={classes.card} href = {"/content" + Data.path}>
    <Group noWrap spacing={0}>
      <Image src={Data.img} height={140} width={140} radius={"xl"}/>
      <div className={classes.body}>

        <Text className={classes.name} mt="xs" mb="md" fw={500}>
          {Data.name}
        </Text>
        <Group noWrap spacing="xs">
  
          <Text size="xs" color="dimmed">
            {Data.date}
          </Text>
        </Group>
      </div>
    </Group>
    </Card>
    <Space h= "md"/>
    </>
  ))
  return(
    <>
      {blog}
    </>
  )
}
export default function Page() {
  const { classes, theme } = useStyles();

  const cards = PostData.map((item) => (
    
    <Card withBorder padding="lg" radius="md" className={classes.card}>
    <Card.Section mb="sm">
      <Image src={item.img} alt={item.name} height={180} />
    </Card.Section>

    <Badge>{item.name}</Badge>

    <Text fw={700} className={classes.title} mt="xs">
      {item.name}
    </Text>
    <Text fz="sm" color="dimmed" lineClamp={4}>
        {item.description}
    </Text>
    <Space h = "lg"/>
    <Blog data = {Getblog(item.name)}/>
  </Card>
  ));
  return (
    <>
      <Container py="xl">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {cards}
        </SimpleGrid>
        <topic_card/>
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      openGraphData: [
        {
          name:'description',
          content:'香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊'

        },
        {
          name:'title',
          content:'Simple Info HK - 目錄'
        },
        {
          property: "og:image",
          content:
            "https://simpleinfohk.me/icon.png",
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
          content: "Simple Info HK - 目錄",
        },
        {
          property: "og:description",
          content: "香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊",
        },
        {
          property: "og:type",
          content: "website",
        },
      ],
    },
  };
};