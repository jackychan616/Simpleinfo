# [Simple Info website](https://simpleinfohk.me)

## Local run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Writer platform (v2)

- `/writer` 投稿中心
- `/writer/auth` Email 驗證碼登入
- `/writer/new` 建立投稿（寫入 Supabase `writer_submissions`）
- `/writer/my-posts` 只睇自己投稿
- `/writer/submissions` 投稿管理
- `/community` 已通過審核之社群投稿列表
- `/account/profile` 個人資料（username / birthday / age）
- `/admin/roles` admin 一鍵管理角色（admin/editor/writer/user）+ audit logs

Auth methods:
- Email + Password
- Google OAuth（需於 Supabase Auth Providers 啟用）
- Register 頁可用 Email 驗證碼 + verify code 完成註冊

權限規則：
- 一般作者：可提交、可睇自己稿
- admin（`ADMIN_EMAILS` allowlist）：先可 approve/reject

## Local AI blog auto-generation scripts

Required env for AI generation (GitHub Models):
- `GITHUB_TOKEN`
- `GITHUB_MODEL` (recommended: `gpt-4.1`)

- Queue one topic:
  - `npm run ai:bot:enqueue -- --topic "2026 香港 AI 工具比較" --category ai --tone professional --length medium`
- Run worker once (AI model):
  - `npm run ai:bot:once`
- Run worker loop locally (default every 60s):
  - `npm run ai:bot:loop`
- Custom loop interval (ms):
  - `npm run ai:bot:loop -- --interval 15000`
- Optional fallback to local template when AI fails:
  - `npm run ai:bot:loop -- --fallback-template`
- Optional web-search grounding for AI generation:
  - set `AI_BOT_WEB_SEARCH=1`
  - set `BRAVE_API_KEY=...`
  - worker will include latest web references in the prompt

Scripts will auto-load `.env` and `.env.local` from project root.

Setup guide:
- `docs/SUPABASE_SETUP.md`
- `docs/V2_ARCHITECTURE.md`
- `docs/SEARCH_CONSOLE_CHECKLIST.md`
- `.env.example`

