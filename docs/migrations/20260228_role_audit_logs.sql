create table if not exists public.role_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_email text,
  target_email text not null,
  action text not null check (action in ('upsert', 'delete')),
  previous_role text,
  new_role text,
  created_at timestamptz not null default now()
);

create index if not exists idx_role_audit_logs_created_at on public.role_audit_logs(created_at desc);
create index if not exists idx_role_audit_logs_target_email on public.role_audit_logs(target_email);
