/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://simpleinfohk.me',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  autoLastmod: true,
  exclude: ['/components/*', '/header/*', '/loading', '/404', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/components/', '/header/', '/api/'],
      },
    ],
    additionalSitemaps: ['https://simpleinfohk.me/sitemap.xml'],
  },
};