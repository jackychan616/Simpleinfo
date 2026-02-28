import Layout from './components/layout';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Badge, ColorSchemeProvider, Container, Group, MantineProvider, Space, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import Loading from './loading';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { topic } from '../data/topics';
import { Recommend } from './components/recommend';
import { Get, Getdate, Gettag } from './components/getrecomm';
import { useRouter } from 'next/router';
import { ConTitle } from './components/component';
import { Sharebutton } from './components/share';
import Head from 'next/head';
import { GoogleAds } from './components/googleAds';
import { NotificationsProvider } from '@mantine/notifications';
import Script from 'next/script';
import AuthErrorBoundary from './components/authErrorBoundary';
import { buildCanonicalUrl } from '../lib/seo';

export default function MyApp({ Component, pageProps, ...appProps }) {
  const { asPath } = useRouter();
  const canonicalUrl = buildCanonicalUrl(asPath);

  if (asPath.includes('/savejson')) return null;

  const tag = Gettag(asPath.replace('/content', ''));
  const { openGraphData = [] } = pageProps;

  function BasicLayout({ children, tagNode }) {
    const [colorScheme, setColorScheme] = useLocalStorage({
      key: 'mantine-color-scheme',
      defaultValue: 'light',
      getInitialValueInEffect: true,
    });
    const toggleColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    useHotkeys([['mod+J', () => toggleColorScheme()]]);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <Head>
              <link rel="icon" href="/icon02.png" />
              {openGraphData.map((og, index) => (
                <meta {...og} key={index} />
              ))}
              <meta name="charSet" content="utf-8" />
              <meta property="og:locale" content="zh-Hant-HK" />
            </Head>

            <Layout>
              <Script strategy="afterInteractive" async src="https://www.googletagmanager.com/gtag/js?id=G-L6NG9DRBHS" />
              <Script strategy="afterInteractive" id="google-analytics">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments)};
                  gtag('js', new Date());
                  gtag('config', 'G-L6NG9DRBHS');
                `}
              </Script>

              <GoogleAds />
              {tagNode}
              <AuthErrorBoundary>{isLoading ? <Loading /> : <Component {...pageProps} />}</AuthErrorBoundary>
              {children}
              <Analytics />
            </Layout>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    );
  }

  const publicTopic = new Set([...(topic || []), '/', '/content']);
  if (publicTopic.has(appProps.router.pathname) || tag === '') {
    return <BasicLayout />;
  }

  const TagNode = () => (
    <Container>
      <Badge variant="filled">{tag}</Badge>
      <Space h="lg" />
      <Group>
        <Sharebutton url={buildCanonicalUrl(appProps.router.pathname)} />
        <div>
          <Text size="sm" color="dimmed">
            {Getdate(asPath.replace('/content', ''))}
          </Text>
        </div>
      </Group>
    </Container>
  );

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <BasicLayout tagNode={<TagNode />}>
        <Group>
          <Container size="30rem">
            <Space h="lg" />
            <span>
              <ConTitle>閱讀更多</ConTitle>
            </span>
            <span>
              <Badge variant="filled">{Gettag(asPath.replace('/content', ''))}</Badge>
            </span>
            <Space h="xl" />
            <Recommend data={Get(asPath.replace('/content', ''))} />
          </Container>
        </Group>
      </BasicLayout>
    </>
  );
}
