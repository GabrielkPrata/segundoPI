 ------------------------------------------------------------
-- 1. TABELAS
------------------------------------------------------------
 
-- Table: courses
create table if not exists public.courses (
  id bigserial primary key,
  name text not null,
  code text unique,
  description text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);
 
-- Table: students
create table if not exists public.students (
  id bigserial primary key,
  name text not null,
  matricula text not null unique,
  email text,
  course_id bigint references public.courses(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);
 
------------------------------------------------------------
-- 2. TRIGGER FUNCTION (PREENCHE created_by AUTOMATICAMENTE)
------------------------------------------------------------
 
create or replace function public.set_created_by()
returns trigger
language plpgsql
security definer
as $$
begin
  if tg_op = 'INSERT' then
    if NEW.created_by is null then
      NEW.created_by := current_setting('request.jwt.claim.sub', true)::uuid;
    end if;
    return NEW;
  end if;
  return null;
end;
$$;
 
------------------------------------------------------------
-- 3. CRIAÇÃO DOS TRIGGERS
------------------------------------------------------------
 
drop trigger if exists set_created_by_courses on public.courses;
create trigger set_created_by_courses
before insert on public.courses
for each row execute procedure public.set_created_by();
 
drop trigger if exists set_created_by_students on public.students;
create trigger set_created_by_students
before insert on public.students
for each row execute procedure public.set_created_by();
 
------------------------------------------------------------
-- 4. ATIVAR RLS
------------------------------------------------------------
 
alter table public.courses enable row level security;
alter table public.students enable row level security;
 
------------------------------------------------------------
-- 5. POLICIES (SEM NEW/OLD – TOTALMENTE CORRETAS)
------------------------------------------------------------
 
------------- COURSES -------------
 
-- SELECT para usuários autenticados
create policy "courses_select_authenticated" on public.courses
  for select
  using (auth.role() = 'authenticated');
 
-- INSERT autorizado (trigger define created_by)
create policy "courses_insert_authenticated" on public.courses
  for insert
  with check (auth.role() = 'authenticated');
 
-- UPDATE permitido somente pelo criador
create policy "courses_update_owner" on public.courses
  for update
  using ( created_by = auth.uid() )
  with check ( created_by = auth.uid() );
 
-- DELETE somente pelo criador
create policy "courses_delete_owner" on public.courses
  for delete
  using ( created_by = auth.uid() );
 
------------- STUDENTS -------------
 
-- SELECT para usuários autenticados
create policy "students_select_authenticated" on public.students
  for select
  using (auth.role() = 'authenticated');
 
-- INSERT autenticado (trigger define created_by)
create policy "students_insert_authenticated" on public.students
  for insert
  with check (auth.role() = 'authenticated');
 
-- UPDATE apenas do dono
create policy "students_update_owner" on public.students
  for update
  using ( created_by = auth.uid() )
  with check ( created_by = auth.uid() );
 
-- DELETE apenas do dono
create policy "students_delete_owner" on public.students
  for delete
  using ( created_by = auth.uid() );
 
------------------------------------------------------------
-- 6. FIM
------------------------------------------------------------