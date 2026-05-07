// Recovery-score + H₂-effect engine. Same maths as the design prototype:
// personal-baseline z-scores → composite, A/B split by H₂ exposure.

import { USER, type MockUser } from '@/data/mockUser';

export const mean = (arr: number[]): number => arr.reduce((a, b) => a + b, 0) / Math.max(1, arr.length);
export const sd = (arr: number[]): number => {
  const m = mean(arr);
  const v = mean(arr.map((x) => (x - m) ** 2));
  return Math.sqrt(v) || 1;
};
export const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));
const last = <T>(a: T[]): T => a[a.length - 1] as T;
const prev = <T>(a: T[]): T => a[a.length - 2] as T;

export function recoveryScore(u: MockUser): number {
  const slice = (arr: number[]) => arr.slice(-15, -1);
  const z = (val: number, base: number[], invert: boolean) => {
    const m = mean(base), s = sd(base);
    let z = (val - m) / s;
    if (invert) z = -z;
    return clamp(z, -2.5, 2.5);
  };
  const zHRV = z(last(u.hrv), slice(u.hrv), false);
  const zRHR = z(last(u.rhr), slice(u.rhr), true);
  const zSlp = z(last(u.sleepEff), slice(u.sleepEff), false);
  const zResp = z(last(u.respRate), slice(u.respRate), true);
  const composite = zHRV * 0.4 + zRHR * 0.25 + zSlp * 0.2 + zResp * 0.15;
  return clamp(Math.round(60 + composite * 18), 0, 100);
}

export function hydrationToday(u: MockUser) {
  const today = last(u.cans);
  return { cans: today, goal: u.goalCansPerDay, pct: Math.round((today / u.goalCansPerDay) * 100) };
}

export type Signal = {
  val: number;
  d: number;
  unit: string;
  src: string;
};

export interface TodaySummary {
  score: number;
  hrv: Signal;
  rhr: Signal;
  sleep: Signal;
  sleepEff: Signal;
  resp: Signal;
  steps: Signal;
  hydration: ReturnType<typeof hydrationToday>;
}

export function todaySummary(u: MockUser): TodaySummary {
  const round1 = (x: number) => +x.toFixed(1);
  return {
    score: recoveryScore(u),
    hrv: { val: last(u.hrv), d: last(u.hrv) - prev(u.hrv), unit: 'ms', src: 'WHOOP' },
    rhr: { val: last(u.rhr), d: last(u.rhr) - prev(u.rhr), unit: 'bpm', src: 'WHOOP' },
    sleep: { val: last(u.sleepHrs), d: round1(last(u.sleepHrs) - prev(u.sleepHrs)), unit: 'h', src: 'Apple Health' },
    sleepEff: { val: last(u.sleepEff), d: last(u.sleepEff) - prev(u.sleepEff), unit: '%', src: 'Apple Health' },
    resp: { val: last(u.respRate), d: round1(last(u.respRate) - prev(u.respRate)), unit: 'br/min', src: 'WHOOP' },
    steps: { val: last(u.steps), d: last(u.steps) - prev(u.steps), unit: 'steps', src: 'Apple Health' },
    hydration: hydrationToday(u),
  };
}

export function splitByH2(u: MockUser) {
  const onIdx: number[] = [];
  const offIdx: number[] = [];
  for (let i = 1; i < u.cans.length; i++) {
    ((u.cans[i - 1] ?? 0) >= 2 ? onIdx : offIdx).push(i);
  }
  return { onIdx, offIdx };
}

export type EffectKey = 'hrv' | 'rhr' | 'sleepEff' | 'respRate';

export interface H2Effect {
  ready: boolean;
  n?: number;
  nOn?: number;
  nOff?: number;
  onMean?: number;
  offMean?: number;
  delta?: number;
  effectSize?: number;
  confidence?: 'early' | 'building' | 'firming';
}

export function h2Effect(u: MockUser, key: EffectKey): H2Effect {
  const { onIdx, offIdx } = splitByH2(u);
  const series = u[key];
  if (!series || onIdx.length < 3 || offIdx.length < 3) {
    return { ready: false, n: onIdx.length, nOff: offIdx.length };
  }
  const onVals = onIdx.map((i) => series[i] ?? 0);
  const offVals = offIdx.map((i) => series[i] ?? 0);
  const onM = mean(onVals);
  const offM = mean(offVals);
  const delta = onM - offM;
  const pooled = (sd(onVals) + sd(offVals)) / 2;
  const effectSize = pooled > 0 ? Math.abs(delta) / pooled : 0;
  const confidence: H2Effect['confidence'] =
    onIdx.length >= 7 && effectSize > 0.4 ? 'firming' : onIdx.length >= 5 ? 'building' : 'early';
  return {
    ready: true,
    onMean: +onM.toFixed(1),
    offMean: +offM.toFixed(1),
    delta: +delta.toFixed(1),
    nOn: onIdx.length,
    nOff: offIdx.length,
    effectSize: +effectSize.toFixed(2),
    confidence,
  };
}

export interface H2EffectScore {
  ready: boolean;
  pct?: number;
  nOn: number;
  nOff?: number;
  ci?: 'early' | 'low' | 'medium' | 'high';
  parts?: { hrv: H2Effect; rhr: H2Effect; slp: H2Effect; resp: H2Effect };
}

export function h2EffectScore(u: MockUser): H2EffectScore {
  const hrv = h2Effect(u, 'hrv');
  const rhr = h2Effect(u, 'rhr');
  const slp = h2Effect(u, 'sleepEff');
  const resp = h2Effect(u, 'respRate');
  if (!hrv.ready) return { ready: false, nOn: hrv.n ?? 0 };
  const pct = (e: H2Effect, invert: boolean) => {
    const lift = ((e.onMean! - e.offMean!) / (e.offMean || 1)) * 100;
    return invert ? -lift : lift;
  };
  const composite =
    pct(hrv, false) * 0.35 + pct(rhr, true) * 0.25 + pct(slp, false) * 0.25 + pct(resp, true) * 0.15;
  const n = hrv.nOn ?? 0;
  const ci: H2EffectScore['ci'] = n >= 12 ? 'high' : n >= 8 ? 'medium' : n >= 5 ? 'low' : 'early';
  return {
    ready: true,
    pct: +composite.toFixed(1),
    nOn: n,
    nOff: hrv.nOff,
    ci,
    parts: { hrv, rhr, slp, resp },
  };
}

export interface DailyFinding {
  kind: 'gathering' | 'finding';
  eyebrow: string;
  headline: string;
  body: string;
  tag: string;
  good?: boolean;
  metric?: EffectKey;
}

export function dailyFinding(u: MockUser): DailyFinding {
  const score = h2EffectScore(u);
  if (!score.ready) {
    return {
      kind: 'gathering',
      eyebrow: `EXPERIMENT · DAY ${u.dayN}`,
      headline: 'Still gathering data',
      body: `${score.nOn || 0} on-H₂ days logged. We need at least 5 to start showing effects honestly.`,
      tag: 'EARLY',
    };
  }
  const cands = (
    [
      { key: 'hrv' as const, label: 'HRV', unit: 'ms', invert: false, e: score.parts!.hrv },
      { key: 'rhr' as const, label: 'resting HR', unit: 'bpm', invert: true, e: score.parts!.rhr },
      { key: 'sleepEff' as const, label: 'sleep eff.', unit: '%', invert: false, e: score.parts!.slp },
      { key: 'respRate' as const, label: 'resp. rate', unit: 'br/min', invert: true, e: score.parts!.resp },
    ] as const
  ).filter((c) => c.e.ready);
  cands.sort((a, b) => (b.e.effectSize ?? 0) - (a.e.effectSize ?? 0));
  const top = cands[0]!;
  const dir = top.invert ? (top.e.delta! < 0 ? 'lower' : 'higher') : top.e.delta! > 0 ? 'higher' : 'lower';
  const good = (top.invert && top.e.delta! < 0) || (!top.invert && top.e.delta! > 0);
  return {
    kind: 'finding',
    eyebrow: `FINDING · DAY ${u.dayN} · n=${top.e.nOn}`,
    headline: `Your ${top.label} runs ${Math.abs(top.e.delta!)}${top.unit} ${dir} on H₂ days`,
    body: `On the ${top.e.nOn} days following ≥2 cans, your ${top.label} averaged ${top.e.onMean}${top.unit}. On non-H₂ days (n=${top.e.nOff}), it averaged ${top.e.offMean}${top.unit}.`,
    tag: (score.ci ?? 'early').toUpperCase(),
    good,
    metric: top.key,
  };
}

export function timingNudge(u: MockUser, hour?: number): { copy: string; tone: 'gentle' | 'soft' } | null {
  const h = hour ?? new Date().getHours();
  const today = u.cans[u.cans.length - 1] ?? 0;
  if (today === 0 && h >= 7 && h < 11) {
    return { copy: 'First can goes down well with breakfast — sets the day.', tone: 'gentle' };
  }
  if (today < u.goalCansPerDay && h >= 11 && h < 14) {
    return { copy: 'Mid-day window is your highest-effect log — HRV correlates strongest here.', tone: 'gentle' };
  }
  if (h >= 18 && today < u.goalCansPerDay) {
    return { copy: 'Last can by 7pm protects sleep latency. Optional.', tone: 'soft' };
  }
  return null;
}

// Coach voices — same data, four personalities
export type CoachVoice = 'direct' | 'warm' | 'witty' | 'clinical';

export const COACH_VOICES: Record<
  CoachVoice,
  {
    name: string;
    title: string;
    morning: (t: TodaySummary, u: MockUser) => string;
    evening: (t: TodaySummary, u: MockUser) => string;
    insight: (t: TodaySummary) => string;
  }
> = {
  direct: {
    name: 'Direct',
    title: 'No fluff',
    morning: (t, u) =>
      u.baselineConfident
        ? `Recovery ${t.score}. HRV ${t.hrv.val} ms (${t.hrv.d >= 0 ? '+' : ''}${t.hrv.d}). Train as planned.`
        : `Day ${u.dayN}/14 of baseline. Score will sharpen as data accrues.`,
    evening: (t) => `Logged ${t.hydration.cans}/${t.hydration.goal} cans. Sleep target tonight: 7.5 h.`,
    insight: (t) => `Resp rate ${t.resp.val} br/min — within your range.`,
  },
  warm: {
    name: 'Warm',
    title: 'A friend who happens to know your data',
    morning: (t, u) =>
      u.baselineConfident
        ? `Morning, ${u.name}. Recovery is sitting at ${t.score} — your body had a good night.`
        : `Morning, ${u.name}. We're still learning your rhythms — ${14 - u.dayN} more days until the score really means something.`,
    evening: (t) => `Nice work today. ${t.hydration.cans} cans in. Try for a wind-down before midnight if you can.`,
    insight: () => `Your breathing has been steady all week — that's a recovery green flag.`,
  },
  witty: {
    name: 'Witty',
    title: 'A coach with a dry sense of humor',
    morning: (t, u) =>
      u.baselineConfident
        ? `Recovery: ${t.score}. Your heart rate variability says "I slept" — listen to it.`
        : `Day ${u.dayN}. Still buffering your baseline. The math needs ${14 - u.dayN} more nights.`,
    evening: (t) => `${t.hydration.cans} cans. Either you're hydrated or you're carrying a lot of aluminum.`,
    insight: () => `Your respiratory rate is calmer than the group chat. Good.`,
  },
  clinical: {
    name: 'Clinical',
    title: 'Defensible, source-attributed',
    morning: (t, u) =>
      u.baselineConfident
        ? `Composite recovery z-score → ${t.score}/100. HRV ${t.hrv.val} ms (Δ ${t.hrv.d >= 0 ? '+' : ''}${t.hrv.d}, vs 14-day μ). Source: WHOOP.`
        : `Personal baseline (n=${u.dayN}/14). Score reported with reduced confidence interval.`,
    evening: (t) => `Adherence today: ${t.hydration.cans}/${t.hydration.goal} servings (${t.hydration.pct}%).`,
    insight: (t) => `Respiratory rate ${t.resp.val} br/min, within ±1 SD of personal baseline.`,
  },
};

export const TODAY = todaySummary(USER);
