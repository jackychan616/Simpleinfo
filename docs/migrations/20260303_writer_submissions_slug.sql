-- Add SEO-friendly slug for community routes
alter table public.writer_submissions
add column if not exists slug text;

create unique index if not exists idx_writer_submissions_slug_unique
on public.writer_submissions(slug)
where slug is not null;

create or replace function public.set_writer_submission_slug()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
declare
  base_slug text;
  candidate text;
  suffix int := 0;
begin
  if new.slug is not null and btrim(new.slug) <> '' then
    new.slug := lower(regexp_replace(new.slug, '[^a-z0-9-]+', '-', 'g'));
    new.slug := trim(both '-' from new.slug);
    return new;
  end if;

  base_slug := lower(regexp_replace(coalesce(new.title, ''), '[^a-z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);

  if base_slug = '' then
    base_slug := 'post';
  end if;

  candidate := base_slug;

  while exists (
    select 1
    from public.writer_submissions s
    where s.slug = candidate
      and (new.id is null or s.id <> new.id)
  ) loop
    suffix := suffix + 1;
    candidate := base_slug || '-' || suffix;
  end loop;

  new.slug := candidate;
  return new;
end;
$$;

drop trigger if exists trg_writer_submissions_slug on public.writer_submissions;
create trigger trg_writer_submissions_slug
before insert or update of title, slug on public.writer_submissions
for each row execute function public.set_writer_submission_slug();

-- Backfill existing rows
update public.writer_submissions
set slug = null
where slug is not null and btrim(slug) = '';

update public.writer_submissions
set title = title
where slug is null;
