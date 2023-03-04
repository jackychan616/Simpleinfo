import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';




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

export function ArtiCard({children,data})   {
  const { classes } = useStyles();

  const cards =data.map((article) => (
    <Card key={article.name} p="md" radius="md" component="a" href={'/content/'+article.path} className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.img} alt = "card"/>
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.name}
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
      {children}
    </Container>
  );
}