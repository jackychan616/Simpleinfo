-- Phase 1 migration: advanced editor blocks + community likes
alter table public.writer_submissions
  add column if not exists content_blocks jsonb,
  add column if not exists like_count integer not null default 0;

-- Optional: backfill content_blocks from legacy content (single paragraph block)
-- update public.writer_submissions
-- set content_blocks = jsonb_build_array(jsonb_build_object('type', 'paragraph', 'text', content))
-- where content_blocks is null and coalesce(content, '') <> '';
