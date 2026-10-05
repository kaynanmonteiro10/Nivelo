-- Execute no SQL Editor de um novo projeto Supabase, uma única vez.
begin;

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;
create policy "Editors can read own membership" on public.admin_users
  for select to authenticated using (user_id = (select auth.uid()));

create function public.is_editor() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.admin_users where user_id = (select auth.uid()));
$$;
revoke all on function public.is_editor() from public;
grant execute on function public.is_editor() to authenticated;

create table public.companies (
  id integer generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (length(name) between 1 and 200),
  category text not null,
  city text not null,
  neighborhood text not null default '',
  tagline text not null,
  description text not null,
  offerings text not null,
  address text not null default '',
  hours text not null default '',
  phone text not null default '',
  email text not null default '',
  website text not null default '',
  image text not null default '/placeholder.svg',
  gallery text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

create table public.articles (
  id integer generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (length(title) between 1 and 200),
  excerpt text not null,
  category text not null,
  content text not null,
  company_id integer not null references public.companies(id) on delete restrict,
  image text not null default '/placeholder.svg',
  author text not null default 'Redação Nivelo',
  status text not null default 'draft' check (status in ('draft', 'published')),
  kind text not null default 'guide' check (kind in ('news', 'interview', 'guide')),
  tags text[] not null default '{}',
  editorial_priority integer not null default 0 check (editorial_priority between 0 and 5),
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger companies_updated_at before update on public.companies
  for each row execute function public.touch_updated_at();
create trigger articles_updated_at before update on public.articles
  for each row execute function public.touch_updated_at();

create index articles_publication on public.articles(status, published_at desc);
create index articles_company on public.articles(company_id);
create index companies_category on public.companies(category);

alter table public.companies enable row level security;
alter table public.articles enable row level security;
revoke all on public.companies, public.articles from anon, authenticated;
grant select on public.companies, public.articles to anon;
grant select, insert, update, delete on public.companies, public.articles to authenticated;
grant usage, select on sequence public.companies_id_seq, public.articles_id_seq to authenticated;

create policy "Public companies" on public.companies for select to anon, authenticated
  using (status = 'published');
create policy "Editor companies" on public.companies for all to authenticated
  using ((select public.is_editor())) with check ((select public.is_editor()));

create policy "Public articles" on public.articles for select to anon, authenticated
  using (status = 'published' and published_at <= now()
    and exists (select 1 from public.companies c where c.id = company_id and c.status = 'published'));
create policy "Editor articles" on public.articles for all to authenticated
  using ((select public.is_editor())) with check ((select public.is_editor()));

commit;
