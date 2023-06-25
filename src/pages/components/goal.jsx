import { createStyles, Text} from '@mantine/core';

const data = [
    {
        "title": "網站瀏覽量",
        "stats": "21732",
        "description": "3個月內瀏覽量,持續增加中"
      },
      {
        "title": "訪客",
        "stats": "3129",
        "description": "來自亞洲地區較多例如香港,臺灣,也有來自各國的爬蟲"
      },
      {
        "title": "網站文章",
        "stats": "50-60",
        "description": "關注人工智能,時事,娛樂等議題,繼續增加中"
      }
]
const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  title: {
    color: theme.white,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    fontSize: 32,
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: 5,
  },

  stat: {
    flex: 1,

    '& + &': {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `${1} solid ${theme.colors[theme.primaryColor][3]}`,

      [theme.fn.smallerThan('sm')]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `${1} solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },
}));



export function Goal2() {
  const { classes } = useStyles();
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return <div className={classes.root}>{stats}</div>;
}