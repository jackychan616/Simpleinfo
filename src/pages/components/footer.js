import { createStyles, Text, Container, ActionIcon, Group, Image, SimpleGrid, Stack, Anchor, Divider } from '@mantine/core';
import { IconBrandFacebook, IconBrandInstagram } from '@tabler/icons-react';

const footerSections = [
  {
    title: 'Support',
    links: [
      { label: '尋求幫助', link: '/footer_pages' },
      { label: '返回首頁', link: '/' },
      { label: '投稿中心', link: '/writer' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: '關於我們', link: '/footer_pages' },
      { label: '網站目標', link: '/footer_pages#goal' },
      { label: '變現方案', link: '/monetize' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: '社群投稿', link: '/community' },
      { label: '加入我們', link: '/footer_pages#join_us' },
      { label: '熱門文章', link: '/hot' },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 96,
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: theme.spacing.xl,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#f8fafc',
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : '#e2e8f0'}`,
  },
  brand: {
    maxWidth: 340,
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing.xs,
    color: theme.colorScheme === 'dark' ? theme.white : '#0f172a',
  },
  link: {
    display: 'block',
    paddingTop: 4,
    paddingBottom: 4,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : '#334155',
    fontSize: theme.fontSizes.sm,
    '&:hover': { textDecoration: 'underline' },
  },
  bottom: {
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : '#e2e8f0'}`,
  },
}));

export function FooterLinks() {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container>
        <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'md', cols: 1 }]} spacing="xl">
          <Stack spacing={6} className={classes.brand}>
            <Group spacing="sm">
              <Image src="/icon.png" alt="Simple info" maw={44} mah={44} />
              <Text fw={800} size={24} color="#2563eb">Simple Info</Text>
            </Group>
            <Text size="sm" color="dimmed">
              香港資訊平台：提供科技、AI、遊戲同社群投稿內容，追求穩定更新與實用價值。
            </Text>
          </Stack>

          {footerSections.map((section) => (
            <div key={section.title}>
              <Text className={classes.title}>{section.title}</Text>
              {section.links.map((item) => (
                <Anchor key={item.label} href={item.link} className={classes.link}>
                  {item.label}
                </Anchor>
              ))}
            </div>
          ))}
        </SimpleGrid>

        <div className={classes.bottom}>
          <Group position="apart">
            <Text size="sm" color="dimmed">© {new Date().getFullYear()} Simpleinfohk.me . All rights reserved.</Text>
            <Group spacing={6}>
              <ActionIcon size="lg" component="a" href="https://www.facebook.com/profile.php?id=100092233176369&sk=followers" target="_blank" rel="noopener noreferrer">
                <IconBrandFacebook size="1.05rem" stroke={1.5} color="#2d4686" />
              </ActionIcon>
              <ActionIcon size="lg" component="a" href="https://www.instagram.com/simpleinfo_hk/" target="_blank" rel="noopener noreferrer">
                <IconBrandInstagram size="1.05rem" stroke={1.5} color="#2d4686" />
              </ActionIcon>
            </Group>
          </Group>
        </div>
      </Container>
    </footer>
  );
}

export default function Conpage() {
  return null;
}
