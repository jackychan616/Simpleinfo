import { Card, Container, Group, SimpleGrid, Text, Title, Button, Badge, Stack } from '@mantine/core';

const plans = [
  {
    name: 'Starter',
    price: 'HK$0',
    desc: '免費睇公開文章 + 每週精選',
    cta: '免費開始',
    href: '/',
    tag: 'Free',
  },
  {
    name: 'Pro',
    price: 'HK$39 / 月',
    desc: '進階教學、工具清單、每月 1 份實戰模板',
    cta: '升級 Pro',
    href: '/about_us',
    tag: '熱門',
  },
  {
    name: 'Sponsor',
    price: 'HK$399 / 月',
    desc: '品牌曝光、商業合作頁、專屬推廣位',
    cta: '聯絡合作',
    href: '/about_us',
    tag: 'B2B',
  },
];

export default function MonetizePage() {
  return (
    <Container size="lg" py="xl">
      <Stack spacing="xs" mb="lg">
        <Title order={1}>Simple Info 變現方案</Title>
        <Text color="dimmed">用內容 + 社群 + 工具包，建立可持續收入。</Text>
      </Stack>

      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {plans.map((plan) => (
          <Card key={plan.name} shadow="sm" radius="md" withBorder>
            <Group position="apart" mb="xs">
              <Text weight={700}>{plan.name}</Text>
              <Badge>{plan.tag}</Badge>
            </Group>
            <Text size="xl" weight={700}>{plan.price}</Text>
            <Text color="dimmed" mt="xs">{plan.desc}</Text>
            <Button component="a" href={plan.href} fullWidth mt="md">{plan.cta}</Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
