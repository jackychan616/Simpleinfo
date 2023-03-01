import Link from "next/link";
import { createStyles, SimpleGrid, Card,  Container, AspectRatio, Title,Text, Paper, Group, CloseButton , Image,Button} from '@mantine/core';

const blogdata = [
    {
        "title": 'Python 教學',
        "image": '/img/py.jpg',
        "date": 'September 12, 2022',
        "href": '/content/python-tutorial'
    },
    {
        "title": 'linux 教學',
        "image": '/img/linux.jpeg',
        "date": 'September 12, 2022',
        "href": '/content/linux-tutorial'
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

function cookie(){
    return(
    <Paper withBorder p="lg" radius="md" shadow="md">
    <Group position="apart" mb="xs">
      <Text size="md" weight={500}>
        Allow cookies
      </Text>
      <CloseButton mr={-9} mt={-9} />
    </Group>
    <Text color="dimmed" size="xs">
      So the deal is, we want to spy on you. We would like to know what did you have for todays
      breakfast, where do you live, how much do you earn and like 50 other things. To view our
      landing page you will have to accept all cookies. That&apos;s all, and remember that we are
      watching...
    </Text>
    <Group position="right" mt="xs">
      <Button variant="default" size="xs">
        Cookies preferences
      </Button>
      <Button variant="outline" size="xs">
        Accept all
      </Button>
    </Group>
  </Paper>
    );
}
function Body(){    
            const { classes } = useStyles();
            const cards = blogdata.map((article) => (
            <Card key={article.title} p="md" radius="md" component="a" href={article.href} className={classes.card}> 
            <AspectRatio ratio={1920 / 1080}>
                <Image src={article.image} alt="" width = "650" height = "80"/> 
            </AspectRatio>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
                {article.date}
            </Text>
            <Text className={classes.title} mt={5}>
                {article.title}
            </Text>
            </Card>
            ));
            return(
                <>
            <div className=" d-flex   justify-content-center align-items-center" style={{backgroundColor : "rgb(56,60,68)",height : "150px"}}>
                <h1 className='display-5 'style={{color : "white"}}>Simple info</h1>
                <p style={{color : "white"}}> Keep it simple </p>
                
                
            </div>
            <Container>
                <Title order={1} size="h1" align="center" variant='gradient'
                    gradient={{from:"dark.9" ,to:'dark.0',deg:10}}>快速探索</Title>
                
                <Container py="xl">
                    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                        {cards}
                    </SimpleGrid>
                </Container>
            </Container>
            
        </>
        
    )
}   
export default function App(){
    return(
        <div>
            <Body/>
            <cookie/>
        </div>);  
}