# Google Search Console Checklist

## 1) Property setup
- Add domain property for `simpleinfohk.me`
- Verify ownership (DNS TXT)

## 2) Sitemap submit
- Submit: `https://simpleinfohk.me/sitemap.xml`
- Check `sitemap-0.xml` fetch status = Success

## 3) Indexing checks
- URL Inspection for:
  - `/`
  - `/community`
  - 2-3 sample `/community/[id]`
- Request indexing for newly published pages

## 4) Coverage watch
- Fix pages with `Crawled - currently not indexed`
- Ensure no accidental `noindex` meta

## 5) Performance watch
- Track top queries/pages weekly
- Improve titles/descriptions for high-impression low-CTR pages

## 6) Core Web Vitals
- Monitor LCP/CLS/INP in Search Console
- Optimize pages with poor status first
