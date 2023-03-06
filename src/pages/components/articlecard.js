import { createStyles, Paper, Text, Title, Button } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));



export function ArticleCard(data) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${data.img})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {data.category}
        </Text>
        <Title order={3} className={classes.title}>
          {data.title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}
function Context(){
  return (
    <>
    </>
  );
}
export default Context;
