# HydroCan: Hydrogen Effect

Premium React Native companion app for the HydroCan hydrogen-infused water brand. Tracks the proprietary **H₂ Index™** — a composite cellular performance score derived from wearable health data, hydration logs, and molecular hydrogen research.

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit values
npx expo start
```

## Stack

| Layer        | Tech |
|--------------|------|
| Framework    | Expo SDK 54, React Native 0.81, React 19 |
| Navigation   | React Navigation v7 (native stack + bottom tabs) |
| Styling      | NativeWind v4 (Tailwind for React Native) |
| State        | Zustand (auth) + TanStack Query v5 (server) |
| Database     | Supabase (PostgreSQL + RLS) |
| Auth         | Supabase magic link + 6-digit PIN gate |
| Language     | TypeScript strict + `noUncheckedIndexedAccess` |

## Project layout

```
App.tsx                      Root entry — providers + RootNavigator
app.json                     Expo config (HydroCan brand, dark UI)
tailwind.config.js           NativeWind theme (HydroCan palette + radii)
global.css                   Tailwind base/components/utilities

src/
  design/
    tokens.ts                Palette, radius, zone system, score → zone
  lib/
    supabase.ts              Typed Supabase client (SecureStore session)
    database.types.ts        Generated types for the public schema
  navigation/
    RootNavigator.tsx        Auth → PIN → Onboarding → Tabs flow
    TabNavigator.tsx         Home / Trends / Log / Community / Coach
  screens/
    auth/SignInScreen.tsx           Magic-link email
    auth/SetupPinScreen.tsx         Create + confirm 6-digit PIN
    auth/EnterPinScreen.tsx         Unlock returning sessions
    auth/OnboardingScreen.tsx       Welcome slides → goal → daily target
    tabs/HomeScreen.tsx             H₂ Ring, can progress, today insight
    tabs/TrendsScreen.tsx           Range picker, mini bar chart, history
    tabs/LogScreen.tsx              Quantity, context tags, feel scale
    tabs/CommunityScreen.tsx        Feed, Challenges, Squads
    tabs/CoachScreen.tsx            AI chat with example prompts
    WrappedScreen.tsx               5-slide weekly story (auto-advance)
    PaywallScreen.tsx               HydroCan+ subscription flow
  components/
    Screen, Card, Button, MetricTile, Ring (SVG), CanProgress,
    PinPad, Tag, MiniBarChart
  hooks/
    useProfile, useMetrics, useCanLogs, useStreak, useFeed, useCoach
  stores/
    auth.ts                  Zustand auth + PIN-unlock state
  providers/
    QueryProvider.tsx        TanStack Query (5-min staleTime)
```

## Database

Connected to the live `hydrocan-app` Supabase project. Tables exposed via typed
client (`src/lib/database.types.ts`):

- `profiles` — display name, goal, daily target, locale, PIN hash
- `can_logs` — every HydroCan logged (quantity, context, feel score)
- `health_metrics_daily` — HRV, RHR, sleep, recovery (from wearables)
- `hydrocan_metrics_daily` — H₂ Index, oxidative load, hydrogen lift, …
- `streaks` — current + longest consecutive logging streak
- `posts`, `reactions`, `follows`, `squads`, `squad_members` — community
- `challenges`, `challenge_participants` — featured + user-joined campaigns
- `coach_threads`, `coach_messages` — AI coach conversations
- `knowledge_base` — pgvector-embedded research citations

PIN management uses Postgres RPCs `set_pin`, `verify_pin`, `reset_pin` so the
PIN hash never leaves the database.

Regenerate types after schema changes:

```bash
npx supabase gen types typescript --project-id <ref> > src/lib/database.types.ts
```

## Design system

Dark-first palette anchored on HydroCan blues:

| Token        | Hex      | Use |
|--------------|----------|-----|
| `bg`         | #05080F  | Screen background |
| `surface`    | #0B1220  | Cards, inputs |
| `surface2`   | #121A2B  | Elevated cards, sheets |
| `border`     | #1E2A44  | Hairline strokes |
| `h2-500`     | #00B4D8  | Primary CTA, active states |
| `h2-300`     | #90E0EF  | Accent text, links |
| `lift`       | #7CFFB2  | Positive deltas |
| `peak`       | #B8FFE5  | Peak zone |
| `building`   | #FFB84D  | Building zone |
| `depleted`   | #FF6B6B  | Depleted zone, warnings |

Zone mapping is centralised in `src/design/tokens.ts`:

```
0 ≤ score < 25  → depleted
25 ≤ score < 55 → building
55 ≤ score < 80 → optimised
80 ≤ score      → peak
```

## Environment

Required (`.env.local`):

```
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

A pre-configured `.env.local` for the `hydrocan-app` Supabase project is
included for development convenience. Rotate before shipping to production.

## Notes

- **PIN gate** is enforced after every cold start by the auth store
  (`pinUnlocked: false` until `verify_pin` succeeds).
- **AI Coach** writes the user message and an echo "assistant" response. Wire
  a Supabase Edge Function (Anthropic Claude) at the matching insert hook to
  enable real RAG responses.
- **Wrapped** auto-advances every 4 s; tap to advance, tap "Skip" to dismiss.
- **Paywall** is UI-only — connect RevenueCat or Stripe at the `purchase`
  handler in `src/screens/PaywallScreen.tsx`.
