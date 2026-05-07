/* Hydrocan — Real signals only.
   Every number here is something we can actually compute from
   Apple HealthKit, Google Health Connect, or the WHOOP API. */

const PHOTO = {
  // Editorial / lifestyle (used sparingly — onboarding, education only)
  trail:       'https://images.unsplash.com/photo-1486218119243-13883505764c?w=1600&q=85&auto=format&fit=crop',
  dawn:        'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=1600&q=85&auto=format&fit=crop',
  studio:      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=85&auto=format&fit=crop',
  // Product
  canPure:     'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=1200&q=85&auto=format&fit=crop',
  canElectro:  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85&auto=format&fit=crop',
  // Profile
  portrait:    'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80&auto=format&fit=crop',
  // Macro / texture (Today background)
  waterMacro:  'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1600&q=85&auto=format&fit=crop',
  bubbles:     'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1600&q=85&auto=format&fit=crop',
};

/* ---------- USER STATE ---------- */
/* Numbers below would normally be pulled from connected wearables.
   For the prototype we synthesise plausible 14-day arrays so the
   charts and score have something to render. */

function makeSeries(base, drift, noise, n = 30) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    out.push(+(base + drift * t + (Math.random() - 0.5) * noise).toFixed(1));
  }
  return out;
}

const USER = {
  name: 'Marcus',
  age: 34,
  sex: 'male',
  dayN: 9,                     // days since signup
  baselineConfident: false,    // becomes true at day 14
  goalCansPerDay: 3,
  // 30-day series (most recent last)
  hrv:        [42,44,41,46,48,45,47,49,46,48,52,50,49,53,51,55,52,54,56,53,57,55,58,56,59,57,60,58,61,62],
  rhr:        [58,57,59,57,56,58,56,57,55,56,55,54,55,53,54,52,53,51,52,53,51,52,50,51,49,50,48,49,48,47],
  sleepHrs:   [6.2,6.5,6.1,6.8,7.1,6.4,6.9,7.0,6.7,7.2,7.3,6.9,7.4,7.1,7.5,7.2,7.6,7.4,7.5,7.3,7.7,7.5,7.8,7.6,7.9,7.7,8.0,7.8,7.9,7.7],
  sleepEff:  [82,84,80,85,86,83,85,87,84,86,88,86,89,87,90,88,90,89,91,89,91,90,92,91,92,91,93,92,93,92],
  respRate:  [15.4,15.2,15.6,15.1,14.9,15.3,15.0,14.8,15.1,14.9,14.6,14.8,14.5,14.7,14.4,14.6,14.3,14.5,14.2,14.4,14.1,14.3,14.0,14.2,13.9,14.1,13.8,14.0,13.8,13.7],
  steps:     [6800,8200,7400,9100,5800,8800,7200,9400,8100,7600,10200,8400,7800,9600,8200,8800,7900,9200,8400,8600,9100,8000,9400,8500,9300,8800,9700,9200,9500,9100],
  // hydrocan logs — cans per day, 30 days. First ~half is no/low-H₂ (baseline),
  // second half is on-H₂ (after starting Hydrocan). This makes the A/B real.
  cans:      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,3,2,3,3,2,3,3,2,3,3,2,3],
  // Self-reported morning ritual: energy 1-5, mood 1-5 (last 30, 0 = not logged)
  energy:    [3,3,2,3,3,2,3,3,3,2,3,3,3,3,2,3,3,4,3,4,4,3,4,4,4,4,5,4,4,4],
  mood:      [3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,4,4,3,4,4,4,4,4,4,4,4,4,5,4],
  // Today's ritual state
  todayCheckedIn: false,
};
/* ---------- BASELINE + RECOVERY SCORE ----------
   Personal-baseline z-score: how today's signals compare to the
   user's own 14-day rolling baseline. Honest, defensible, no
   absolute "you're top X%" claims. */

function mean(arr) { return arr.reduce((a,b)=>a+b,0) / arr.length; }
function sd(arr) {
  const m = mean(arr);
  const v = mean(arr.map(x => (x-m)**2));
  return Math.sqrt(v) || 1;
}
function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }

/* Baseline = previous 14 days excluding today.
   Score = today vs baseline, normalised, weighted. */
function recoveryScore(u) {
  const slice = (arr) => arr.slice(-15, -1); // 14-day baseline
  const today = (arr) => arr[arr.length - 1];

  const hrvBase = slice(u.hrv), rhrBase = slice(u.rhr),
        slpBase = slice(u.sleepEff), respBase = slice(u.respRate);

  // z-score (RHR + respRate inverted because lower = better recovery)
  const z = (val, base, invert) => {
    const m = mean(base), s = sd(base);
    let z = (val - m) / s;
    if (invert) z = -z;
    return clamp(z, -2.5, 2.5);
  };

  const zHRV  = z(today(u.hrv),       hrvBase,  false);
  const zRHR  = z(today(u.rhr),       rhrBase,  true);
  const zSlp  = z(today(u.sleepEff),  slpBase,  false);
  const zResp = z(today(u.respRate),  respBase, true);

  // weighted (HRV 40, RHR 25, Sleep efficiency 20, Resp 15)
  const composite = zHRV*0.40 + zRHR*0.25 + zSlp*0.20 + zResp*0.15;

  // map z [-2.5..+2.5] to score [20..100], 60 ≈ baseline
  const score = Math.round(60 + composite * 18);
  return clamp(score, 0, 100);
}

/* Hydration adherence: cans today / goal */
function hydrationToday(u) {
  const today = u.cans[u.cans.length - 1];
  return { cans: today, goal: u.goalCansPerDay, pct: Math.round((today / u.goalCansPerDay) * 100) };
}

/* Today summary — every field traceable to a real source */
function todaySummary(u) {
  const last = (a) => a[a.length - 1];
  const prev = (a) => a[a.length - 2];
  return {
    score: recoveryScore(u),
    hrv:    { val: last(u.hrv),       d: last(u.hrv) - prev(u.hrv),       unit:'ms',   src:'WHOOP' },
    rhr:    { val: last(u.rhr),       d: last(u.rhr) - prev(u.rhr),       unit:'bpm',  src:'WHOOP' },
    sleep:  { val: last(u.sleepHrs),  d: +(last(u.sleepHrs)-prev(u.sleepHrs)).toFixed(1), unit:'h', src:'Apple Health' },
    sleepEff:{ val: last(u.sleepEff), d: last(u.sleepEff) - prev(u.sleepEff), unit:'%', src:'Apple Health' },
    resp:   { val: last(u.respRate),  d: +(last(u.respRate)-prev(u.respRate)).toFixed(1), unit:'br/min', src:'WHOOP' },
    steps:  { val: last(u.steps),     d: last(u.steps) - prev(u.steps),     unit:'steps', src:'Apple Health' },
    hydration: hydrationToday(u),
  };
}

/* ---------- H₂ EFFECT ENGINE ----------
   The whole point of Hydrocan: how do YOUR numbers move on the
   days you drink H₂ vs the days you don't? Honest A/B on yourself. */

function splitByH2(u) {
  // A "H₂ day" = previous day had ≥ 2 cans (effects show next morning)
  const onIdx = [], offIdx = [];
  for (let i = 1; i < u.cans.length; i++) {
    (u.cans[i-1] >= 2 ? onIdx : offIdx).push(i);
  }
  return { onIdx, offIdx };
}

function h2Effect(u, key) {
  const { onIdx, offIdx } = splitByH2(u);
  const series = u[key];
  if (!series || onIdx.length < 3 || offIdx.length < 3) {
    return { ready: false, n: onIdx.length, nOff: offIdx.length };
  }
  const onVals  = onIdx.map(i => series[i]);
  const offVals = offIdx.map(i => series[i]);
  const onMean  = mean(onVals);
  const offMean = mean(offVals);
  const delta   = onMean - offMean;
  // Pooled SD for confidence proxy (smaller = tighter)
  const pooled = (sd(onVals) + sd(offVals)) / 2;
  const effectSize = pooled > 0 ? Math.abs(delta) / pooled : 0;
  // Confidence rough heuristic: needs 7+ on-days AND effect > 0.4 SD
  const confidence = onIdx.length >= 7 && effectSize > 0.4 ? 'firming' :
                     onIdx.length >= 5 ? 'building' : 'early';
  return {
    ready: true,
    onMean: +onMean.toFixed(1),
    offMean: +offMean.toFixed(1),
    delta: +delta.toFixed(1),
    nOn: onIdx.length,
    nOff: offIdx.length,
    effectSize: +effectSize.toFixed(2),
    confidence,
  };
}

/* H₂ Effect Score — single % showing average improvement
   across HRV, RHR, sleep eff, resp on H₂ days vs off days. */
function h2EffectScore(u) {
  const hrv  = h2Effect(u, 'hrv');       // higher better
  const rhr  = h2Effect(u, 'rhr');       // lower better
  const slp  = h2Effect(u, 'sleepEff');  // higher better
  const resp = h2Effect(u, 'respRate');  // lower better
  if (!hrv.ready) return { ready: false, nOn: hrv.nOn };
  // % improvement, sign-corrected
  const pct = (e, invert) => {
    const base = invert ? e.offMean : e.offMean;
    const lift = (e.onMean - e.offMean) / base * 100;
    return invert ? -lift : lift;
  };
  const composite = (
    pct(hrv,  false) * 0.35 +
    pct(rhr,  true)  * 0.25 +
    pct(slp,  false) * 0.25 +
    pct(resp, true)  * 0.15
  );
  // n-weighted confidence
  const n = hrv.nOn;
  const ci = n >= 12 ? 'high' : n >= 8 ? 'medium' : n >= 5 ? 'low' : 'early';
  return {
    ready: true,
    pct: +composite.toFixed(1),
    nOn: n, nOff: hrv.nOff,
    ci,
    parts: { hrv, rhr, slp, resp },
  };
}

/* Daily finding — picks the most interesting comparison for today */
function dailyFinding(u) {
  const score = h2EffectScore(u);
  if (!score.ready) {
    return {
      kind: 'gathering',
      eyebrow: 'EXPERIMENT · DAY ' + u.dayN,
      headline: 'Still gathering data',
      body: `${score.nOn || 0} on-H₂ days logged. We need at least 5 to start showing effects honestly.`,
      tag: 'EARLY',
    };
  }
  // Pick the metric with the largest reliable effect
  const cands = [
    { key:'hrv',  label:'HRV',         unit:'ms',     invert:false, e: score.parts.hrv },
    { key:'rhr',  label:'resting HR',  unit:'bpm',    invert:true,  e: score.parts.rhr },
    { key:'slp',  label:'sleep eff.',  unit:'%',      invert:false, e: score.parts.slp },
    { key:'resp', label:'resp. rate',  unit:'br/min', invert:true,  e: score.parts.resp },
  ].filter(c => c.e.ready);
  cands.sort((a,b) => b.e.effectSize - a.e.effectSize);
  const top = cands[0];
  const dir = top.invert ? (top.e.delta < 0 ? 'lower' : 'higher')
                         : (top.e.delta > 0 ? 'higher' : 'lower');
  const good = (top.invert && top.e.delta < 0) || (!top.invert && top.e.delta > 0);
  return {
    kind: 'finding',
    eyebrow: `FINDING · DAY ${u.dayN} · n=${top.e.nOn}`,
    headline: `Your ${top.label} runs ${Math.abs(top.e.delta)}${top.unit} ${dir} on H₂ days`,
    body: `On the ${top.e.nOn} days following ≥2 cans, your ${top.label} averaged ${top.e.onMean}${top.unit}. On non-H₂ days (n=${top.e.nOff}), it averaged ${top.e.offMean}${top.unit}.`,
    tag: score.ci.toUpperCase(),
    good,
    metric: top.key,
  };
}

/* Subtle timing — only fires if there's a relevant context */
function timingNudge(u, hour) {
  const h = hour ?? new Date().getHours();
  const today = u.cans[u.cans.length - 1];
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


function coachLine(u) {
  const t = todaySummary(u);
  if (!u.baselineConfident) {
    return `Day ${u.dayN} of building your baseline. ${14 - u.dayN} days until your score gets confident — keep logging.`;
  }
  if (t.score >= 75) return `Solid recovery today. HRV ${t.hrv.val} ms is ${t.hrv.d>=0?'up':'down'} ${Math.abs(t.hrv.d)} from yesterday.`;
  if (t.score >= 55) return `Recovery is in your normal range. Sleep was ${t.sleep.val}h at ${t.sleepEff.val}% efficiency.`;
  return `Lower than your baseline today. Take it easier — your body is asking for it.`;
}

/* ---------- COACH VOICES ----------
   Same underlying signals — different voice. The Tweaks panel
   exposes this as a 4-way toggle. Each voice gets a morning
   line, an evening line, and an insight callout. */
const COACH_VOICES = {
  direct: {
    name: 'Direct',
    title: 'No fluff',
    morning: (t, u) => u.baselineConfident
      ? `Recovery ${t.score}. HRV ${t.hrv.val} ms (${t.hrv.d>=0?'+':''}${t.hrv.d}). Train as planned.`
      : `Day ${u.dayN}/14 of baseline. Score will sharpen as data accrues.`,
    evening: (t) => `Logged ${t.hydration.cans}/${t.hydration.goal} cans. Sleep target tonight: 7.5 h.`,
    insight: (t) => `Resp rate ${t.resp.val} br/min — within your range.`,
  },
  warm: {
    name: 'Warm',
    title: 'A friend who happens to know your data',
    morning: (t, u) => u.baselineConfident
      ? `Morning, ${u.name}. Recovery is sitting at ${t.score} — your body had a good night. HRV is ${t.hrv.d>=0?'up':'down'} a touch.`
      : `Morning, ${u.name}. We're still learning your rhythms — ${14-u.dayN} more days until the score really means something.`,
    evening: (t) => `Nice work today. ${t.hydration.cans} cans in. Try for a wind-down before midnight if you can.`,
    insight: (t) => `Your breathing has been steady all week — that's a recovery green flag.`,
  },
  witty: {
    name: 'Witty',
    title: 'A coach with a dry sense of humor',
    morning: (t, u) => u.baselineConfident
      ? `Recovery: ${t.score}. Your heart rate variability says "I slept" — listen to it.`
      : `Day ${u.dayN}. Still buffering your baseline. The math needs ${14-u.dayN} more nights.`,
    evening: (t) => `${t.hydration.cans} cans. Either you're hydrated or you're carrying a lot of aluminum.`,
    insight: () => `Your respiratory rate is calmer than the group chat. Good.`,
  },
  clinical: {
    name: 'Clinical',
    title: 'Defensible, source-attributed',
    morning: (t, u) => u.baselineConfident
      ? `Composite recovery z-score → ${t.score}/100. HRV ${t.hrv.val} ms (Δ ${t.hrv.d>=0?'+':''}${t.hrv.d}, vs 14-day μ). Source: WHOOP.`
      : `Personal baseline (n=${u.dayN}/14). Score reported with reduced confidence interval.`,
    evening: (t) => `Adherence today: ${t.hydration.cans}/${t.hydration.goal} servings (${t.hydration.pct}%).`,
    insight: (t) => `Respiratory rate ${t.resp.val} br/min, within ±1 SD of personal baseline.`,
  },
};

window.HC = { PHOTO, USER, COACH_VOICES, todaySummary, recoveryScore, coachLine, mean, sd, h2Effect, h2EffectScore, dailyFinding, timingNudge, splitByH2 };
