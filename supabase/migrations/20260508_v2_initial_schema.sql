-- Hydrocan Health v2 schema. Editorial design + recovery engine spine.
-- All tables RLS-enabled, gated to the row owner via auth.uid().

-- ─── PROFILES ───────────────────────────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  date_of_birth date,
  sex text check (sex in ('male','female','other','prefer_not_to_say')),
  city text,
  customer_tier text check (customer_tier in ('starter','standard','pro','none')),
  goal_cans_per_day integer not null default 3 check (goal_cans_per_day between 1 and 12),
  manual_mode boolean not null default false,
  accent_hex text not null default '#7CC9EE',
  coach_voice text not null default 'direct' check (coach_voice in ('direct','warm','witty','clinical')),
  signup_at timestamptz not null default now(),
  onboarding_completed_at timestamptz,
  baseline_confident_at timestamptz,
  push_token text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── DATA SOURCE CONNECTIONS ───────────────────────────────────────────────
create table public.connected_sources (
  user_id uuid not null references public.profiles(id) on delete cascade,
  source text not null check (source in ('apple','google','whoop','oura','garmin','fitbit')),
  connected_at timestamptz not null default now(),
  last_synced_at timestamptz,
  raw jsonb not null default '{}'::jsonb,
  primary key (user_id, source)
);

-- ─── DAILY HEALTH SIGNALS ──────────────────────────────────────────────────
create table public.signals_daily (
  user_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  hrv_ms numeric,
  resting_hr integer,
  sleep_minutes integer,
  sleep_efficiency numeric,
  resp_rate numeric,
  steps integer,
  active_calories integer,
  strain numeric,
  sources text[] not null default '{}',
  raw jsonb not null default '{}'::jsonb,
  synced_at timestamptz not null default now(),
  primary key (user_id, date)
);

-- ─── CAN LOGS ──────────────────────────────────────────────────────────────
create table public.cans_logged (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  consumed_at timestamptz not null default now(),
  can_id text not null check (can_id in ('pure','electro','citrus','recover')),
  ml integer not null default 330 check (ml between 50 and 2000),
  source text not null default 'manual' check (source in ('manual','scan','voice','reminder','nfc')),
  feel_score smallint check (feel_score between 1 and 5),
  context text[] not null default '{}',
  created_at timestamptz not null default now()
);
create index cans_logged_user_consumed_idx on public.cans_logged (user_id, consumed_at desc);

-- ─── DAILY RITUAL CHECK-IN ────────────────────────────────────────────────
create table public.ritual_logs (
  user_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  energy smallint check (energy between 1 and 5),
  mood smallint check (mood between 1 and 5),
  notes text,
  created_at timestamptz not null default now(),
  primary key (user_id, date)
);

-- ─── RECOVERY SCORES ───────────────────────────────────────────────────────
create table public.recovery_scores (
  user_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  score integer not null check (score between 0 and 100),
  z_hrv numeric,
  z_rhr numeric,
  z_sleep_eff numeric,
  z_resp numeric,
  composite_z numeric,
  computed_at timestamptz not null default now(),
  primary key (user_id, date)
);

-- ─── H₂ EFFECT DAILY ───────────────────────────────────────────────────────
create table public.h2_effect_daily (
  user_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  pct numeric,
  ci text check (ci in ('early','low','medium','high')),
  n_on integer,
  n_off integer,
  parts jsonb not null default '{}'::jsonb,
  computed_at timestamptz not null default now(),
  primary key (user_id, date)
);

-- ─── DAILY FINDING ─────────────────────────────────────────────────────────
create table public.findings_daily (
  user_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  kind text not null check (kind in ('gathering','finding')),
  metric text,
  eyebrow text,
  headline text not null,
  body text,
  tag text,
  good boolean,
  created_at timestamptz not null default now(),
  primary key (user_id, date)
);

-- ─── BASELINES ─────────────────────────────────────────────────────────────
create table public.user_baselines (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  hrv_baseline numeric,
  hrv_std numeric,
  rhr_baseline numeric,
  rhr_std numeric,
  sleep_eff_baseline numeric,
  sleep_eff_std numeric,
  resp_baseline numeric,
  resp_std numeric,
  no_h2_recovery_baseline numeric,
  sample_size integer not null default 0,
  last_computed timestamptz
);

-- ─── COACH ─────────────────────────────────────────────────────────────────
create table public.coach_threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  voice text not null default 'direct' check (voice in ('direct','warm','witty','clinical')),
  created_at timestamptz not null default now()
);

create table public.coach_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.coach_threads(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('user','coach','system')),
  content text not null,
  citations jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
create index coach_messages_thread_idx on public.coach_messages (thread_id, created_at);

-- ─── REMINDERS ─────────────────────────────────────────────────────────────
create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  slot text not null check (slot in ('morning','midday','pre_workout','wind_down','custom')),
  time_local time not null,
  enabled boolean not null default true,
  description text,
  created_at timestamptz not null default now()
);

-- ─── INBOX ─────────────────────────────────────────────────────────────────
create table public.inbox (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null check (kind in ('insight','coach','delivery','study','system')),
  title text not null,
  body text,
  data jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index inbox_user_created_idx on public.inbox (user_id, created_at desc);

-- ─── SUBSCRIPTIONS ─────────────────────────────────────────────────────────
create table public.subscriptions (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  tier text not null check (tier in ('starter','standard','pro')),
  status text not null default 'active' check (status in ('active','paused','cancelled')),
  cans_per_month integer not null,
  current_period_start date,
  current_period_end date,
  next_delivery_date date,
  paused_until date,
  external_provider text,
  external_id text,
  updated_at timestamptz not null default now()
);

-- ─── COHORT AGGREGATES ─────────────────────────────────────────────────────
create table public.cohort_aggregates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  display_name text not null,
  city text,
  pct numeric not null,
  n_days integer not null,
  computed_at timestamptz not null default now(),
  week_start date not null
);
create index cohort_week_pct_idx on public.cohort_aggregates (week_start, pct desc);

-- ─── ROW LEVEL SECURITY ────────────────────────────────────────────────────
alter table public.profiles            enable row level security;
alter table public.connected_sources   enable row level security;
alter table public.signals_daily       enable row level security;
alter table public.cans_logged         enable row level security;
alter table public.ritual_logs         enable row level security;
alter table public.recovery_scores     enable row level security;
alter table public.h2_effect_daily     enable row level security;
alter table public.findings_daily      enable row level security;
alter table public.user_baselines      enable row level security;
alter table public.coach_threads       enable row level security;
alter table public.coach_messages      enable row level security;
alter table public.reminders           enable row level security;
alter table public.inbox               enable row level security;
alter table public.subscriptions       enable row level security;
alter table public.cohort_aggregates   enable row level security;

do $$
declare t record;
begin
  for t in select unnest(array[
    'connected_sources','signals_daily','cans_logged','ritual_logs',
    'recovery_scores','h2_effect_daily','findings_daily','user_baselines',
    'coach_threads','coach_messages','reminders','inbox','subscriptions'
  ]) as name loop
    execute format($q$ create policy "owner-select" on public.%I for select using (auth.uid() = user_id) $q$, t.name);
    execute format($q$ create policy "owner-insert" on public.%I for insert with check (auth.uid() = user_id) $q$, t.name);
    execute format($q$ create policy "owner-update" on public.%I for update using (auth.uid() = user_id) with check (auth.uid() = user_id) $q$, t.name);
    execute format($q$ create policy "owner-delete" on public.%I for delete using (auth.uid() = user_id) $q$, t.name);
  end loop;
end $$;

create policy "profiles-self-select" on public.profiles for select using (auth.uid() = id);
create policy "profiles-self-update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles-self-insert" on public.profiles for insert with check (auth.uid() = id);

create policy "cohort-read-all" on public.cohort_aggregates for select using (true);
