
import { createStyles, Card, Image, Avatar, Text, Group } from '@mantine/core';
import { SiWpexplorer } from 'react-icons/si';
import { DatabaseOff } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  bomdy: {
    padding: theme.spacing.md,
  },
}));

// Exaple data
const R = [
    {
    image: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    category: "technology",
    title: "The best laptop for Frontend engineers in 2022",
    date: "Feb 6th",
    author: {
      name: "Elsa Brown",
      avatar: "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
      },
    path:"/card-game/"
    },
    {
      image: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      category: "technology",
      title: "The best laptop for Frontend engineers in 2022",
      date: "Feb 6th",
      author: {
        name: "Elsa Brown",
        avatar: "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
      }
    } 
  ];
export function Recommend({chrilden,data}){
  const { classes } = useStyles();
  const cards = data.map((Data) => (
    <Card key={Data.title} withBorder radius="md" p={0} component="a" className={classes.card} href = {"/content" + Data.path}>
    <Group noWrap spacing={0}>
      <Image src={Data.image} height={140} width={140} />
      <div className={classes.body}>
        <Text transform="uppercase" color="dimmed" weight={700} size="xs">
          {Data.category}
        </Text>
        <Text className={classes.title} mt="xs" mb="md">
          {Data.title}
        </Text>
        <Group noWrap spacing="xs">

          <Text size="xs" color="dimmed">
            {Data.date}
          </Text>
        </Group>
      </div>
    </Group>
  </Card>
  )
);
    return (
        <>
            {cards}
            {chrilden}
        </>
  );
}
function Context(){
    return (
      <>
      </>
    );
  }
export default Context;

  