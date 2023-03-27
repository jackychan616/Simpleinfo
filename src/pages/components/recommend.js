
import { createStyles, Card, Image, Avatar, Text, Group } from '@mantine/core';


const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

// Example data

export function Recommend({chrilden,data}){
  const { classes } = useStyles();
  const cards = data.map((Data) => (
    <Card key={Data.name} withBorder radius="md" p={0} component="a" className={classes.card} href = {"/content" + Data.path}>
       <Group noWrap spacing={0}>
       <Image src={Data.img} height={140} width={140} />
       <div className={classes.body}>
        <Text transform="uppercase" color="dimmed" weight={700} size="xs">
          {Data.tag}
        </Text>
        <Text className={classes.name} mt="xs" mb="md">
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
    )
   );
   return (
        <>
            {cards}
            {chrilden}
        </>
  );
}
export default function Context(){
    return (
      <>
      </>
    );
  }


  
