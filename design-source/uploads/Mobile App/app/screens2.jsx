// Hydrocan Health — Screens part 2

function ScreenScan({ tweaks, onNav }) {
  return (
    <div className="hc-fade-up" style={{ flex: 1, position: 'relative', background: '#000', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Camera view mockup */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000 80%)' }}>
        {/* Simulated can */}
        <div style={{ position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%, -50%)', width: 90, height: 160, background: 'linear-gradient(180deg, #d8dada 0%, #8f9599 100%)', borderRadius: '6px 6px 4px 4px', boxShadow: '0 10px 40px rgba(0,0,0,0.6)' }}>
          <div style={{ position: 'absolute', top: 28, left: 10, right: 10, fontSize: 9, fontWeight: 900, letterSpacing: '-0.02em', color: '#0a0a0a', textAlign: 'center' }}>HYDROCAN</div>
          <div style={{ position: 'absolute', bottom: 18, left: 10, right: 10, fontSize: 7, color: '#0a0a0a', textAlign: 'center', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>SIGNATURE · 330ml</div>
        </div>
      </div>

      {/* Overlay */}
      <div style={{ position: 'relative', zIndex: 2, padding: '16px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => onNav('home')} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: 10, color: '#fff', cursor: 'pointer' }}><Ico.close/></button>
        <button style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: 10, color: '#fff', cursor: 'pointer' }}><Ico.flash/></button>
      </div>

      {/* Scan target */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 220, height: 220, pointerEvents: 'none' }}>
        {['0 0', '0 100%', '100% 0', '100% 100%'].map((pos, i) => {
          const [x, y] = pos.split(' ');
          return <div key={i} style={{
            position: 'absolute', left: x, top: y,
            transform: `translate(${x === '0' ? '0' : '-100%'}, ${y === '0' ? '0' : '-100%'})`,
            width: 32, height: 32,
            borderLeft: x === '0' ? '2px solid var(--hc-accent)' : 0,
            borderRight: x !== '0' ? '2px solid var(--hc-accent)' : 0,
            borderTop: y === '0' ? '2px solid var(--hc-accent)' : 0,
            borderBottom: y !== '0' ? '2px solid var(--hc-accent)' : 0,
            filter: 'drop-shadow(0 0 8px var(--hc-accent-glow))',
          }}/>;
        })}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--hc-accent)', boxShadow: '0 0 20px var(--hc-accent)', animation: 'scan-pulse 2s ease-in-out infinite' }}/>
      </div>
      <style>{`@keyframes scan-pulse { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }`}</style>

      <div style={{ flex: 1 }}/>

      {/* Bottom sheet */}
      <div style={{ position: 'relative', zIndex: 2, background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: '22px 22px 30px' }}>
        <div className="hc-label" style={{ color: 'var(--hc-accent)', marginBottom: 8 }}>Detected</div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Hydrocan Signature</div>
        <div style={{ fontSize: 12, color: 'var(--app-muted)', marginTop: 4, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>330ml · BATCH DXB-A102 · 16 APR</div>

        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
          <button className="hc-btn hc-btn-outline" style={{ flex: 1, color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }} onClick={() => onNav('product')}>Details</button>
          <button className="hc-btn hc-btn-primary" style={{ flex: 1 }} onClick={() => onNav('home')}>Log 330ml</button>
        </div>
      </div>
    </div>
  );
}

function ScreenProduct({ tweaks, onNav }) {
  return (
    <div className="scroll-y hc-fade-up" style={{ flex: 1 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 320, background: 'linear-gradient(180deg, #1a1a1a 0%, var(--app-bg) 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 16, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', zIndex: 3 }}>
          <button onClick={() => onNav('home')} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: 8, color: '#fff', cursor: 'pointer', backdropFilter: 'blur(10px)' }}><Ico.chevL/></button>
          <button style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: 8, color: '#fff', cursor: 'pointer', backdropFilter: 'blur(10px)' }}><Ico.more/></button>
        </div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 110, height: 220, background: 'linear-gradient(180deg, #e8eaec 0%, #7a8185 100%)', borderRadius: '8px 8px 6px 6px', boxShadow: '0 30px 80px rgba(77,184,255,0.25), 0 0 100px rgba(77,184,255,0.15)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 40, left: 10, right: 10, textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '-0.02em', color: '#0a0a0a' }}>HYDROCAN</div>
              <div style={{ fontSize: 6, color: '#0a0a0a', opacity: 0.6, letterSpacing: '0.2em', marginTop: 4 }}>SIGNATURE</div>
            </div>
            <div style={{ position: 'absolute', bottom: 24, left: 10, right: 10, fontSize: 6, color: '#0a0a0a', textAlign: 'center', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>330 ML · e</div>
          </div>
        </div>
        <div className="ambient-ring" style={{ width: 280, height: 280, top: '50%', left: '50%', marginTop: -140, marginLeft: -140, borderColor: 'var(--hc-accent)' }}/>
      </div>

      <div style={{ padding: '20px 20px 24px' }}>
        <div className="hc-label" style={{ color: 'var(--hc-accent)', marginBottom: 8 }}>Signature · Still</div>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>Hydrocan 330</div>
        <div style={{ fontSize: 14, color: 'var(--app-muted)', marginTop: 8, lineHeight: 1.55 }}>Ultra-pure alpine water. Infinitely recyclable aluminium.</div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, marginTop: 22, padding: '18px 0', borderTop: '1px solid var(--app-border)', borderBottom: '1px solid var(--app-border)' }}>
          {[
            { v: '7.6', l: 'pH' },
            { v: '165', l: 'TDS' },
            { v: '−74%', l: 'CO₂ vs PET', c: 'var(--hc-green)' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center', borderLeft: s.l === 'pH' ? 0 : '1px solid var(--app-border)' }}>
              <div className="hc-metric-bold" style={{ fontSize: 22, color: s.c || 'var(--app-fg)' }}>{s.v}</div>
              <div className="hc-label" style={{ color: 'var(--app-muted)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Mineral breakdown */}
        <div style={{ marginTop: 22 }}>
          <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 14 }}>Composition · mg/L</div>
          {[
            { n: 'Calcium', v: 42, m: 80 },
            { n: 'Magnesium', v: 18, m: 40 },
            { n: 'Sodium', v: 3.2, m: 20 },
            { n: 'Bicarbonate', v: 145, m: 200 },
          ].map(m => (
            <div key={m.n} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 12 }}>{m.n}</span>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--app-muted)' }}>{m.v}</span>
              </div>
              <div className="progress-line"><span style={{ width: `${(m.v/m.m)*100}%` }}/></div>
            </div>
          ))}
        </div>

        <button className="hc-btn hc-btn-primary" style={{ width: '100%', marginTop: 22, padding: 16 }} onClick={() => onNav('subscription')}>Subscribe · AED 84/mo</button>
        <button className="hc-btn hc-btn-outline" style={{ width: '100%', marginTop: 8, padding: 16 }}>Single order — AED 36</button>
      </div>
    </div>
  );
}

function ScreenSubscription({ tweaks, onNav }) {
  const [plan, setPlan] = React.useState('24');
  const plans = [
    { id: '12', size: '12-pack', price: 48, each: 4.0 },
    { id: '24', size: '24-pack', price: 84, each: 3.5, pop: true },
    { id: '48', size: '48-pack', price: 156, each: 3.25 },
  ];
  return (
    <div className="scroll-y hc-fade-up" style={{ flex: 1, padding: '16px 20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button onClick={() => onNav('home')} style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)', borderRadius: 8, padding: 8, color: 'var(--app-fg)', cursor: 'pointer' }}><Ico.chevL/></button>
        <div className="hc-label" style={{ color: 'var(--app-muted)' }}>Subscription</div>
      </div>

      <div style={{ fontSize: 32, fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 6 }}>Active · <span style={{ fontWeight: 700, color: 'var(--hc-accent)' }}>month 3</span></div>
      <div style={{ fontSize: 12, color: 'var(--app-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>MEMBER SINCE JAN 2026</div>

      {/* Delivery card */}
      <div className="hc-card" style={{ marginTop: 22, background: 'linear-gradient(135deg, rgba(77,184,255,0.1) 0%, transparent 60%)', border: '1px solid rgba(77,184,255,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <Ico.truck/>
          <div className="hc-label" style={{ color: 'var(--hc-accent)' }}>Next delivery</div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Wed, 22 Apr · 8 — 10am</div>
        <div style={{ fontSize: 12, color: 'var(--app-muted)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>24 × 330ml · Al Wasl, Dubai</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="hc-chip" style={{ flex: 1 }}>Reschedule</button>
          <button className="hc-chip" style={{ flex: 1 }}>Skip week</button>
        </div>
      </div>

      <div className="hc-label" style={{ color: 'var(--app-muted)', margin: '24px 0 12px' }}>Change plan</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {plans.map(p => (
          <button key={p.id} onClick={() => setPlan(p.id)} className="hc-card" style={{
            cursor: 'pointer', textAlign: 'left', padding: 16,
            borderColor: plan === p.id ? 'var(--hc-accent)' : 'var(--app-border)',
            background: plan === p.id ? 'linear-gradient(135deg, rgba(77,184,255,0.08), transparent)' : 'var(--app-surface)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{p.size}</div>
                  {p.pop && <span style={{ fontSize: 9, letterSpacing: '0.2em', fontWeight: 700, padding: '3px 7px', background: 'var(--hc-accent)', color: '#0a0a0a', borderRadius: 3 }}>POPULAR</span>}
                </div>
                <div style={{ fontSize: 11, color: 'var(--app-muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>AED {p.each.toFixed(2)} per can</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="hc-metric-bold" style={{ fontSize: 22, color: plan === p.id ? 'var(--hc-accent)' : 'var(--app-fg)' }}>{p.price}</div>
                <div style={{ fontSize: 9, color: 'var(--app-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>AED/MO</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button className="hc-btn hc-btn-primary" style={{ width: '100%', marginTop: 22, padding: 16 }}>Update plan</button>
    </div>
  );
}

function ScreenProfile({ tweaks, onNav }) {
  return (
    <div className="scroll-y hc-fade-up" style={{ flex: 1, padding: '16px 20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div className="hc-label" style={{ color: 'var(--app-muted)' }}>Profile</div>
        <button style={{ background: 'transparent', border: 0, color: 'var(--app-muted)', cursor: 'pointer' }}><Ico.settings/></button>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--hc-accent), var(--hc-green))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#0a0a0a' }}>L</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Layla Al Mansouri</div>
          <div style={{ fontSize: 12, color: 'var(--app-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>MEMBER · DUBAI</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, padding: '20px 0', borderTop: '1px solid var(--app-border)', borderBottom: '1px solid var(--app-border)', marginBottom: 22 }}>
        {[
          { v: '347', l: 'Cans logged', c: 'var(--hc-accent)' },
          { v: '12', l: 'Day streak', c: 'var(--hc-green)' },
          { v: '−114kg', l: 'CO₂ saved', c: 'var(--hc-green)' },
        ].map((s, i) => (
          <div key={s.l} style={{ textAlign: 'center', borderLeft: i === 0 ? 0 : '1px solid var(--app-border)' }}>
            <div className="hc-metric-bold" style={{ fontSize: 24, color: s.c }}>{s.v}</div>
            <div className="hc-label" style={{ color: 'var(--app-muted)', marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 10 }}>Goals</div>
      <div className="hc-card" style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
          <span style={{ fontSize: 13 }}>Daily hydration</span>
          <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--hc-accent)' }}>{tweaks.goal}L</span>
        </div>
        <div className="hc-hr"/>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
          <span style={{ fontSize: 13 }}>Wake up</span>
          <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--app-muted)' }}>06:30</span>
        </div>
        <div className="hc-hr"/>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
          <span style={{ fontSize: 13 }}>Sleep</span>
          <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--app-muted)' }}>23:00</span>
        </div>
      </div>

      <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 10 }}>Settings</div>
      <div className="hc-card">
        {[
          { l: 'Connected devices', v: tweaks.device, ico: Ico.activity },
          { l: 'Subscription', v: '24-pack · monthly', ico: Ico.truck, nav: 'subscription' },
          { l: 'Notifications', v: 'Smart reminders', ico: Ico.bell, nav: 'notifications' },
          { l: 'Appearance', v: tweaks.theme === 'dark' ? 'Dark' : 'Light', ico: Ico.moon },
          { l: 'Account', v: 'layla@...', ico: Ico.user },
        ].map((s, i, arr) => (
          <button key={s.l} onClick={() => s.nav && onNav(s.nav)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', background: 'transparent', border: 0, borderBottom: i < arr.length - 1 ? '1px solid var(--app-border)' : 0, color: 'var(--app-fg)', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ color: 'var(--app-muted)' }}><s.ico/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}>{s.l}</div>
              <div style={{ fontSize: 10, color: 'var(--app-muted)', marginTop: 2, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.v}</div>
            </div>
            <Ico.chev/>
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenScan, ScreenProduct, ScreenSubscription, ScreenProfile });
