-- 기존 프로젝트에서 먼저 백업 후 실행. 이 migration은 데이터 삭제를 하지 않습니다.
create table public.profiles (id uuid primary key references auth.users(id) on delete cascade, display_name text, is_admin boolean not null default false);
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$ select exists(select 1 from profiles where id = auth.uid() and is_admin = true); $$;
create table public.cms_state (id text primary key check(id='main'), document jsonb not null, revision integer not null default 0, updated_at timestamptz not null default now());
create table public.pages (slug text primary key, draft jsonb not null, published jsonb not null, revision integer not null default 0, updated_at timestamptz not null default now());
create table public.section_versions (id uuid primary key default gen_random_uuid(), page_slug text not null references public.pages(slug), document jsonb not null, label text not null, created_at timestamptz not null default now(), created_by uuid references auth.users(id));
create table public.inquiries (id uuid primary key default gen_random_uuid(), name text not null, phone text not null, email text, kind text not null check(kind in ('consulting','inquiry')), customer_type text, product_id text, region text, budget text, method text, available_time text, message text not null, consent_at timestamptz not null, status text not null default '신규' check(status in ('신규','상담 예정','상담 중','견적 발송','주문 진행','발주 완료','설치 완료','종료')), memo text not null default '', created_at timestamptz not null default now());
create table public.consultation_logs (id uuid primary key default gen_random_uuid(), inquiry_id uuid not null references public.inquiries(id) on delete cascade, note text not null, created_at timestamptz not null default now(), created_by uuid references auth.users(id));
create table public.orders (id uuid primary key default gen_random_uuid(), inquiry_id uuid not null unique references public.inquiries(id), status text not null default '상담' check(status in ('상담','견적','주문확정','공급처 발주','배송','설치','완료')), supplier_memo text not null default '', created_at timestamptz not null default now());
create index inquiries_created_idx on public.inquiries(created_at desc);
create index inquiries_status_idx on public.inquiries(status);
create index logs_inquiry_idx on public.consultation_logs(inquiry_id,created_at);
create index versions_page_idx on public.section_versions(page_slug,created_at desc);
create table public.inquiry_limits (key text primary key, count integer not null, window_start timestamptz not null);

alter table public.profiles enable row level security;
create policy profile_read on public.profiles for select to authenticated using(id=auth.uid() or public.is_admin());
-- 관리자 승격은 SQL Editor에서 owner가 직접 수행. 회원/관리자 앱에서 변경 불가.
do $$ declare t text; begin foreach t in array array['cms_state','pages','section_versions','inquiries','consultation_logs','orders'] loop
execute format('alter table public.%I enable row level security',t);
execute format('create policy admin_only on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())',t);
end loop; end $$;
alter table public.inquiry_limits enable row level security;

create or replace function public.get_public_cms() returns jsonb language sql stable security definer set search_path = public as $$
select jsonb_set(document,'{products}',coalesce((select jsonb_agg(p) from jsonb_array_elements(document->'products') p where (p->>'published')::boolean),'[]')) from cms_state where id='main'; $$;
create or replace function public.get_public_pages() returns jsonb language sql stable security definer set search_path = public as $$ select coalesce(jsonb_object_agg(slug,published),'{}') from pages; $$;

create or replace function public.save_cms(payload jsonb, expected_revision integer) returns integer language plpgsql security invoker set search_path = public as $$ declare v integer; begin
if not public.is_admin() then raise exception 'FORBIDDEN'; end if;
select revision into v from cms_state where id='main' for update;
if v is null then insert into cms_state(id,document) values('main',payload); return 0; end if;
if v<>expected_revision then raise exception 'REVISION_CONFLICT'; end if;
update cms_state set document=payload,revision=v+1,updated_at=now() where id='main'; return v+1;
end; $$;
create or replace function public.save_page(page_slug text,payload jsonb,expected_revision integer,do_publish boolean default false) returns integer language plpgsql security invoker set search_path = public as $$ declare v integer; begin
if not public.is_admin() then raise exception 'FORBIDDEN'; end if;
select revision into v from pages where slug=page_slug for update;
if v is null then insert into pages(slug,draft,published) values(page_slug,payload,'{"sections":[],"title":"","description":""}'); v:=0; end if;
if v<>expected_revision then raise exception 'REVISION_CONFLICT'; end if;
if do_publish then
insert into section_versions(page_slug,document,label,created_by) select slug,published,'게시 전 버전',auth.uid() from pages where slug=page_slug;
update pages set draft=payload,published=payload,revision=v+1,updated_at=now() where slug=page_slug;
else update pages set draft=payload,revision=v+1,updated_at=now() where slug=page_slug; end if;
return v+1; end; $$;

-- 서버의 service role만 호출. 여러 인스턴스에서도 같은 DB 제한을 공유합니다.
create or replace function public.consume_inquiry_limit(limit_key text) returns boolean language plpgsql security definer set search_path = public as $$ declare n integer; begin
insert into inquiry_limits(key,count,window_start) values(limit_key,1,now()) on conflict(key) do update set count=case when inquiry_limits.window_start<now()-interval '10 minutes' then 1 else inquiry_limits.count+1 end,window_start=case when inquiry_limits.window_start<now()-interval '10 minutes' then now() else inquiry_limits.window_start end returning count into n;
return n<=5; end; $$;
revoke all on function public.consume_inquiry_limit(text) from public,anon,authenticated;
grant execute on function public.consume_inquiry_limit(text) to service_role;
revoke all on function public.save_cms(jsonb,integer) from public,anon;
revoke all on function public.save_page(text,jsonb,integer,boolean) from public,anon;
grant execute on function public.save_cms(jsonb,integer) to authenticated;
grant execute on function public.save_page(text,jsonb,integer,boolean) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('media','media',true,10485760,array['image/webp']) on conflict(id) do nothing;
create policy media_public_read on storage.objects for select to anon,authenticated using(bucket_id='media');
create policy media_admin_insert on storage.objects for insert to authenticated with check(bucket_id='media' and public.is_admin());
create policy media_admin_update on storage.objects for update to authenticated using(bucket_id='media' and public.is_admin()) with check(bucket_id='media' and public.is_admin());
create policy media_admin_delete on storage.objects for delete to authenticated using(bucket_id='media' and public.is_admin());
