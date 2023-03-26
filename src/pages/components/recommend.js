
import { createStyles, Card, Image, Avatar, Text, Group } from '@mantine/core';
import { SiWpexplorer } from 'react-icons/si';
import { DatabaseOff } from 'tabler-icons-react/dist';

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
const R = [
    {
      "name": "如何使用AI繒圖？",
      "path": "/ai-tutorial/photo-ai-tutorial",
      "img": "/img/ai-generate-img.webp",
      "date": "1/3/2023",
      "tag": "AI 教學"
    },
    {
      "name": "如何在Windows本地部署Stable Diffusion?",
      "path": "/ai-tutorial/setup-stable-diffusion",
      "img": "/img/stable-diffusion.webp",
      "date": "1/3/2023",
      "tag": "AI 教學"
    }
  ]
export function Recommend({chrilden,data}){
  const { classes } = useStyles();
  const cards = R.map((Data) => (
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
function Context(){
    return (
      <>
      </>
    );
  }
export default Context;

  