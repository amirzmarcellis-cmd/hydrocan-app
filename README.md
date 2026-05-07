# Hydrocan Health

Editorial-style React Native app for the H₂-effect study product. Implements the
[Claude Design](https://claude.ai/design) handoff bundle in `design-source/`
faithfully — graphite + ice palette, Wondra serif display, Inter body, JetBrains
Mono eyebrows, 23 screens (auth + 5 onboarding + 5 tabs + 12 secondary).

## Quick start

```bash
npm install
cp .env.example .env.local        # paste your Supabase URL + anon key
npx expo start
```

## Stack

| Layer        | Tech |
|--------------|------|
| Framework    | Expo SDK 54, React Native 0.81, React 19, TypeScript strict |
| Navigation   | React Navigation v7 (native stack + bottom tabs) |
| Styling      | StyleSheet + design tokens (`src/theme/tokens.ts`) |
| State        | Zustand (auth · onboarding · settings) |
| Server data  | TanStack Query v5 |
| Database     | Supabase (PostgreSQL · RLS) |
| Auth         | Supabase Auth (placeholder — sign-in CTAs go straight to onboarding for the prototype) |
| Fonts        | Wondra (`assets/fonts/Wondra.ttf`) · Inter · JetBrains Mono |

## Screens (23)

**Entry & Onboarding (6)**
- `SignInScreen` — Apple / Google / Email
- `OnboardingNameScreen` — name, DOB, sex
- `OnboardingCustomerScreen` — Hydrocan tier picker
- `OnboardingConnectScreen` — wearable picker (multi-select)
- `OnboardingGoalScreen` — daily can goal slider
- `OnboardingPermissionsScreen` — health/notif/bluetooth perms

**Tabs (5)** — `TODAY · COACH · LOG · COHORT · ME`
- `TodayScreen` — editorial masthead, hero H₂ Effect %, daily finding,
  morning ritual, 4 H₂-lens metric tiles, timing nudge, hydration bar,
  sources footer
- `CoachScreen` — voice-aware AI chat with daily briefing card,
  prompt chips, mic/send input row
- `LogScreen` — quantity stepper, can grid, scan/voice fallbacks
- `CohortScreen` — global leaderboard with you-row highlight
- `ProfileScreen` — avatar + stats triad + 8 settings rows

**Secondary (12)**
- `TrendsScreen` — 4 sparkline panels, on/off-H₂ split rule
- `RecoveryScreen` — 4-step night protocol
- `ScanScreen` — animated NFC/QR viewfinder
- `WorkoutScreen` — Before / During / After protocol cards
- `ProductScreen` — can detail with specs
- `SubscriptionScreen` — 3-tier delivery plan picker
- `RemindersScreen` — drink-schedule toggles
- `ManualScreen` — no-wearable mode entry form
- `PrivacyScreen` — granular data toggles + export/delete
- `HelpScreen` — FAQ topics + contact
- `EducationScreen` — 5 article previews
- `NotificationsScreen` — inbox with insight/coach/delivery items
- `ConnectScreen` — add a wearable post-onboarding

## Design tokens

| Token                | Hex                       | Use |
|----------------------|---------------------------|-----|
| `graphite0..5`       | `#050608` → `#2E3543`     | Surfaces (dark-first) |
| `text1..4`           | `#F2F5F9` → `#424B5A`     | Text scale |
| `ice` / `iceBright` / `iceDeep` | `#B8E0F5` / `#7CC9EE` / `#4DA8D6` | Primary accent |
| `iceGlow`            | `rgba(124,201,238,0.18)`  | Pill highlight bg |
| `arctic / glacier / mineral / sunrise / crimson` | swap accents | Tweak-panel choices |

Tokens live in `src/theme/tokens.ts`.

## Recovery + H₂ engine (`src/lib/recovery.ts`)

Direct port of the design bundle's `data.jsx`:

- **Recovery score** = personal-baseline z-score on HRV, RHR (inverted),
  sleep-efficiency, respiratory rate (inverted) → `60 + composite × 18`
- **H₂ effect engine** = A/B split on H₂ days (≥ 2 cans previous day) vs off
  days, weighted across the same 4 signals
- **Confidence** = `early < 5` → `building < 7` → `firming` (≥ 7 + effect-size 0.4σ)
- **4 coach voices** — Direct, Warm, Witty, Clinical — same data, different copy
- 30-day mock series in `src/data/mockUser.ts` so the UI renders before live
  wearable sync is wired

## Wearable sources

The connect screens wire UI for: Apple Health, Google Health Connect, WHOOP,
Oura, Garmin, Fitbit. None are integrated yet — drop in HealthKit / Health
Connect / each vendor's OAuth in `src/lib/`.

## Database

Supabase project `huqgmullrfcrpvimejqt` was wiped during this rebuild (per the
new design's different data model). Re-create the new schema before going
live:

- `profiles` — name, dob, sex, goal_cans, tier, accent, voice
- `signals_daily` (PK user_id+date) — hrv_ms, rhr, sleep_min, sleep_eff,
  resp_rate, steps, source[]
- `cans_logged` — id, user_id, ts, ml, can_id (pure/electro/citrus/recover)
- `recovery_scores` (PK user_id+date) — composite + per-signal z
- `h2_effect_daily` — pct, ci, parts_json
- `coach_threads` / `coach_messages`
- `cohort_aggregates` — anonymised opt-in leaderboard
- `notifications_inbox` — kind, title, body, ts, read

## Project layout

```
App.tsx                       Font loading + provider tree + RootNavigator
app.json                      Expo config (Hydrocan brand, dark UI, Wondra font plugin)
assets/fonts/Wondra.ttf       Brand display font (bundled)
design-source/                Original Claude Design handoff bundle (HTML/JSX/CSS)

src/
  theme/tokens.ts             Palette, fonts, radii, accents
  theme/text.ts               Reusable Text style presets
  data/mockUser.ts            30-day mock series
  lib/recovery.ts             Recovery score + H₂ effect engine + coach voices
  lib/supabase.ts             Typed Supabase client
  icons/index.tsx             24-icon stroke set ported from primitives.jsx
  components/                 Screen, Card, Pill, Button, Eyebrow, Display, Body,
                              H2Ring, Sparkline, MetricTile, IconBtn, TopBar,
                              EditorialRule
  stores/                     auth · onboarding · settings (Zustand)
  navigation/                 RootNavigator + TabNavigator + types
  screens/auth/               1 screen
  screens/onboarding/         5 screens + OBHeader
  screens/tabs/               5 screens
  screens/secondary/          12 screens
```

## Known parking lots

- Auth screens are visual stubs — wire `supabase.auth.signInWithOtp` /
  Apple/Google providers when you're ready.
- AI Coach replies are hard-coded heuristics. Swap `reply()` in
  `CoachScreen.tsx` for a Supabase Edge Function calling Claude when ready.
- Wearable sources show a connect UI but don't fetch yet.
- Subscription / Privacy / Help / Education are visual; copy and behaviour
  ready to wire to Stripe / RevenueCat / your support backend.

## Acknowledgements

Design language from the Claude Design handoff bundle (see `design-source/`).
Wondra font included as a brand asset.
