-- Better System v2 - RBAC + Posts core schema

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null check (role in ('admin', 'editor', 'writer', 'user')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_email text,
  title text not null,
  slug text not null unique,
  excerpt text,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft', 'pending_review', 'published', 'archived')),
  published_at timestamptz,
  like_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.post_blocks (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  sort_order integer not null default 0,
  block jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_posts_status_published on public.posts(status, published_at desc);
create index if not exists idx_posts_author on public.posts(author_email);
create index if not exists idx_post_blocks_post on public.post_blocks(post_id, sort_order);
