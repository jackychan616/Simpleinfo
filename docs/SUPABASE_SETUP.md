# Supabase Setup for Writer Submissions

## 1) Create table / trigger

Run this SQL in Supabase SQL Editor:

```sql
create table if not exists public.writer_submissions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'ai',
  content text not null,
  status text not null default 'pending_review' check (status in ('pending_review', 'approved', 'rejected')),
  author_id uuid,
  author_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_writer_submissions_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_writer_submissions_updated_at on public.writer_submissions;
create trigger trg_writer_submissions_updated_at
before update on public.writer_submissions
for each row execute function public.set_writer_submissions_updated_at();
```

## 2) Existing table migration (add author fields)

If your table already exists, run migration SQL:

```sql
alter table public.writer_submissions
  add column if not exists author_id uuid,
  add column if not exists author_email text;

create index if not exists idx_writer_submissions_author_id
  on public.writer_submissions(author_id);
```

## 3) Configure env in Vercel and `.env.local`

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`
- `NEXT_PUBLIC_ADMIN_EMAILS` (comma-separated, for client-side UI hint)
- `ADMIN_EMAILS` (comma-separated, server-side hard auth check)

## 4) Auth flow used by writer pages

- Login uses Supabase email magic link (`signInWithOtp`)
- Client sends Bearer access token to writer APIs
- Server validates token with Supabase Auth and derives user info from session
- New submission will persist:
  - `author_id = auth.user.id`
  - `author_email = auth.user.email`

Only emails in admin allowlist can approve/reject submissions.
