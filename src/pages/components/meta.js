import { NextSeo } from 'next-seo';
import { buildCanonicalUrl, SITE_URL } from '../../lib/seo';

const siteTitle = 'Simple Info HK';
const defaultDescription = '香港資訊類型博客,專注於提供最新的電腦,遊戲,AI等資訊';

export function Meta({ pageTitle, keywords, description, img, alt, path }) {
  const resolvedDescription = description || defaultDescription;
  const resolvedTitle = pageTitle || siteTitle;
  const canonical = path ? buildCanonicalUrl(path) : undefined;

  const imageUrl = img ? buildCanonicalUrl(img) : `${SITE_URL}/img/simple_info.png`;
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
      twitter={{ cardType: 'summary_large_image' }}
    />
  );
}

export default function Page() {
  return null;
}
