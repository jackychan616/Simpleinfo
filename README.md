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
- `/writer/auth` Email magic link 登入
- `/writer/new` 建立投稿（寫入 Supabase `writer_submissions`）
- `/writer/my-posts` 只睇自己投稿
- `/writer/submissions` 投稿管理
- `/community` 已通過審核之社群投稿列表

權限規則：
- 一般作者：可提交、可睇自己稿
- admin（`ADMIN_EMAILS` allowlist）：先可 approve/reject

Setup guide:
- `docs/SUPABASE_SETUP.md`
- `.env.example`

