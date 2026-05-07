/* Hydrocan — Today: H₂ Effect spine.
   Hero is the on-H₂ vs off-H₂ comparison, not generic recovery.
   Below: daily finding, ritual check-in, signals through the H₂ lens,
   subtle timing nudge, hydration. */

const { I: T_I, BottomTabs: T_BottomTabs } = window.HCPrim;
const { PHOTO: T_PHOTO, USER, todaySummary, h2EffectScore, h2Effect, dailyFinding, timingNudge, splitByH2 } = window.HC;

/* ---------- shared bits ---------- */
function Spark({ data, w=120, h=34, accent='#B8E0F5', stroke=1.4, splitAt }) {
  if (!data || !data.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / span) * (h - 4) - 2;
    return [x, y];
  });
  const path = pts.map(([x,y], i) => `${i===0?'M':'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const last = data[data.length - 1];
  const lastX = (data.length - 1) * step;
  const lastY = h - ((last - min) / span) * (h - 4) - 2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {splitAt!=null && (
        <line x1={splitAt*step} y1="0" x2={splitAt*step} y2={h} stroke={accent} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5"/>
      )}
      <path d={path} fill="none" stroke={accent} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" opacity={0.9}/>
      <circle cx={lastX} cy={lastY} r={2.2} fill={accent}/>
    </svg>
  );
}

/* ---------- H₂-LENS METRIC TILE ----------
   Shows on-H₂ vs off-H₂ averages, not just today's number. */
function MetricTile({ label, unit, effect, accent, onTap, invert }) {
  if (!effect.ready) {
    return (
      <button onClick={onTap} style={{
        padding:'12px 12px', textAlign:'left', cursor:'pointer',
        background:'rgba(10,12,16,0.5)', backdropFilter:'blur(10px)',
        border:'1px solid rgba(255,255,255,0.08)', borderRadius: 0,
        display:'flex', flexDirection:'column', justifyContent:'space-between',
        minHeight: 96, color:'#fff'
      }}>
        <div style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color:'rgba(255,255,255,0.6)' }}>{label}</div>
        <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, color:'rgba(255,255,255,0.45)', letterSpacing:'0.18em' }}>
          BUILDING<br/>n={effect.n}/5
        </div>
      </button>
    );
  }
  const good = invert ? effect.delta < 0 : effect.delta > 0;
  const col = good ? accent : '#E59E7A';
  const sign = effect.delta > 0 ? '+' : '';
  return (
    <button onClick={onTap} style={{
      padding:'12px 12px', textAlign:'left', cursor:'pointer',
      background:'rgba(10,12,16,0.55)', backdropFilter:'blur(10px)',
      border:'1px solid rgba(255,255,255,0.08)', borderRadius: 0,
      display:'flex', flexDirection:'column', gap: 8, color:'#fff', minHeight: 110
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
        <span style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color:'rgba(255,255,255,0.65)' }}>{label}</span>
        <span style={{ fontFamily:'var(--hc-mono)', fontSize: 8, letterSpacing:'0.16em', color:'rgba(255,255,255,0.4)' }}>n={effect.nOn}</span>
      </div>
      <div style={{ display:'flex', alignItems:'baseline', gap: 4 }}>
        <span style={{ fontFamily:'var(--hc-display)', fontSize: 26, lineHeight: 1, color: col, letterSpacing:'-0.02em' }}>
          {sign}{effect.delta}
        </span>
        <span style={{ fontFamily:'var(--hc-mono)', fontSize: 9, color:'rgba(255,255,255,0.5)', letterSpacing:'0.1em' }}>{unit}</span>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.14em', color:'rgba(255,255,255,0.55)' }}>
        <span>OFF · {effect.offMean}</span>
        <span style={{ color: accent }}>ON · {effect.onMean}</span>
      </div>
    </button>
  );
}

/* ---------- H₂-LENS DRILL-DOWN ---------- */
function MetricSheet({ metric, onClose, accent }) {
  if (!metric) return null;
  const data = metric.series.slice(-30);
  const { onIdx, offIdx } = splitByH2(USER);
  // splitAt = index where on-H₂ era begins (relative to slice start)
  const sliceStart = USER.cans.length - data.length;
  const splitAt = onIdx.length ? Math.max(0, onIdx[0] - sliceStart) : null;
  return (
    <div style={{
      position:'absolute', inset:0, zIndex: 50,
      background:'rgba(5,6,8,0.96)', backdropFilter:'blur(14px)',
      display:'flex', flexDirection:'column'
    }}>
      <div style={{ padding:'14px 18px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.5)' }}>{metric.src}</div>
        <button onClick={onClose} style={{ background:'transparent', border:'none', color:'#fff', cursor:'pointer', padding: 6, fontSize: 18 }}>✕</button>
      </div>
      <div style={{ padding:'14px 22px 22px', flex:1, overflow:'auto' }}>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 26, color:'#fff', letterSpacing:'-0.02em', lineHeight: 1.05 }}>{metric.label}</div>
        <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.5)', marginTop: 4 }}>THROUGH THE H₂ LENS</div>

        {metric.effect.ready ? (
          <>
            <div style={{ marginTop: 22, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 1, background:'rgba(255,255,255,0.1)' }}>
              <div style={{ padding:'14px 14px', background:'rgba(10,12,16,0.9)' }}>
                <div style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color:'rgba(255,255,255,0.5)' }}>OFF DAYS · n={metric.effect.nOff}</div>
                <div style={{ fontFamily:'var(--hc-display)', fontSize: 36, color:'#fff', marginTop: 6, lineHeight: 1, letterSpacing:'-0.02em' }}>{metric.effect.offMean}</div>
                <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, color:'rgba(255,255,255,0.45)', marginTop: 2, letterSpacing:'0.12em' }}>{metric.unit}</div>
              </div>
              <div style={{ padding:'14px 14px', background:'rgba(10,12,16,0.9)', position:'relative' }}>
                <div style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color: accent }}>ON H₂ · n={metric.effect.nOn}</div>
                <div style={{ fontFamily:'var(--hc-display)', fontSize: 36, color:'#fff', marginTop: 6, lineHeight: 1, letterSpacing:'-0.02em' }}>{metric.effect.onMean}</div>
                <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, color: accent, marginTop: 2, letterSpacing:'0.12em' }}>
                  {metric.effect.delta > 0 ? '+' : ''}{metric.effect.delta} {metric.unit}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 14, fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.18em', color:'rgba(255,255,255,0.55)' }}>
              CONFIDENCE · {metric.effect.confidence.toUpperCase()} · EFFECT SIZE {metric.effect.effectSize}σ
            </div>
          </>
        ) : (
          <div style={{ marginTop: 22, padding:'14px', background:'rgba(10,12,16,0.7)', border:'1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.55)' }}>STILL GATHERING</div>
            <div style={{ fontFamily:'var(--hc-display)', fontSize: 16, color:'#fff', marginTop: 8, lineHeight: 1.3 }}>{metric.effect.n} of 5 H₂ days logged. The split needs at least 5 days on each side before we'll show an effect.</div>
          </div>
        )}

        <div style={{ marginTop: 24, padding:'14px 0', borderTop:'1px solid rgba(255,255,255,0.08)', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.18em', color:'rgba(255,255,255,0.5)' }}>30-DAY · OFF | ON</span>
            <span style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.18em', color:'rgba(255,255,255,0.5)' }}>TODAY · {data[data.length-1]} {metric.unit}</span>
          </div>
          <Spark data={data} accent={accent} w={310} h={84} stroke={1.5} splitAt={splitAt}/>
        </div>

        <div style={{ marginTop: 22 }}>
          <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.55)', marginBottom: 10 }}>METHOD</div>
          <div style={{ fontFamily:'var(--hc-sans)', fontSize: 12.5, lineHeight: 1.55, color:'rgba(255,255,255,0.8)' }}>{metric.method}</div>
        </div>
      </div>
    </div>
  );
}

const METRIC_METHODS = {
  hrv:   'We compare your HRV (RMSSD, measured by your wearable during sleep) on mornings after you drank ≥ 2 cans vs mornings after you didn\'t. Same person, different inputs.',
  rhr:   'Resting heart rate compared between H₂ and non-H₂ days. Lower on H₂ generally means better recovery — but we only call it real once n is high enough.',
  sleep: 'Sleep efficiency (time asleep ÷ time in bed) compared across the two conditions. Read from your wearable\'s stage detection.',
  resp:  'Respiratory rate during sleep, split by H₂ exposure. Differences are subtle — we report them honestly only when statistically distinct.',
};

/* ---------- TODAY ---------- */
function ScreenToday({ tweaks, go, accent, tab, setTab }) {
  const [sheet, setSheet] = React.useState(null);
  const [checkedIn, setCheckedIn] = React.useState(USER.todayCheckedIn);
  const [energy, setEnergy] = React.useState(0);

  const t = todaySummary(USER);
  const score = h2EffectScore(USER);
  const finding = dailyFinding(USER);
  const isEve = tweaks.timeOfDay === 'evening';
  const nudge = timingNudge(USER, isEve ? 19 : 9);
  const bgImage = isEve ? T_PHOTO.bubbles : T_PHOTO.waterMacro;
  const edition = isEve ? 'EVENING EDITION' : 'MORNING EDITION';
  const time = isEve ? '19:42' : '07:14';

  const effects = {
    hrv:  h2Effect(USER, 'hrv'),
    rhr:  h2Effect(USER, 'rhr'),
    slp:  h2Effect(USER, 'sleepEff'),
    resp: h2Effect(USER, 'respRate'),
  };

  const open = (key) => {
    const map = {
      hrv:   { label:'Heart-rate variability', unit:'ms',     src:'WHOOP',        series: USER.hrv,      effect: effects.hrv,  method: METRIC_METHODS.hrv },
      rhr:   { label:'Resting heart rate',     unit:'bpm',    src:'WHOOP',        series: USER.rhr,      effect: effects.rhr,  method: METRIC_METHODS.rhr },
      slp:   { label:'Sleep efficiency',       unit:'%',      src:'Apple Health', series: USER.sleepEff, effect: effects.slp,  method: METRIC_METHODS.sleep },
      resp:  { label:'Respiratory rate',       unit:'br/min', src:'WHOOP',        series: USER.respRate, effect: effects.resp, method: METRIC_METHODS.resp },
    };
    setSheet(map[key]);
  };

  // Hero numerals — the H₂ Effect, with sign
  const ready = score.ready;
  const heroPct = ready ? Math.round(score.pct) : null;
  const heroSign = ready && heroPct >= 0 ? '+' : '';
  const ciLabel = ready ? `CI · ${score.ci.toUpperCase()} · n=${score.nOn}` : `BASELINE · DAY ${USER.dayN} OF 14`;

  return (
    <div className="app" style={{ background:'#050608', position:'relative' }}>
      {/* Macro background */}
      <div style={{ position:'absolute', top: 0, left: 0, right: 0, height: 540, zIndex: 0, overflow:'hidden' }}>
        <img src={bgImage} alt="" style={{
          width:'100%', height:'100%', objectFit:'cover',
          filter:'grayscale(0.85) brightness(0.4) contrast(1.18)',
          transform:'scale(1.05)'
        }}/>
        <div style={{ position:'absolute', inset:0,
          background:`radial-gradient(ellipse 65% 50% at 50% 38%, ${accent}1F, transparent 65%)` }}/>
        <div style={{ position:'absolute', inset:0,
          background:'linear-gradient(180deg, rgba(5,6,8,0.55) 0%, rgba(5,6,8,0.2) 28%, rgba(5,6,8,0.78) 78%, #050608 100%)' }}/>
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.06, mixBlendMode:'overlay', pointerEvents:'none' }}>
          <filter id="todaygrain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter>
          <rect width="100%" height="100%" filter="url(#todaygrain)"/>
        </svg>
      </div>

      <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', height:'100%' }}>

        {/* Masthead */}
        <div style={{ padding:'12px 22px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.7)' }}>
            HYDROCAN<span style={{ color: accent, marginLeft: 4 }}>·</span>STUDY
          </div>
          <div style={{ display:'flex', gap: 6 }}>
            <button onClick={()=>go('reminders')} style={{ background:'transparent', border:'none', color:'rgba(255,255,255,0.7)', cursor:'pointer', padding: 6 }}><T_I.bell size={15}/></button>
            <button onClick={()=>go('profile')} style={{ background:'transparent', border:'none', color:'rgba(255,255,255,0.7)', cursor:'pointer', padding: 6 }}><T_I.user size={15}/></button>
          </div>
        </div>

        {/* Edition rule */}
        <div style={{ margin:'10px 22px 0', borderTop:'1px solid rgba(255,255,255,0.18)', borderBottom:'1px solid rgba(255,255,255,0.18)',
          padding:'7px 0', display:'flex', justifyContent:'space-between' }}>
          <span style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color:'rgba(255,255,255,0.75)' }}>{edition}</span>
          <span style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color:'rgba(255,255,255,0.5)' }}>EXP · DAY {String(USER.dayN).padStart(3,'0')}</span>
          <span style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color: accent }}>{time}</span>
        </div>

        <div className="app-scroll" style={{ paddingBottom: 6 }}>

          {/* HERO — H₂ EFFECT */}
          <div style={{ padding:'30px 22px 8px', textAlign:'center' }}>
            <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.32em', color:'rgba(255,255,255,0.6)' }}>
              YOUR H₂ EFFECT
            </div>
            {ready ? (
              <>
                <div style={{ display:'inline-flex', alignItems:'flex-start', justifyContent:'center', marginTop: 14 }}>
                  <span style={{
                    fontFamily:'var(--hc-display)', fontWeight: 400,
                    fontSize: 36, marginTop: 22, color:'rgba(255,255,255,0.7)', letterSpacing:'-0.02em'
                  }}>{heroSign}</span>
                  <div style={{
                    fontFamily:'var(--hc-display)', fontWeight: 400,
                    fontSize: 144, lineHeight: 0.85, letterSpacing:'-0.04em', color:'#fff',
                    textShadow: `0 0 70px ${accent}66, 0 2px 0 rgba(0,0,0,0.4)`
                  }}>{Math.abs(heroPct)}</div>
                  <div style={{ marginLeft: 4, marginTop: 22, fontFamily:'var(--hc-display)', fontSize: 36, color:'rgba(255,255,255,0.7)', letterSpacing:'-0.02em' }}>%</div>
                </div>
                <div style={{ width: 80, height: 1, background:'rgba(255,255,255,0.25)', margin:'10px auto 8px' }}/>
                <div style={{ fontFamily:'var(--hc-display)', fontSize: 14, lineHeight: 1.4, color:'rgba(255,255,255,0.92)', maxWidth: 280, margin:'0 auto', textWrap:'pretty' }}>
                  Your body responds <span style={{ color: accent }}>{heroPct>=0?'better':'differently'}</span> on H₂ days, on average across recovery signals.
                </div>
                <div style={{ marginTop: 10, fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.5)' }}>
                  {ciLabel} · {score.nOn} ON / {score.nOff} OFF
                </div>
              </>
            ) : (
              <>
                <div style={{
                  fontFamily:'var(--hc-display)', fontSize: 96, lineHeight: 0.9, letterSpacing:'-0.03em',
                  color:'#fff', marginTop: 14
                }}>n = {score.nOn}</div>
                <div style={{ width: 80, height: 1, background:'rgba(255,255,255,0.25)', margin:'12px auto 8px' }}/>
                <div style={{ fontFamily:'var(--hc-display)', fontSize: 14, lineHeight: 1.4, color:'rgba(255,255,255,0.85)', maxWidth: 280, margin:'0 auto' }}>
                  Building your baseline. Your H₂ Effect appears once you have 5 logged days.
                </div>
              </>
            )}
            <button onClick={()=>go('coach')} style={{
              marginTop: 14, background:'rgba(10,12,16,0.6)', backdropFilter:'blur(10px)',
              border:'1px solid rgba(255,255,255,0.18)', color:'rgba(255,255,255,0.85)',
              padding:'8px 14px', cursor:'pointer',
              fontFamily:'var(--hc-mono)', fontSize: 9.5, letterSpacing:'0.22em'
            }}>HOW IS THIS CALCULATED? →</button>
          </div>

          {/* DAILY FINDING — the novelty engine */}
          <div style={{ padding:'18px 22px 4px' }}>
            <div style={{
              padding:'16px 16px',
              background:`linear-gradient(180deg, rgba(184,224,245,0.08), rgba(184,224,245,0.02))`,
              border:`1px solid ${accent}33`,
              position:'relative'
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 8 }}>
                <span style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.24em', color: accent }}>{finding.eyebrow}</span>
                <span style={{ fontFamily:'var(--hc-mono)', fontSize: 8, letterSpacing:'0.18em', color:'rgba(255,255,255,0.55)', border:'1px solid rgba(255,255,255,0.2)', padding:'2px 6px' }}>{finding.tag}</span>
              </div>
              <div style={{ fontFamily:'var(--hc-display)', fontSize: 22, lineHeight: 1.15, color:'#fff', letterSpacing:'-0.01em', textWrap:'pretty' }}>
                {finding.headline}
              </div>
              <div style={{ marginTop: 10, fontFamily:'var(--hc-sans)', fontSize: 12, lineHeight: 1.5, color:'rgba(255,255,255,0.75)' }}>
                {finding.body}
              </div>
              {finding.metric && (
                <button onClick={()=>open(finding.metric)} style={{
                  marginTop: 12, background:'transparent', border:'none', color: accent,
                  fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', cursor:'pointer', padding: 0
                }}>SEE THE BREAKDOWN →</button>
              )}
            </div>
          </div>

          {/* RITUAL — morning check-in (only AM, only if not done) */}
          {!isEve && !checkedIn && (
            <div style={{ padding:'14px 22px 4px' }}>
              <div style={{ padding:'14px 16px', background:'rgba(10,12,16,0.6)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.24em', color:'rgba(255,255,255,0.55)', marginBottom: 8 }}>¶ MORNING NOTE · 1 TAP</div>
                <div style={{ fontFamily:'var(--hc-display)', fontSize: 16, color:'#fff', lineHeight: 1.25, marginBottom: 14 }}>How does your body feel today?</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap: 6 }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={()=>{ setEnergy(n); setCheckedIn(true); }} style={{
                      padding:'10px 0',
                      background: energy===n ? accent : 'transparent',
                      border:`1px solid ${energy===n ? accent : 'rgba(255,255,255,0.18)'}`,
                      color: energy===n ? '#050608' : '#fff', cursor:'pointer',
                      fontFamily:'var(--hc-display)', fontSize: 16
                    }}>{n}</button>
                  ))}
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop: 6, fontFamily:'var(--hc-mono)', fontSize: 8, letterSpacing:'0.16em', color:'rgba(255,255,255,0.4)' }}>
                  <span>DEPLETED</span><span>RESTED</span>
                </div>
                <div style={{ marginTop: 10, fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.18em', color:'rgba(255,255,255,0.5)' }}>
                  FEEDS YOUR EXPERIMENT — WE CORRELATE THIS WITH H₂ DAYS.
                </div>
              </div>
            </div>
          )}
          {checkedIn && !isEve && (
            <div style={{ padding:'10px 22px 4px' }}>
              <div style={{ padding:'10px 14px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(10,12,16,0.45)', border:'1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color: accent }}>✓ LOGGED · {energy}/5</span>
                <span style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.18em', color:'rgba(255,255,255,0.5)' }}>FED TO STUDY</span>
              </div>
            </div>
          )}

          {/* SIGNALS — through the H₂ lens */}
          <div style={{ padding:'18px 22px 8px', display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
            <span style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.6)' }}>¶ SIGNALS · ON H₂ vs OFF</span>
            <button onClick={()=>go('trends')} style={{ background:'transparent', border:'none', color: accent, cursor:'pointer', fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em' }}>FULL STUDY →</button>
          </div>

          <div style={{ padding:'0 22px 14px', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 6 }}>
            <MetricTile label="HRV"        unit="ms"     effect={effects.hrv}  invert={false} accent={accent} onTap={()=>open('hrv')}/>
            <MetricTile label="RESTING HR" unit="bpm"    effect={effects.rhr}  invert={true}  accent={accent} onTap={()=>open('rhr')}/>
            <MetricTile label="SLEEP EFF." unit="%"      effect={effects.slp}  invert={false} accent={accent} onTap={()=>open('slp')}/>
            <MetricTile label="RESP. RATE" unit="br/min" effect={effects.resp} invert={true}  accent={accent} onTap={()=>open('resp')}/>
          </div>

          {/* TIMING NUDGE — subtle, only if relevant */}
          {nudge && (
            <div style={{ padding:'4px 22px 14px' }}>
              <div style={{ padding:'10px 14px', borderLeft:`2px solid ${accent}`, background:'rgba(184,224,245,0.05)' }}>
                <div style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color: accent, marginBottom: 4 }}>¶ TIMING</div>
                <div style={{ fontFamily:'var(--hc-display)', fontSize: 13, lineHeight: 1.4, color:'rgba(255,255,255,0.85)', textWrap:'pretty' }}>{nudge.copy}</div>
              </div>
            </div>
          )}

          {/* HYDRATION + LOG */}
          <div style={{ padding:'4px 22px 10px', display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
            <span style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.6)' }}>¶ TODAY · LOG</span>
            <span style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.18em', color:'rgba(255,255,255,0.5)' }}>{t.hydration.cans}/{t.hydration.goal} CANS · DAY {USER.dayN}</span>
          </div>
          <div style={{ padding:'0 22px 22px' }}>
            <div style={{ display:'flex', gap: 6, marginBottom: 10 }}>
              {Array.from({length: t.hydration.goal}).map((_,i)=>{
                const filled = i < t.hydration.cans;
                return (
                  <div key={i} style={{
                    flex: 1, height: 36,
                    background: filled ? accent : 'transparent',
                    border: `1px solid ${filled ? accent : 'rgba(255,255,255,0.18)'}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:'var(--hc-mono)', fontSize: 10, letterSpacing:'0.16em',
                    color: filled ? '#050608' : 'rgba(255,255,255,0.4)'
                  }}>{String(i+1).padStart(2,'0')}</div>
                );
              })}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 6 }}>
              <button onClick={()=>go('log')} style={{
                background: accent, color:'#050608', border:'none', padding:'13px',
                fontFamily:'var(--hc-display)', fontSize: 14, cursor:'pointer',
                display:'flex', justifyContent:'space-between', alignItems:'center'
              }}>
                <span>Log a can</span><T_I.plus size={14}/>
              </button>
              <button onClick={()=>go('scan')} style={{
                background:'transparent', color:'#fff', border:'1px solid rgba(255,255,255,0.18)', padding:'13px',
                fontFamily:'var(--hc-display)', fontSize: 14, cursor:'pointer',
                display:'flex', justifyContent:'space-between', alignItems:'center'
              }}>
                <span>Scan can</span><T_I.scan size={14}/>
              </button>
            </div>
          </div>

          {/* Sources footer */}
          <div style={{ padding:'14px 22px 22px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color:'rgba(255,255,255,0.4)', marginBottom: 8 }}>SIGNALS PIPED FROM</div>
            <div style={{ display:'flex', gap: 14, flexWrap:'wrap' }}>
              {['WHOOP','APPLE HEALTH'].map(s=>(
                <div key={s} style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.16em', color:'rgba(255,255,255,0.65)', display:'flex', alignItems:'center', gap: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius:'50%', background: accent }}/> {s}
                </div>
              ))}
              <button onClick={()=>go('connect')} style={{ background:'transparent', border:'none', color: accent, cursor:'pointer', fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.16em' }}>+ ADD SOURCE</button>
            </div>
          </div>
        </div>

        <T_BottomTabs active={tab} onTab={setTab} accent={accent}/>
      </div>

      {sheet && <MetricSheet metric={sheet} onClose={()=>setSheet(null)} accent={accent}/>}
    </div>
  );
}

window.HCToday = { ScreenToday };
