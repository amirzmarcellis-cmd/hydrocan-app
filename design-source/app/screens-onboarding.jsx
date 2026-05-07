/* Hydrocan — Onboarding flow.
   8 screens: welcome → email → social → name+dob → sex → connect wearables →
   permissions → goal → done. Linear, swipe-back via header. */

const { I: OB_I, TopBar: OB_TopBar, IconBtn: OB_IconBtn } = window.HCPrim;
const { PHOTO: OB_PHOTO } = window.HC;

function ProgressDots({ step, total, accent }) {
  return (
    <div style={{ display:'flex', gap: 5, padding:'8px 22px 0' }}>
      {Array.from({ length: total }).map((_,i)=>(
        <div key={i} style={{
          flex: 1, height: 2, borderRadius: 1,
          background: i <= step ? accent : 'rgba(255,255,255,0.12)',
          transition: 'background 0.3s'
        }}/>
      ))}
    </div>
  );
}

function OBHeader({ step, total, onBack, accent }) {
  return (
    <>
      <ProgressDots step={step} total={total} accent={accent}/>
      <div style={{ padding:'14px 18px 0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        {step > 0
          ? <button onClick={onBack} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.7)', cursor:'pointer', padding: 6 }}><OB_I.back size={16}/></button>
          : <div style={{ width: 28 }}/>}
        <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.45)' }}>
          {String(step+1).padStart(2,'0')} / {String(total).padStart(2,'0')}
        </div>
        <div style={{ width: 28 }}/>
      </div>
    </>
  );
}

function OBField({ label, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.55)', marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}

function OBInput({ value, placeholder, onChange, type='text' }) {
  return (
    <input
      type={type} value={value || ''} placeholder={placeholder}
      onChange={e=>onChange && onChange(e.target.value)}
      style={{
        width:'100%', background:'transparent', border:'none',
        borderBottom:'1px solid rgba(255,255,255,0.2)',
        padding:'10px 0', fontFamily:'var(--hc-display)', fontSize: 22,
        color:'#fff', letterSpacing:'-0.01em', outline:'none'
      }}/>
  );
}

function OBPrimary({ children, onClick, accent, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width:'100%', padding:'15px 14px', cursor: disabled?'not-allowed':'pointer',
      background: disabled ? 'rgba(255,255,255,0.06)' : accent,
      color: disabled ? 'rgba(255,255,255,0.3)' : '#050608',
      border:'none', borderRadius: 0,
      fontFamily:'var(--hc-display)', fontSize: 15, letterSpacing:'-0.01em',
      display:'flex', justifyContent:'space-between', alignItems:'center'
    }}>
      <span>{children}</span><span>→</span>
    </button>
  );
}

function ScreenAuth({ go, accent }) {
  return (
    <div className="app" style={{ background:'#050608', position:'relative' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <img src={OB_PHOTO.dawn} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(0.9) brightness(0.32) contrast(1.2)' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(5,6,8,0.4), rgba(5,6,8,0.95))' }}/>
      </div>
      <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', height:'100%', padding:'38px 22px 22px' }}>
        <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.32em', color: accent }}>HYDROCAN · H₂</div>
        <div style={{ flex: 1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ fontFamily:'var(--hc-display)', fontSize: 44, lineHeight: 0.95, letterSpacing:'-0.03em', color:'#fff' }}>
            Welcome.
          </div>
          <div style={{ fontFamily:'var(--hc-display)', fontSize: 17, lineHeight: 1.35, color:'rgba(255,255,255,0.7)', marginTop: 14, maxWidth: 280 }}>
            Track how hydrogen water is changing your body — measured by the wearables you already wear.
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap: 8 }}>
          <button onClick={()=>go('onboarding-name')} style={{
            background:'#fff', color:'#050608', border:'none', padding:'14px',
            display:'flex', alignItems:'center', justifyContent:'center', gap: 10,
            fontFamily:'var(--hc-display)', fontSize: 15
          }}>
             Continue with Apple
          </button>
          <button onClick={()=>go('onboarding-name')} style={{
            background:'rgba(255,255,255,0.06)', color:'#fff', border:'1px solid rgba(255,255,255,0.18)', padding:'14px',
            display:'flex', alignItems:'center', justifyContent:'center', gap: 10,
            fontFamily:'var(--hc-display)', fontSize: 15
          }}>
            G  Continue with Google
          </button>
          <button onClick={()=>go('onboarding-name')} style={{
            background:'transparent', color:'rgba(255,255,255,0.7)', border:'none', padding:'12px',
            fontFamily:'var(--hc-mono)', fontSize: 10, letterSpacing:'0.22em'
          }}>
            CONTINUE WITH EMAIL
          </button>
          <div style={{ textAlign:'center', fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color:'rgba(255,255,255,0.35)', marginTop: 6 }}>
            BY CONTINUING YOU AGREE TO OUR TERMS
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenOBName({ go, accent, ob, setOb }) {
  return (
    <div className="app" style={{ background:'#050608' }}>
      <OBHeader step={0} total={5} onBack={()=>go('auth')} accent={accent}/>
      <div style={{ padding:'28px 22px 22px', display:'flex', flexDirection:'column', flex:1 }}>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 30, lineHeight: 1.05, letterSpacing:'-0.025em', color:'#fff', marginBottom: 30 }}>
          A few details so we can read your numbers correctly.
        </div>
        <OBField label="NAME"><OBInput value={ob.name} onChange={v=>setOb({name:v})} placeholder="Marcus Kane"/></OBField>
        <OBField label="DATE OF BIRTH"><OBInput value={ob.dob} onChange={v=>setOb({dob:v})} placeholder="14 / 03 / 1991"/></OBField>
        <OBField label="SEX (FOR HRV/RHR NORMS)">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 6 }}>
            {['Male','Female','Other'].map(s=>(
              <button key={s} onClick={()=>setOb({sex:s})} style={{
                padding:'10px', background: ob.sex===s ? accent : 'transparent',
                color: ob.sex===s ? '#050608' : 'rgba(255,255,255,0.7)',
                border: `1px solid ${ob.sex===s ? accent : 'rgba(255,255,255,0.15)'}`,
                fontFamily:'var(--hc-mono)', fontSize: 9.5, letterSpacing:'0.18em', cursor:'pointer'
              }}>{s.toUpperCase()}</button>
            ))}
          </div>
        </OBField>
        <div style={{ flex:1 }}/>
        <OBPrimary onClick={()=>go('onboarding-customer')} accent={accent}>Continue</OBPrimary>
      </div>
    </div>
  );
}

function ScreenOBCustomer({ go, accent, ob, setOb }) {
  const tiers = [
    { k:'starter',  l:'Starter',  d:'12 cans / month' },
    { k:'standard', l:'Standard', d:'24 cans / month' },
    { k:'pro',      l:'Pro',      d:'48 cans / month' },
    { k:'none',     l:'Not yet',  d:'I want to try Hydrocan first' },
  ];
  return (
    <div className="app" style={{ background:'#050608' }}>
      <OBHeader step={1} total={5} onBack={()=>go('onboarding-name')} accent={accent}/>
      <div style={{ padding:'28px 22px 22px', display:'flex', flexDirection:'column', flex:1 }}>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 30, lineHeight: 1.05, letterSpacing:'-0.025em', color:'#fff', marginBottom: 8 }}>
          Are you a Hydrocan customer?
        </div>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 14, color:'rgba(255,255,255,0.6)', marginBottom: 24 }}>
          We'll match your subscription so logs sync automatically.
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap: 8 }}>
          {tiers.map(t=>(
            <button key={t.k} onClick={()=>setOb({tier:t.k})} style={{
              padding:'14px', textAlign:'left',
              background: ob.tier===t.k ? 'rgba(184,224,245,0.08)' : 'transparent',
              border: `1px solid ${ob.tier===t.k ? accent : 'rgba(255,255,255,0.12)'}`,
              cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center'
            }}>
              <div>
                <div style={{ fontFamily:'var(--hc-display)', fontSize: 16, color:'#fff' }}>{t.l}</div>
                <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.16em', color:'rgba(255,255,255,0.5)', marginTop: 4 }}>{t.d.toUpperCase()}</div>
              </div>
              {ob.tier===t.k && <div style={{ color: accent }}><OB_I.check size={18}/></div>}
            </button>
          ))}
        </div>
        <div style={{ flex:1 }}/>
        <OBPrimary onClick={()=>go('onboarding-connect')} accent={accent} disabled={!ob.tier}>Continue</OBPrimary>
      </div>
    </div>
  );
}

function ScreenOBConnect({ go, accent, ob, setOb }) {
  const sources = [
    { k:'apple',  l:'Apple Health',     d:'HRV · sleep · steps · workouts' },
    { k:'google', l:'Health Connect',   d:'Android & Samsung Health' },
    { k:'whoop',  l:'WHOOP',            d:'Recovery · strain · sleep' },
    { k:'oura',   l:'Oura',             d:'Readiness · sleep · temp' },
    { k:'garmin', l:'Garmin Connect',   d:'Body Battery · stress · sleep' },
    { k:'fitbit', l:'Fitbit',           d:'Sleep score · resting HR' },
  ];
  const conn = ob.connected || [];
  const toggle = (k) => {
    const next = conn.includes(k) ? conn.filter(x=>x!==k) : [...conn, k];
    setOb({ connected: next });
  };
  return (
    <div className="app" style={{ background:'#050608' }}>
      <OBHeader step={2} total={5} onBack={()=>go('onboarding-customer')} accent={accent}/>
      <div style={{ padding:'28px 22px 22px', display:'flex', flexDirection:'column', flex:1, overflow:'hidden' }}>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 28, lineHeight: 1.05, letterSpacing:'-0.025em', color:'#fff', marginBottom: 8 }}>
          Connect what you wear.
        </div>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 13, color:'rgba(255,255,255,0.6)', marginBottom: 18 }}>
          Pick at least one. We read — never write.
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8, overflow:'auto' }}>
          {sources.map(s => {
            const on = conn.includes(s.k);
            return (
              <button key={s.k} onClick={()=>toggle(s.k)} style={{
                padding: 12, textAlign:'left',
                background: on ? 'rgba(184,224,245,0.08)' : 'transparent',
                border: `1px solid ${on ? accent : 'rgba(255,255,255,0.12)'}`,
                cursor:'pointer', minHeight: 92, display:'flex', flexDirection:'column', justifyContent:'space-between'
              }}>
                <div style={{ fontFamily:'var(--hc-display)', fontSize: 14, color:'#fff' }}>{s.l}</div>
                <div>
                  <div style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.14em', color:'rgba(255,255,255,0.5)', marginBottom: 4 }}>{on ? 'CONNECTED' : 'TAP TO CONNECT'}</div>
                  <div style={{ fontFamily:'var(--hc-sans)', fontSize: 10.5, color:'rgba(255,255,255,0.55)', lineHeight:1.35 }}>{s.d}</div>
                </div>
              </button>
            );
          })}
        </div>
        <button onClick={()=>{ setOb({manual:true}); go('onboarding-goal'); }} style={{
          background:'transparent', border:'none', color:'rgba(255,255,255,0.55)',
          fontFamily:'var(--hc-mono)', fontSize: 9.5, letterSpacing:'0.22em',
          padding:'14px 0 8px', cursor:'pointer'
        }}>
          NO WEARABLE — ENTER MANUALLY
        </button>
        <OBPrimary onClick={()=>go('onboarding-goal')} accent={accent} disabled={conn.length===0}>
          {conn.length===0 ? 'Pick at least one' : `Continue with ${conn.length}`}
        </OBPrimary>
      </div>
    </div>
  );
}

function ScreenOBGoal({ go, accent, ob, setOb }) {
  const goal = ob.goal || 3;
  return (
    <div className="app" style={{ background:'#050608' }}>
      <OBHeader step={3} total={5} onBack={()=>go('onboarding-connect')} accent={accent}/>
      <div style={{ padding:'28px 22px 22px', display:'flex', flexDirection:'column', flex:1 }}>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 30, lineHeight: 1.05, letterSpacing:'-0.025em', color:'#fff', marginBottom: 8 }}>
          Your daily goal.
        </div>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 13, color:'rgba(255,255,255,0.6)', marginBottom: 30 }}>
          Cans of Hydrocan per day. You can change this anytime.
        </div>
        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
          <div style={{ fontFamily:'var(--hc-display)', fontSize: 140, lineHeight:0.85, color:'#fff', letterSpacing:'-0.04em' }}>
            {goal}
          </div>
          <div style={{ fontFamily:'var(--hc-mono)', fontSize: 10, letterSpacing:'0.32em', color:'rgba(255,255,255,0.5)', marginTop: 8 }}>CANS PER DAY</div>
          <div style={{ display:'flex', gap: 10, marginTop: 28 }}>
            {[1,2,3,4,5].map(n=>(
              <button key={n} onClick={()=>setOb({goal:n})} style={{
                width: 36, height: 36, borderRadius: '50%',
                background: goal===n ? accent : 'transparent',
                color: goal===n ? '#050608' : 'rgba(255,255,255,0.7)',
                border: `1px solid ${goal===n ? accent : 'rgba(255,255,255,0.18)'}`,
                fontFamily:'var(--hc-mono)', fontSize: 11, cursor:'pointer'
              }}>{n}</button>
            ))}
          </div>
          <div style={{ fontFamily:'var(--hc-sans)', fontSize: 11, color:'rgba(255,255,255,0.5)', marginTop: 24, textAlign:'center', maxWidth: 240, lineHeight:1.5 }}>
            Most members find {goal===1?'1 can':`${goal} cans`} fits naturally{goal>=3 ? ' — one with each main meal.' : '.'}
          </div>
        </div>
        <OBPrimary onClick={()=>go('onboarding-permissions')} accent={accent}>Continue</OBPrimary>
      </div>
    </div>
  );
}

function ScreenOBPermissions({ go, accent }) {
  const items = [
    { l:'Health data',    d:'HRV, sleep, steps, workouts. Read-only.', icon:'spark' },
    { l:'Notifications',  d:'Drink reminders + your daily score.',     icon:'bell' },
    { l:'Bluetooth',      d:'Optional — for can NFC tap-to-log.',      icon:'plus' },
  ];
  return (
    <div className="app" style={{ background:'#050608' }}>
      <OBHeader step={4} total={5} onBack={()=>go('onboarding-goal')} accent={accent}/>
      <div style={{ padding:'28px 22px 22px', display:'flex', flexDirection:'column', flex:1 }}>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 30, lineHeight: 1.05, letterSpacing:'-0.025em', color:'#fff', marginBottom: 8 }}>
          One last set of permissions.
        </div>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 13, color:'rgba(255,255,255,0.6)', marginBottom: 24 }}>
          You'll see the system prompts after this screen.
        </div>
        <div style={{ display:'flex', flexDirection:'column' }}>
          {items.map((it,i)=>{
            const Icon = OB_I[it.icon];
            return (
              <div key={i} style={{
                padding:'16px 0',
                borderTop: i===0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderBottom:'1px solid rgba(255,255,255,0.08)',
                display:'grid', gridTemplateColumns:'28px 1fr auto', gap: 14, alignItems:'center'
              }}>
                <div style={{ color: accent }}><Icon size={18}/></div>
                <div>
                  <div style={{ fontFamily:'var(--hc-display)', fontSize: 15, color:'#fff' }}>{it.l}</div>
                  <div style={{ fontFamily:'var(--hc-sans)', fontSize: 11, color:'rgba(255,255,255,0.55)', marginTop: 3, lineHeight: 1.4 }}>{it.d}</div>
                </div>
                <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.18em', color: accent }}>ALLOW</div>
              </div>
            );
          })}
        </div>
        <div style={{ flex:1 }}/>
        <OBPrimary onClick={()=>go('home')} accent={accent}>Enter Hydrocan</OBPrimary>
      </div>
    </div>
  );
}

window.HCOB = {
  ScreenAuth, ScreenOBName, ScreenOBCustomer, ScreenOBConnect, ScreenOBGoal, ScreenOBPermissions
};
