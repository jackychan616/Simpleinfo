import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme, Container } from '@mantine/core';
import { topics } from 'src/data/topics';
const Bloglist = require('../data/Blog.json');
function getrandomblog(){
    var n = [];
    var num = []
    function R(){
        var j = Math.floor(Math.random()* Bloglist.length)
        if (num.includes(j) == false){
            return j;
        }
        R()
    }
    for (let i = 0; i < 6; i++ ){
	    var b = R();
        num.push(b);
        n.push(Bloglist[b]);
    }
    return n;
}
const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.2,
    color: theme.white,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));



function Card({img,name,tag,path}) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${img})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {tag}
        </Text>
        <Title order={3} className={classes.title}>
          {name}
        </Title>
      </div>
      <Button href={"/content" + path} component="a">
        閱讀文章
      </Button>
    </Paper>
  );
}

const datas = [
    {
        "name": "解構GPT-3工作原理",
        "path": "/ai-tutorial/openai-chatgpt-how-to-work",
        "img": "/img/openai.jpg",
        "date": "1/4/2023",
        "tag": "GPT"
    },
    {
        "name": "什麼是AI?",
        "path": "/ai-tutorial/ai-quick-tutorial",
        "img": "/img/ai.jpg",
        "date": "12/3/2023",
        "tag": "AI 教學"
    },
    {
      name: '如何使用AI繒圖？',
      path: '/ai-tutorial/photo-ai-tutorial',
      img: '/img/ai-generate-img.webp',
      date: '1/3/2023',
      tag: 'AI 教學'
    },
    {
      name: '《小小諾亞-樂園的繼承者》介紹',
      path: '/card-game/little-noah-introduce',
      img: '/img/little-noach-introduce/4.png',
      date: '2/3/2023',
      tag: '遊戲'
    },
    {
      name: '球隊大事記—曼聯',
      path: '/sport/football-big-news',
      date: '15/3/2023',
      img: '/img/football-big-news/1.webp',
      tag: 'sport'
    },
    {
      name: 'RG 1/144系列必入手的商品',
      path: '/toy/5-gundam',
      img: '/img/5-gundam/1.jpg',
      date: '6/3/2023',
      tag: 'toy'
    }
  ]

export function CardsCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  /*const data = getrandomblog();*/
  const slides = datas.map((item) => (
    <Carousel.Slide key={item.name}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="50%"
      breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
      slideGap="xl"
      align="start"
      slidesToScroll={mobile ? 1 : 2}
      loop 
    >
      {slides}
    </Carousel>
  );
}
function Content(){
    const blogs = topics.map((item,index) => (
        <Text key={index}>
            {item.name}
        </Text>
    ))
    return(
        <Container>
            {blogs}
        </Container>
    )
}
export default function Page(){
    return(
    <div>
        <Container>
            <CardsCarousel/>
            <div>
                <Content/>
            </div>
        </Container>
    </div>
    )
}
