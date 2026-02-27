import { NextSeo } from 'next-seo';

const SITE_URL = 'https://simpleinfohk.me';
const siteTitle = 'Simple Info HK';
const defaultDescription = '香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊';

export function Meta({ pageTitle, keywords, description, img, alt, path }) {
  const resolvedDescription = description || defaultDescription;
  const resolvedTitle = pageTitle || siteTitle;
  const canonical = path ? `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}` : undefined;

  const imageUrl = img
    ? `${SITE_URL}${img.startsWith('/') ? img : `/${img}`}`
    : `${SITE_URL}/img/simple_info.png`;

  const imageType = img && img.includes('.') ? `image/${img.split('.').pop()}` : 'image/png';

  return (
    <NextSeo
      title={resolvedTitle}
      description={resolvedDescription}
      canonical={canonical}
      additionalMetaTags={keywords ? [{ name: 'keywords', content: keywords }] : []}
      openGraph={{
        title: resolvedTitle,
        description: resolvedDescription,
        url: canonical,
        type: 'website',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: alt || resolvedTitle,
            type: imageType,
          },
        ],
      }}
      twitter={{
        cardType: 'summary_large_image',
      }}
    />
  );
}

export default function Page() {
  return null;
}
