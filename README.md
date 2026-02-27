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

- `/writer` 投稿中心（含 Supabase Auth magic link 登入 / 登出 + session 顯示）
- `/writer/new` 建立投稿（需登入，寫入 Supabase `writer_submissions`）
- `/writer/my-posts` 只顯示目前登入作者的投稿
- `/writer/submissions` 投稿總覽 + Admin 審核（approve/reject）

### Auth + admin notes

- 投稿 API (`POST /api/writer/submissions`) 會從 Supabase session 綁定：`author_id`、`author_email`
- Admin 狀態更新 API (`PATCH /api/writer/submissions/:id`) 有 server-side hard check：
  - 必須登入
  - email 必須在 allowlist（`ADMIN_EMAILS` 或 `NEXT_PUBLIC_ADMIN_EMAILS`）
- 非 admin 就算手動呼叫 API 亦會收到 `403`

Setup guide:
- `docs/SUPABASE_SETUP.md`
- `.env.example`
