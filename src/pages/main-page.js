import Link from "next/link";
import { createStyles, SimpleGrid, Card,  Container, AspectRatio, Title,Text, Paper, Group, CloseButton , Image,Button} from '@mantine/core';
import Head from 'next/head';
import Meta from './components/meta';

const blogdata = [
    {
        "title": 'Python 教學',
        "image": '/img/py.jpg',
        "date": '29/2/2023',
        "href": '/content/code-tutorial/python-tutorial/python-quick-tutorial'
    },
    {
        "title": 'linux 教學',
        "image": '/img/linux.jpeg',
        "date": '1/3/2023',
        "href": '/content/code-tutorial/linux-tutorial/simple_linux_cmd'
    },
    {
        "title": '如何在Windows本地部署Stable Diffusion?',
        "image": '/img/stable-diffusion.webp',
        "date": '1/3/2023',
        "href": 'content/ai-tutorial/setup-stable-diffusion'
    },
    {
        "title": '如何使用AI繒圖？',
        "image": '/img/ai-generate-img.jpg',
        "date": '28/2/2023',
        "href": 'content/ai-tutorial/photo-ai-tutorial'
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
  bigtitle: {
    textAlign: 'center',
      fontWeight: 1000,
      fontSize: 55,
      lineHeight: 1,
      color: '#1c7ed6'
    
  }
  }));


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
                <div className={classes.bigtitle}>快速探索</div>
                
                <Container py="xl">
                    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                        {cards}
                    </SimpleGrid>
                </Container>
            </Container>
            </>
        
    )
}   
function kofi() {
    return (
        <>
        <iframe id='kofiframe' src='https://ko-fi.com/jackychan616/?hidefeed=true&widget=true&embed=true&preview=true' style={{border:"none",width:"100%",padding:"4px",background:"#f9f9f9"}}height='712' title='jackychan616'></iframe>
        </>
    )

}

export default function App(){
    return(
        <>
            <Meta keywords={"博客,中文,資訊,資訊平臺,香港,香港博客,Hong Kong Blog,Blog,教學,教學類型,教學博客,教學 Blog,AI教學,AI,有趣資訊 "}
              description={"香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊"} Image = {"img/simple_info.png"}
              />
            <div>
                <Body />
            </div>
        </>
        
    );
}