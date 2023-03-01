import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';



const blogdata = [
  {
      "title": 'Python 教學',
      "image": '/img/py.jpg',
      "href": '/content/python-tutorial',
      "date": '12-25'

  },
  {
      "title": 'linux 教學',
      "image": '/img/linux.jpeg',
      "href": '/content/linux-tutorial',
      "date": '12-25'
  },
  {
     " title":"[porker 撲克牌] 二十一點玩法教學 ","image":"/img/poker.jpg","href":"/content/card-game","date": "12-25"
  }
];

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
}));

export default function ArtiCard()  {
  const { classes } = useStyles();

  const cards =blogdata.map((article) => (
    <Card key={article.title} p="md" radius="md" component="a" href={article.href} className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} alt = "card"/>
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
    </Card>
  ));

  return (
    <Container>
      <Container py="xl">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </Container>
    </Container>
  );
}