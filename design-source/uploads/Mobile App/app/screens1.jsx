// Hydrocan Health — Screens (Whoop-inspired)

function ScreenHome({ tweaks, onNav }) {
  const pct = Math.min(100, Math.round((1.8 / tweaks.goal) * 100));
  return (
    <div className="scroll-y hc-fade-up" style={{ flex: 1, padding: '16px 20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <Wordmark size={16}/>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onNav('notifications')} style={{ position: 'relative', background: 'var(--app-surface)', border: '1px solid var(--app-border)', borderRadius: 8, padding: 8, color: 'var(--app-fg)', cursor: 'pointer' }}>
            <Ico.bell/>
            <span style={{ position: 'absolute', top: 5, right: 5, width: 6, height: 6, borderRadius: '50%', background: 'var(--hc-accent)' }}/>
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 4 }}>
        <div className="hc-label" style={{ color: 'var(--app-muted)' }}>SUN · 19 APR · <span style={{ color: 'var(--hc-accent)' }}>DUBAI 31°</span></div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 200, letterSpacing: '-0.03em', marginBottom: 22, lineHeight: 1.1 }}>
        Morning, <span style={{ fontWeight: 700 }}>Layla</span>
      </div>

      {/* Hero ring */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 24px' }}>
        <ScoreRing pct={pct} variant={tweaks.heroVariant} detail={`${(1.8).toFixed(1)}L of ${tweaks.goal}L`} size={240}/>
      </div>

      {/* Primary metric row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
        <MetricCard label="Recovery" value="84" unit="%" trend="+6" color="var(--hc-green)" spark={[60,65,72,70,78,80,84]}/>
        <MetricCard label="Strain" value="13.4" trend="-1.2" spark={[8,14,11,16,12,13,13.4]}/>
        <MetricCard label="Sleep" value="7.2" unit="h" trend="+0.3" spark={[6.2,6.8,7,6.5,7.1,7.3,7.2]}/>
      </div>

      {/* Recovery insight banner (Whoop style — big color strip) */}
      <div className="hc-card" style={{ marginBottom: 12, padding: 0, overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(90deg, var(--hc-green) 0%, rgba(0,217,126,0.6) 60%, transparent 100%)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 42, fontWeight: 800, color: '#0a0a0a', fontFamily: 'var(--font-metric)', letterSpacing: '-0.04em' }}>84</div>
          <div>
            <div className="hc-label" style={{ color: '#0a0a0a', opacity: 0.7 }}>Recovery · via Whoop</div>
            <div style={{ color: '#0a0a0a', fontSize: 13, fontWeight: 600, marginTop: 2 }}>Primed for high strain</div>
          </div>
        </div>
        <div style={{ padding: '14px 18px', fontSize: 12, color: 'var(--app-muted)', lineHeight: 1.55 }}>
          HRV <span style={{ color: 'var(--app-fg)', fontFamily: 'var(--font-mono)' }}>62ms</span> (+4) · RHR <span style={{ color: 'var(--app-fg)', fontFamily: 'var(--font-mono)' }}>48bpm</span> · Hydration will lift HRV another 8% today.
        </div>
      </div>

      {/* Quick log */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        <button onClick={() => onNav('log')} style={{ background: 'var(--hc-accent)', color: '#0a0a0a', border: 0, borderRadius: 8, padding: 16, textAlign: 'left', cursor: 'pointer', boxShadow: '0 0 20px var(--hc-accent-glow)' }}>
          <Ico.droplet/>
          <div style={{ fontWeight: 800, fontSize: 18, marginTop: 18, letterSpacing: '-0.01em' }}>Log a can</div>
          <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>330ml · +13%</div>
        </button>
        <button onClick={() => onNav('scan')} className="hc-card" style={{ cursor: 'pointer', padding: 16, textAlign: 'left', background: 'var(--app-surface)' }}>
          <Ico.scan/>
          <div style={{ fontWeight: 800, fontSize: 18, marginTop: 18, letterSpacing: '-0.01em' }}>Scan</div>
          <div style={{ fontSize: 10, color: 'var(--app-muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>NFC · QR</div>
        </button>
      </div>

      {/* Timeline */}
      <div className="hc-card" style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div className="hc-label" style={{ color: 'var(--app-muted)' }}>Today's intake</div>
          <span style={{ fontSize: 10, color: 'var(--app-muted)', fontFamily: 'var(--font-mono)' }}>5 logs · 1.8L</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60 }}>
          {[0.1,0.2,0.35,0.15,0.08,0.6,0.4,0.7,0.9,1.0,0.6,0.3].map((v,i) => (
            <div key={i} style={{ flex: 1, height: `${v*100}%`, background: i===9 ? 'var(--hc-accent)' : 'var(--app-surface-3)', borderRadius: 2, boxShadow: i===9?'0 0 10px var(--hc-accent-glow)':'none' }}/>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 9, color: 'var(--app-muted-2)', letterSpacing: '0.14em', fontFamily: 'var(--font-mono)' }}>
          <span>6A</span><span>12P</span><span>6P</span><span>12A</span>
        </div>
      </div>

      {/* Coach insight */}
      <button onClick={() => onNav('coach')} className="hc-card" style={{ width: '100%', textAlign: 'left', cursor: 'pointer', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ color: 'var(--hc-accent)' }}><Ico.sparkle/></div>
          <span className="hc-label" style={{ color: 'var(--hc-accent)' }}>Hydro · Insight</span>
          <span style={{ marginLeft: 'auto', color: 'var(--app-muted)' }}><Ico.chev/></span>
        </div>
        <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.01em' }}>
          Your HRV rises <span style={{ color: 'var(--hc-accent)', fontWeight: 700 }}>+14%</span> on days you drink 2L before noon.
        </div>
        <div style={{ fontSize: 10, color: 'var(--app-muted)', marginTop: 8, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Based on 28 days · Whoop</div>
      </button>

      {/* Subscription */}
      <button onClick={() => onNav('subscription')} className="hc-card" style={{ width: '100%', display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer', textAlign: 'left', background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}>
        <div style={{ width: 38, height: 48, background: 'linear-gradient(180deg, #d8dada 0%, #a0a5a8 100%)', borderRadius: 3 }}/>
        <div style={{ flex: 1 }}>
          <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 4 }}>Next delivery</div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>24-pack · Wed 22 Apr</div>
        </div>
        <Ico.chev/>
      </button>
    </div>
  );
}

function ScreenLog({ tweaks, onNav }) {
  const [amount, setAmount] = React.useState(330);
  return (
    <div className="scroll-y hc-fade-up" style={{ flex: 1, padding: '16px 20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
        <button onClick={() => onNav('home')} style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)', borderRadius: 8, padding: 8, color: 'var(--app-fg)', cursor: 'pointer' }}><Ico.chevL/></button>
        <div className="hc-label" style={{ color: 'var(--app-muted)' }}>Log Hydration</div>
      </div>

      <div style={{ textAlign: 'center', margin: '24px 0 28px' }}>
        <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 14 }}>Volume</div>
        <div className="hc-metric" style={{ fontSize: 110, color: 'var(--hc-accent)', textShadow: '0 0 50px var(--hc-accent-glow)' }}>{amount}<span style={{ fontSize: 26, opacity: 0.4, marginLeft: 6 }}>ml</span></div>
        <div style={{ fontSize: 11, color: 'var(--app-muted)', marginTop: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>+{((amount/1000)/tweaks.goal*100).toFixed(0)}% toward goal</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 18, overflowX: 'auto' }} className="scroll-x">
        {[250, 330, 500, 1000].map(a => (
          <button key={a} className="hc-chip hc-chip-accent" data-active={amount === a} onClick={() => setAmount(a)}>{a === 1000 ? '1L' : `${a}ml`}</button>
        ))}
      </div>

      <div className="hc-card" style={{ marginBottom: 10 }}>
        <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 12 }}>Timing</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Now', '15m ago', '30m ago', '1h ago', 'Custom'].map((o,i) => <button key={o} className="hc-chip" data-active={i===0}>{o}</button>)}
        </div>
      </div>

      <div className="hc-card" style={{ marginBottom: 10 }}>
        <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 12 }}>Context</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Post-workout', 'Morning', 'With meal', 'Sauna', 'Flight'].map((o,i) => <button key={o} className="hc-chip" data-active={i===0}>{o}</button>)}
        </div>
      </div>

      <div className="hc-card" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 4 }}>Sync</div>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--app-fg)' }}>APPLE · WHOOP</div>
        </div>
        <div style={{ width: 36, height: 22, borderRadius: 9999, background: 'var(--hc-accent)', padding: 2, display: 'flex' }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#0a0a0a', marginLeft: 'auto' }}/>
        </div>
      </div>

      <button className="hc-btn hc-btn-primary" style={{ width: '100%', padding: 16 }} onClick={() => onNav('home')}>Log {amount}ml</button>
    </div>
  );
}

function ScreenRecovery({ tweaks, onNav }) {
  return (
    <div className="scroll-y hc-fade-up" style={{ flex: 1, padding: '16px 20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button onClick={() => onNav('home')} style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)', borderRadius: 8, padding: 8, color: 'var(--app-fg)', cursor: 'pointer' }}><Ico.chevL/></button>
        <div className="hc-label" style={{ color: 'var(--app-muted)' }}>Recovery · Whoop</div>
      </div>

      {/* Big stat */}
      <div style={{ textAlign: 'center', margin: '20px 0 32px' }}>
        <ScoreRing pct={84} size={220} color="var(--hc-green)" label="RECOVERY" detail="HRV 62ms · +14%" variant="ring"/>
      </div>

      {/* Correlation card */}
      <div className="hc-card" style={{ marginBottom: 10, padding: 20, background: 'linear-gradient(135deg, rgba(77,184,255,0.08) 0%, transparent 70%)', border: '1px solid rgba(77,184,255,0.3)' }}>
        <div className="hc-label" style={{ color: 'var(--hc-accent)' }}>28-day correlation</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 10 }}>
          <div className="hc-metric-bold" style={{ fontSize: 56, color: 'var(--hc-accent)' }}>+14<span style={{ fontSize: 22, opacity: 0.5 }}>%</span></div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--app-muted)', lineHeight: 1.5, marginTop: 8 }}>HRV uplift on days you hit your hydration goal before 12pm.</div>

        <svg viewBox="0 0 200 60" style={{ width: '100%', height: 60, marginTop: 16 }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="scat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--hc-accent)" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="var(--hc-accent)" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon points="0,50 200,50 200,60 0,60" fill="var(--app-surface-3)" opacity="0"/>
          <polyline points="10,45 30,42 50,38 70,34 90,28 110,23 130,18 150,14 170,10 190,8" fill="none" stroke="var(--hc-accent)" strokeWidth="1.5"/>
          {[[10,45],[30,42],[50,38],[70,34],[90,28],[110,23],[130,18],[150,14],[170,10],[190,8]].map((p,i) => <circle key={i} cx={p[0]} cy={p[1]} r="2" fill="var(--hc-accent)"/>)}
        </svg>
      </div>

      {/* Metric grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        <MetricCard label="Avg HRV" value="62" unit="ms" trend="+4" spark={[50,55,58,60,59,61,62]}/>
        <MetricCard label="Resting HR" value="48" unit="bpm" trend="-2" color="var(--hc-green)" spark={[52,51,50,49,48,48,48]}/>
        <MetricCard label="Sleep perf" value="92" unit="%" trend="+3" spark={[85,88,90,89,91,90,92]}/>
        <MetricCard label="Strain" value="13.4" trend="-1.2" color="var(--hc-amber)" spark={[8,14,11,16,12,13,13.4]}/>
      </div>

      {/* Data sources */}
      <div className="hc-card">
        <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 14 }}>Connected devices</div>
        {[
          { l: 'Whoop 4.0', d: 'Live · 28 days', ico: Ico.whoop, on: true },
          { l: 'Apple Health', d: 'Live · workouts, sleep', ico: Ico.apple, on: true },
          { l: 'Google Fit', d: 'Not connected', ico: Ico.google, on: false },
        ].map((s, i, arr) => (
          <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--app-border)' : 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: 6, background: 'var(--app-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.on ? 'var(--hc-accent)' : 'var(--app-muted-2)' }}><s.ico/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{s.l}</div>
              <div style={{ fontSize: 10, color: 'var(--app-muted)', marginTop: 2, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.d}</div>
            </div>
            {s.on ? <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--hc-green)', boxShadow: '0 0 8px var(--hc-green)' }}/> : <span style={{ color: 'var(--app-muted)' }}><Ico.chev/></span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenTrends({ tweaks, onNav }) {
  const [range, setRange] = React.useState('W');
  const data = [1.6, 2.1, 1.8, 2.4, 2.2, 1.9, 1.8];
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div className="scroll-y hc-fade-up" style={{ flex: 1, padding: '16px 20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="hc-label" style={{ color: 'var(--app-muted)' }}>Trends</div>
        <div style={{ display: 'flex', gap: 2, padding: 3, background: 'var(--app-surface)', border: '1px solid var(--app-border)', borderRadius: 6 }}>
          {['D', 'W', 'M', 'Y'].map(r => (
            <button key={r} onClick={() => setRange(r)} style={{
              padding: '5px 12px', borderRadius: 4, border: 0,
              background: range === r ? 'var(--hc-accent)' : 'transparent',
              color: range === r ? '#0a0a0a' : 'var(--app-fg)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', cursor: 'pointer', fontFamily: 'var(--font-mono)',
            }}>{r}</button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 32, fontWeight: 200, letterSpacing: '-0.03em', marginBottom: 2 }}>This week</div>
      <div style={{ fontSize: 11, color: 'var(--app-muted)', marginBottom: 22, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>13 — 19 APR 2026</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, marginBottom: 22, padding: '20px 0', borderTop: '1px solid var(--app-border)', borderBottom: '1px solid var(--app-border)' }}>
        <div>
          <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 6 }}>AVG DAILY</div>
          <div className="hc-metric" style={{ fontSize: 36, color: 'var(--hc-accent)' }}>1.97<span style={{ fontSize: 12, opacity: 0.4 }}>L</span></div>
        </div>
        <div style={{ borderLeft: '1px solid var(--app-border)', paddingLeft: 16 }}>
          <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 6 }}>GOAL HITS</div>
          <div className="hc-metric" style={{ fontSize: 36 }}>4<span style={{ fontSize: 12, opacity: 0.4 }}>/7</span></div>
        </div>
        <div style={{ borderLeft: '1px solid var(--app-border)', paddingLeft: 16 }}>
          <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 6 }}>STREAK</div>
          <div className="hc-metric" style={{ fontSize: 36, color: 'var(--hc-green)' }}>12<span style={{ fontSize: 12, opacity: 0.4 }}>d</span></div>
        </div>
      </div>

      <div className="hc-card" style={{ marginBottom: 10 }}>
        <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 20 }}>Daily intake · Litres</div>
        <BarChart data={data} labels={labels} h={140} highlight={6} goal={tweaks.goal}/>
      </div>

      <div className="hc-card" style={{ marginBottom: 10 }}>
        <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 14 }}>Patterns detected</div>
        {[
          { t: 'Highest on training days', n: '+0.6L', ok: true },
          { t: 'Fridays drop 19% vs weekdays', n: '−0.4L', ok: false },
          { t: 'Morning intake lifts HRV', n: '+14%', ok: true },
        ].map((p, i, arr) => (
          <div key={p.t} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--app-border)' : 0 }}>
            <div style={{ fontSize: 13, maxWidth: '70%' }}>{p.t}</div>
            <div className="hc-metric-bold" style={{ fontSize: 18, color: p.ok ? 'var(--hc-green)' : 'var(--hc-red)' }}>{p.n}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenHome, ScreenLog, ScreenRecovery, ScreenTrends });
