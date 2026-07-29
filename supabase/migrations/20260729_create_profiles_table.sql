-- Profiles table: one row per member, keyed to auth.users
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  avatar_url text,
  region text not null check (region in ('uk', 'usa', 'greece', 'new-zealand', 'south-africa', 'canada', 'rest-of-europe', 'rest-of-africa')),
  date_of_birth date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Members can read only their own row
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Members can update their own row, but NOT region or date_of_birth.
-- Only display_name, avatar_url, and updated_at are updatable.
create policy "Users can update own profile (cosmetic fields only)"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and region = (select region from public.profiles where id = auth.uid())
    and date_of_birth = (select date_of_birth from public.profiles where id = auth.uid())
  );

-- Allow insert during signup (service role or trigger)
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-update updated_at on row change
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profile_updated
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- Auto-create profile row on user signup
-- The signup flow must pass region and date_of_birth as user metadata
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, region, date_of_birth)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', ''),
    new.raw_user_meta_data->>'region',
    (new.raw_user_meta_data->>'date_of_birth')::date
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
