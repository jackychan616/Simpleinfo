# PROD SMOKE CHECKLIST (Simpleinfo)

## 1) Routing / URL
- [ ] `/community/<id>-<slug>` opens approved post correctly
- [ ] wrong slug auto-corrects to canonical URL
- [ ] `/content/...` behavior matches `CONTENT_DB_CUTOVER` env setting

## 2) Images / style parity
- [ ] migrated posts show image blocks (no missing hero image)
- [ ] image size not oversized on desktop/mobile
- [ ] captions and alt text render normally

## 3) Writer flow
- [ ] `/writer/new` can upload image and insert URL automatically
- [ ] submission creates pending item
- [ ] admin approve/reject still works

## 4) AI queue
- [ ] enqueue run/optimize works without 504 on web request path
- [ ] worker loop consumes queue and generates submission id
- [ ] approved AI submission has public id-slug link

## 5) Security / env
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `CONTENT_DB_CUTOVER` configured intentionally
- [ ] leaked tokens already rotated/revoked

## 6) SEO
- [ ] canonical URL present and correct
- [ ] sitemap generated and reachable
- [ ] social metadata appears on community post page
