# Supabase Setup for Writer Submissions

## 1) Create / update table

Run this SQL in Supabase SQL Editor:

```sql
create table if not exists public.writer_submissions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'ai',
  content text not null,
  content_blocks jsonb,
  like_count integer not null default 0,
  author_id uuid,
  author_email text,
  status text not null default 'pending_review' check (status in ('pending_review', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.writer_submissions add column if not exists author_id uuid;
alter table public.writer_submissions add column if not exists author_email text;
alter table public.writer_submissions add column if not exists content_blocks jsonb;
alter table public.writer_submissions add column if not exists like_count integer not null default 0;

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

create index if not exists idx_writer_submissions_author_id on public.writer_submissions(author_id);
```

## 2) Configure env in Vercel and `.env.local`

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`
- `NEXT_PUBLIC_ADMIN_EMAILS` (comma-separated)
- `ADMIN_EMAILS` (comma-separated, server-side check)

Only emails in admin allowlist can approve/reject submissions.

## 3) Storage for image upload

Create a Supabase Storage bucket named `blog-images`.
For MVP, set it to public read so uploaded image URLs can be rendered directly in posts.
