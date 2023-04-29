import { createStyles, Card, Overlay, CardProps, Button, Text, Container } from '@mantine/core';
import { topics } from 'src/data/topics';
import { Getblogbytag, Gethottopicimg} from '../../components/getrecomm';
import { ArtiCard} from '../../components/card';
const useStyles = createStyles((theme) => ({
  card: {
    height: 240,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  content: {
    ...theme.fn.cover(),
    padding: theme.spacing.xl,
    zIndex: 1,
  },

  action: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
  },

  title: {
    color: theme.white,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
  },

  description: {
    color: theme.white,
    maxWidth: 220,
  },
}));
const label = "前往";
export function Topic_card(
  data,
  style,
  className,
  ...others){
  const { classes, cx, theme } = useStyles();   
  const load = topics.map((item)=>(    
        <Container key = {item.name}>
          <Card
          radius="md"
          style={{ backgroundImage: `url(${"https://simpleinfohk.me" + Gethottopicimg(item.name,item.path)})`, ...style }}
        className={cx(classes.card, className)}
          {...others}
          >
            <Overlay
              gradient={`linear-gradient(105deg, ${theme.black} 20%, #312f2f 50%, ${theme.colors.gray[4]} 100%)`}
              opacity={0.55}
              zIndex={0}
            />

            <div className={classes.content}>
            <Text size="lg" weight={700} className={classes.title}>
              {item.name}
            </Text>

            <Text size="sm" className={classes.description}>
              {item.description}
            </Text>

            <Button
              className={classes.action}
              variant="white"
              color="dark"
              component="a"
              size="xs"
              href={"/content/" + item.path}
            >
              {label}
            </Button>
            </div>
          </Card>
          <ArtiCard data = {Getblogbytag(item.name,item.path).slice(0,2)}/>
        </Container>
  ))
  return( 
    <Container>
      {load}
    </Container>
  );
}
export default function Conpage(){
  return <></>
}
