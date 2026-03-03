# Full Auto Mode (Simpleinfo)

## What this mode does

1. Auto enqueue topics (scheduler)
2. Auto generate blogs (ai:bot:loop)
3. Auto optimize by review queue (ai:bot:optimize:loop)

## 0) Required env

Make sure `.env.local` has:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- AI provider vars (Ollama or GitHub Models)

## 1) Start always-on workers (PM2)

```bash
cd /Users/jackychan/.openclaw/workspace-work/Simpleinfo
pm2 start pm2.ecosystem.config.cjs
pm2 save
pm2 startup
```

Check:

```bash
pm2 status
pm2 logs si-ai-gen --lines 50
pm2 logs si-ai-opt --lines 50
```

## 2) Enable automatic topic enqueue (cron)

Edit crontab:

```bash
crontab -e
```

Add:

```cron
0 9,14,20 * * * cd /Users/jackychan/.openclaw/workspace-work/Simpleinfo && /usr/bin/env node scripts/ai-bot-autotopic.js >> /tmp/si-autotopic.log 2>&1
```

This adds 3 new topics every day at 09:00 / 14:00 / 20:00.

## Optional: AI polish migrated legacy content

```bash
cd /Users/jackychan/.openclaw/workspace-work/Simpleinfo
npm run content:migrate:ai-polish -- --limit 20
```

This uses your configured AI provider (Ollama recommended) to rewrite legacy migrated content into cleaner publish-ready blocks.

## 3) Stop full-auto mode

```bash
pm2 stop si-ai-gen si-ai-opt
pm2 save
```

Remove cron line via `crontab -e`.
