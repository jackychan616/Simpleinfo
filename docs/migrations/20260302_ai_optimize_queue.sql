create extension if not exists pgcrypto;

create table if not exists public.ai_optimize_queue (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null,
  comment text not null,
  status text not null default 'pending' check (status in ('pending','processing','done','failed')),
  error_message text,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_ai_optimize_queue_status_created
  on public.ai_optimize_queue(status, created_at);

create or replace function public.set_ai_optimize_queue_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_ai_optimize_queue_updated_at on public.ai_optimize_queue;
create trigger trg_ai_optimize_queue_updated_at
before update on public.ai_optimize_queue
for each row execute function public.set_ai_optimize_queue_updated_at();
