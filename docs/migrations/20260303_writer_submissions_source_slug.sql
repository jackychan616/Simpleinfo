alter table public.writer_submissions
add column if not exists source_slug text;

create unique index if not exists idx_writer_submissions_source_slug_unique
on public.writer_submissions(source_slug)
where source_slug is not null;
