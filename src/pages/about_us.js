import { Card, Container, Stack, Text, Title } from '@mantine/core';
import Meta from './components/meta';

export default function AboutContactPage({ now }) {
  return (
    <>
      <Meta pageTitle="聯絡我們 | Simple Info" description="Simple Info 聯絡與合作資訊。" path="/about_us" />
      <Container size="sm" py="xl">
        <Stack spacing="md">
          <Title order={1}>聯絡我們</Title>
          <Text color="dimmed">合作、內容授權、品牌曝光，歡迎聯絡。</Text>

          <Card withBorder radius="md" shadow="sm">
            <Stack spacing={6}>
              <Text><b>Email：</b> jackychana76@gmail.com</Text>
              <Text><b>Instagram：</b> @simpleinfo_hk</Text>
              <Text size="xs" color="dimmed">SSR Render Time: {now}</Text>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      now: new Date().toISOString(),
    },
  };
}
