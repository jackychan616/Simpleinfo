import { SITE_URL, buildCanonicalUrl } from './seo';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Simple Info HK',
    url: SITE_URL,
    logo: `${SITE_URL}/img/simple_info.png`,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Simple Info HK',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function articleJsonLd({ title, description, idOrPath, createdAt, updatedAt, authorName }) {
  const canonical = idOrPath?.startsWith('/') ? buildCanonicalUrl(idOrPath) : buildCanonicalUrl(`/community/${idOrPath}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: createdAt,
    dateModified: updatedAt || createdAt,
    mainEntityOfPage: canonical,
    author: {
      '@type': 'Person',
      name: authorName || 'Simple Info 社群作者',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Simple Info HK',
    },
  };
}
