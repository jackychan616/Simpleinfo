import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio ,Group,Badge} from '@mantine/core';




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
        <Image src={article.img} alt = "card"
         fill
         sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw" />
      </AspectRatio>
      <Group position="apart" mt="md" mb="xs">
        <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {article.date}
        </Text>
        <Badge variant="filled">
          {article.tag}
        </Badge>
      </Group>
      <Text className={classes.name} mt={5}>
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

function Context(){
  return (
    <>
    </>
  );
}
export default Context;
