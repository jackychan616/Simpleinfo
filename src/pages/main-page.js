import Link from "next/link";
import Image from "next/image";
import { createStyles, SimpleGrid, Card, Text, Container, AspectRatio } from '@mantine/core';

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


function Body(){    
            const { classes } = useStyles();
            const cards = blogdata.map((article) => (
            <Card key={article.title} p="md" radius="md" component="a" href={article.href} className={classes.card}> 
            <AspectRatio ratio={1920 / 1080}>
                <Image src={article.image} width = "650" height = "80"/> 
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
            <div  align="center">
                <h3 >快速探索</h3>
                <div className="row">
                    <div className="col">
                        <Link href="/content/linux-tutorial" passHref><button class>Linux 教學</button></Link>
                        <Link href="/content/python-tutorial"><button>Python 教學</button></Link>
                    </div>
                    
                </div>
            </div>
            <Container py="xl">
                <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                {cards}
                </SimpleGrid>
            </Container>
        </>
        
    )
}   
export default function App(){
    return(
        <div>
            <Body/>
        </div>
    );  
}