// Hydrocan Health — Onboarding, Coach, Notifications

function ScreenOnboarding({ tweaks, onNav }) {
  const [step, setStep] = React.useState(0);
  const steps = [
    { k: 'hero' },
    { k: 'goal' },
    { k: 'connect' },
  ];

  if (step === 0) {
    return (
      <div className="hc-fade-up" style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', background: 'radial-gradient(ellipse at top, rgba(77,184,255,0.15) 0%, transparent 60%), var(--app-bg)' }}>
        <div style={{ padding: '24px 20px 0' }}><Wordmark size={16}/></div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 24px', position: 'relative' }}>
          <div className="ambient-ring" style={{ width: 200, height: 200, borderColor: 'var(--hc-accent)' }}/>
          <div className="ambient-ring" style={{ width: 200, height: 200, borderColor: 'var(--hc-accent)', animationDelay: '1.25s' }}/>
          <div style={{ width: 60, height: 120, background: 'linear-gradient(180deg, #e8eaec 0%, #7a8185 100%)', borderRadius: 5, marginBottom: 40, boxShadow: '0 20px 60px rgba(77,184,255,0.3)' }}/>
          <div className="hc-label" style={{ color: 'var(--hc-accent)', marginBottom: 16 }}>Pure water · Measured impact</div>
          <div style={{ fontSize: 40, fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1, textAlign: 'center', marginBottom: 16 }}>Hydration, <span style={{ fontWeight: 700 }}>quantified.</span></div>
          <div style={{ fontSize: 14, color: 'var(--app-muted)', textAlign: 'center', maxWidth: 280, lineHeight: 1.55 }}>Every can logged. Every ml tied to recovery. Built for the way you train.</div>
        </div>
        <div style={{ padding: '0 20px 28px' }}>
          <button className="hc-btn hc-btn-primary" style={{ width: '100%', padding: 16 }} onClick={() => setStep(1)}>Begin</button>
          <button style={{ width: '100%', padding: 14, background: 'transparent', border: 0, color: 'var(--app-muted)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>I already have an account</button>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="hc-fade-up" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px 24px' }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
          {[0,1,2].map(i => <div key={i} style={{ flex: 1, height: 2, borderRadius: 9999, background: i <= 1 ? 'var(--hc-accent)' : 'var(--app-surface-3)' }}/>)}
        </div>
        <div className="hc-label" style={{ color: 'var(--app-muted)' }}>Step 2 of 3</div>
        <div style={{ fontSize: 32, fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: 8, marginBottom: 10 }}>Your daily <span style={{ fontWeight: 700 }}>goal</span></div>
        <div style={{ fontSize: 13, color: 'var(--app-muted)', marginBottom: 28, lineHeight: 1.5 }}>We'll tune this with your Whoop strain and Dubai humidity.</div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div className="hc-metric" style={{ fontSize: 120, color: 'var(--hc-accent)', textShadow: '0 0 60px var(--hc-accent-glow)' }}>{tweaks.goal.toFixed(1)}<span style={{ fontSize: 32, opacity: 0.4, marginLeft: 8 }}>L</span></div>
            <div className="hc-label" style={{ color: 'var(--app-muted)', marginTop: 8 }}>≈ {Math.round(tweaks.goal * 1000 / 330)} cans</div>
          </div>
          <div style={{ padding: '0 8px' }}>
            <div style={{ position: 'relative', height: 4, background: 'var(--app-surface-2)', borderRadius: 9999 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${((tweaks.goal - 1.5) / 2.5) * 100}%`, background: 'var(--hc-accent)', borderRadius: 9999, boxShadow: '0 0 12px var(--hc-accent-glow)' }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 10, color: 'var(--app-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
              <span>1.5L</span><span>4.0L</span>
            </div>
          </div>
        </div>

        <button className="hc-btn hc-btn-primary" style={{ width: '100%', padding: 16, marginTop: 18 }} onClick={() => setStep(2)}>Continue</button>
      </div>
    );
  }

  // step 2
  return (
    <div className="hc-fade-up" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px 24px' }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
        {[0,1,2].map(i => <div key={i} style={{ flex: 1, height: 2, borderRadius: 9999, background: 'var(--hc-accent)' }}/>)}
      </div>
      <div className="hc-label" style={{ color: 'var(--app-muted)' }}>Step 3 of 3</div>
      <div style={{ fontSize: 32, fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: 8, marginBottom: 10 }}>Connect your <span style={{ fontWeight: 700 }}>recovery</span></div>
      <div style={{ fontSize: 13, color: 'var(--app-muted)', marginBottom: 24, lineHeight: 1.5 }}>Tie hydration to HRV, sleep, strain — the data you already trust.</div>

      {[
        { n: 'Whoop', d: 'HRV · Strain · Recovery', ico: Ico.whoop, on: true, rec: true },
        { n: 'Apple Health', d: 'Workouts · Sleep', ico: Ico.apple, on: true },
        { n: 'Google Fit', d: 'Activity · Steps', ico: Ico.google, on: false },
        { n: 'Oura', d: 'Sleep · Readiness', ico: Ico.activity, on: false },
      ].map((s, i, arr) => (
        <div key={s.n} className="hc-card" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 14, borderColor: s.rec ? 'var(--hc-accent)' : 'var(--app-border)' }}>
          <div style={{ width: 40, height: 40, borderRadius: 6, background: 'var(--app-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.on ? 'var(--hc-accent)' : 'var(--app-muted)' }}><s.ico/></div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{s.n}</div>
              {s.rec && <span style={{ fontSize: 8, letterSpacing: '0.2em', fontWeight: 700, padding: '2px 6px', background: 'var(--hc-accent)', color: '#0a0a0a', borderRadius: 3 }}>RECOMMENDED</span>}
            </div>
            <div style={{ fontSize: 10, color: 'var(--app-muted)', marginTop: 2, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.d}</div>
          </div>
          {s.on ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--hc-green)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--hc-green)', boxShadow: '0 0 8px var(--hc-green)' }}/>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>LINKED</span>
            </div>
          ) : (
            <button className="hc-chip" style={{ fontSize: 10 }}>Link</button>
          )}
        </div>
      ))}

      <div style={{ flex: 1 }}/>
      <button className="hc-btn hc-btn-primary" style={{ width: '100%', padding: 16, marginTop: 16 }} onClick={() => onNav('home')}>Enter Hydrocan</button>
    </div>
  );
}

function ScreenCoach({ tweaks, onNav }) {
  const messages = [
    { r: 'hydro', t: 'Morning Layla. HRV is up to 62ms — a good sign. Your recovery window is open for high strain today.' },
    { r: 'hydro', t: 'Based on Whoop, I\'d suggest 2.8L today and front-loading before noon. Ready?' },
    { r: 'me', t: 'How did yesterday compare?' },
    { r: 'hydro', insight: true },
  ];
  return (
    <div className="hc-fade-up" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid var(--app-border)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => onNav('home')} style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)', borderRadius: 8, padding: 8, color: 'var(--app-fg)', cursor: 'pointer' }}><Ico.chevL/></button>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, var(--hc-accent), var(--hc-green))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a' }}><Ico.sparkle/></div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}>Hydro</div>
          <div style={{ fontSize: 10, color: 'var(--hc-green)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>● ONLINE · Reads Whoop, Apple</div>
        </div>
      </div>

      <div className="scroll-y" style={{ flex: 1, padding: '20px 20px 10px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.r === 'me' ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
            {m.insight ? (
              <div style={{ maxWidth: '88%' }}>
                <div className="hc-card" style={{ padding: 16, background: 'linear-gradient(135deg, rgba(77,184,255,0.08), transparent)', border: '1px solid rgba(77,184,255,0.3)' }}>
                  <div className="hc-label" style={{ color: 'var(--hc-accent)', marginBottom: 10 }}>Yesterday vs 7-day</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid var(--app-border)' }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--app-muted)' }}>Hydration</div>
                      <div className="hc-metric-bold" style={{ fontSize: 22, color: 'var(--hc-accent)' }}>2.4L</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--app-muted)' }}>HRV</div>
                      <div className="hc-metric-bold" style={{ fontSize: 22, color: 'var(--hc-green)' }}>62ms</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--app-muted)' }}>Recovery</div>
                      <div className="hc-metric-bold" style={{ fontSize: 22 }}>84%</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--app-fg)', lineHeight: 1.5 }}>Your best numbers this month. The correlation is clear — hydration before noon.</div>
                </div>
              </div>
            ) : (
              <div style={{ maxWidth: '80%', padding: '12px 16px', borderRadius: 14, fontSize: 13, lineHeight: 1.5,
                background: m.r === 'me' ? 'var(--hc-accent)' : 'var(--app-surface)',
                color: m.r === 'me' ? '#0a0a0a' : 'var(--app-fg)',
                border: m.r === 'me' ? 0 : '1px solid var(--app-border)',
              }}>{m.t}</div>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: '10px 20px', display: 'flex', gap: 6, overflowX: 'auto' }} className="scroll-x">
        {['Build today\'s plan', 'Sauna protocol', 'Before flight', 'Post-workout'].map(s => <button key={s} className="hc-chip" style={{ fontSize: 11 }}>{s}</button>)}
      </div>

      <div style={{ padding: '10px 16px 20px', borderTop: '1px solid var(--app-border)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1, background: 'var(--app-surface)', border: '1px solid var(--app-border)', borderRadius: 9999, padding: '12px 18px', fontSize: 13, color: 'var(--app-muted)' }}>Ask Hydro…</div>
        <button style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--hc-accent)', border: 0, color: '#0a0a0a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px var(--hc-accent-glow)' }}><Ico.mic/></button>
      </div>
    </div>
  );
}

function ScreenNotifications({ tweaks, onNav }) {
  const items = [
    { g: 'TODAY', items: [
      { t: 'Time to hydrate', d: 'You\'re 42% toward goal. 15 mins since your last log.', ico: Ico.droplet, accent: true, time: '2m' },
      { t: 'Recovery unlocked', d: 'Whoop shows HRV at 62ms. Your window for strain is open.', ico: Ico.heart, time: '1h', color: 'var(--hc-green)' },
      { t: 'Hydro: pattern detected', d: 'Morning drinkers hit goal 3× more often. Try a can before 9am.', ico: Ico.sparkle, time: '3h' },
    ]},
    { g: 'YESTERDAY', items: [
      { t: 'Goal complete', d: '2.4L · your best day this month.', ico: Ico.check, time: '1d', color: 'var(--hc-green)' },
      { t: 'Delivery confirmed', d: '24-pack dispatched · arrives Wed 22 Apr.', ico: Ico.truck, time: '1d' },
    ]},
    { g: 'THIS WEEK', items: [
      { t: 'New batch', d: 'Signature 330 · Batch DXB-A102 · now scanning available.', ico: Ico.refresh, time: '3d' },
    ]},
  ];
  return (
    <div className="hc-fade-up" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--app-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => onNav('home')} style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)', borderRadius: 8, padding: 8, color: 'var(--app-fg)', cursor: 'pointer' }}><Ico.chevL/></button>
          <div>
            <div className="hc-label" style={{ color: 'var(--app-muted)' }}>Notifications</div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 2 }}>6 new</div>
          </div>
        </div>
        <button style={{ background: 'transparent', border: 0, color: 'var(--hc-accent)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>Clear</button>
      </div>

      <div className="scroll-y" style={{ flex: 1, padding: '12px 20px 24px' }}>
        {items.map(g => (
          <div key={g.g}>
            <div className="hc-label" style={{ color: 'var(--app-muted)', margin: '16px 0 8px' }}>{g.g}</div>
            {g.items.map((n, i) => (
              <div key={i} className="hc-card" style={{ marginBottom: 6, padding: 14, display: 'flex', gap: 12, borderColor: n.accent ? 'rgba(77,184,255,0.4)' : 'var(--app-border)', background: n.accent ? 'linear-gradient(135deg, rgba(77,184,255,0.06), transparent)' : 'var(--app-surface)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--app-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: n.color || (n.accent ? 'var(--hc-accent)' : 'var(--app-muted)') }}><n.ico/></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{n.t}</div>
                    <div style={{ fontSize: 10, color: 'var(--app-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', flexShrink: 0 }}>{n.time}</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--app-muted)', lineHeight: 1.5 }}>{n.d}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenOnboarding, ScreenCoach, ScreenNotifications });
