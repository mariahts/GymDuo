-- GymDuo · esquema para Supabase
-- Ejecuta todo esto en el SQL Editor de tu proyecto (una sola vez).

create table if not exists public.spaces (
  id text primary key,
  cfg jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  space_id text not null references public.spaces(id) on delete cascade,
  profile text not null,
  data jsonb,
  updated_at timestamptz not null default now(),
  primary key (space_id, profile)
);

-- Seguridad: la clave pública (anon) solo puede leer/escribir estas tablas.
-- El "secreto" sigue siendo el código aleatorio de 20 caracteres de cada espacio.
alter table public.spaces enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "public read spaces" on public.spaces;
create policy "public read spaces" on public.spaces for select to anon using (true);
drop policy if exists "public insert spaces" on public.spaces;
create policy "public insert spaces" on public.spaces for insert to anon with check (true);
drop policy if exists "public update spaces" on public.spaces;
create policy "public update spaces" on public.spaces for update to anon using (true) with check (true);

drop policy if exists "public read profiles" on public.profiles;
create policy "public read profiles" on public.profiles for select to anon using (true);
drop policy if exists "public insert profiles" on public.profiles;
create policy "public insert profiles" on public.profiles for insert to anon with check (true);
drop policy if exists "public update profiles" on public.profiles;
create policy "public update profiles" on public.profiles for update to anon using (true) with check (true);

-- Realtime para que los cambios lleguen a la pareja al momento.
do $$ begin
  alter publication supabase_realtime add table public.spaces;
exception when duplicate_object then null; end $$;

do $$ begin
  alter publication supabase_realtime add table public.profiles;
exception when duplicate_object then null; end $$;
