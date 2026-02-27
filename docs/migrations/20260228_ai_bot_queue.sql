create table if not exists public.ai_blog_queue (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  category text not null default 'ai',
  tone text not null default 'professional',
  length text not null default 'medium',
  status text not null default 'pending' check (status in ('pending', 'processing', 'done', 'failed')),
  scheduled_at timestamptz,
  processed_at timestamptz,
  generated_submission_id uuid,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists idx_ai_blog_queue_status_created on public.ai_blog_queue(status, created_at);
create index if not exists idx_ai_blog_queue_scheduled on public.ai_blog_queue(scheduled_at);
