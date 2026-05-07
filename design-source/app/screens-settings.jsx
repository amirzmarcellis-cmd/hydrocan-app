/* Hydrocan — Settings cluster.
   Profile, Reminders, Privacy, Help, Education, Manual entry. */

const { I: S_I, TopBar: S_TopBar, IconBtn: S_IconBtn, BottomTabs: S_BottomTabs } = window.HCPrim;
const { PHOTO: S_PHOTO, USER } = window.HC;

function ScreenHeader({ title, onBack, right }) {
  return (
    <>
      <div style={{ padding:'10px 18px 0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <button onClick={onBack} style={{ background:'transparent', border:'none', color:'rgba(255,255,255,0.75)', cursor:'pointer', padding: 6 }}><S_I.back size={16}/></button>
        <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.55)' }}>{title}</div>
        <div style={{ width: 28 }}>{right}</div>
      </div>
      <div style={{ margin:'10px 18px 0', borderBottom:'1px solid rgba(255,255,255,0.10)' }}/>
    </>
  );
}

function Row({ label, value, onClick, accent, danger }) {
  return (
    <button onClick={onClick} style={{
      width:'100%', padding:'14px 0', textAlign:'left', cursor: onClick?'pointer':'default',
      background:'transparent', border:'none', borderBottom:'1px solid rgba(255,255,255,0.08)',
      display:'flex', justifyContent:'space-between', alignItems:'center'
    }}>
      <span style={{ fontFamily:'var(--hc-display)', fontSize: 14.5, color: danger ? '#E59E7A' : '#fff' }}>{label}</span>
      {value && <span style={{ fontFamily:'var(--hc-mono)', fontSize: 9.5, letterSpacing:'0.16em', color:'rgba(255,255,255,0.55)' }}>{value}</span>}
      {!value && onClick && <span style={{ color:'rgba(255,255,255,0.4)' }}>›</span>}
    </button>
  );
}

function SectionLabel({ children }) {
  return <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.45)', padding:'18px 0 4px' }}>{children}</div>;
}

function ScreenProfile({ go, accent, tab, setTab }) {
  const sources = ['WHOOP','Apple Health'];
  return (
    <div className="app" style={{ background:'#050608' }}>
      <ScreenHeader title="ACCOUNT" onBack={()=>go('home')}/>
      <div className="app-scroll">
        {/* Identity */}
        <div style={{ padding:'24px 22px 6px', display:'flex', gap: 14, alignItems:'center' }}>
          <div style={{ width: 56, height: 56, borderRadius:'50%', overflow:'hidden', border:'1px solid rgba(255,255,255,0.15)' }}>
            <img src={S_PHOTO.portrait} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(0.4)' }}/>
          </div>
          <div>
            <div style={{ fontFamily:'var(--hc-display)', fontSize: 22, color:'#fff', letterSpacing:'-0.02em' }}>{USER.name} Kane</div>
            <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.18em', color:'rgba(255,255,255,0.55)', marginTop: 4 }}>DAY {USER.dayN} · STANDARD TIER</div>
          </div>
        </div>

        <div style={{ padding:'0 22px' }}>
          <SectionLabel>CONNECTED SOURCES</SectionLabel>
          {sources.map(s=>(
            <Row key={s} label={s} value="● ACTIVE" accent={accent}/>
          ))}
          <Row label="+ Add new source" onClick={()=>go('connect')}/>

          <SectionLabel>DATA</SectionLabel>
          <Row label="Manual entry" onClick={()=>go('manual')}/>
          <Row label="Drink reminders" value="3 / DAY" onClick={()=>go('reminders')}/>
          <Row label="Daily goal" value={`${USER.goalCansPerDay} CANS`} onClick={()=>go('reminders')}/>

          <SectionLabel>ACCOUNT</SectionLabel>
          <Row label="Subscription" value="STANDARD · 24/MO" onClick={()=>go('subscription')}/>
          <Row label="Privacy & data" onClick={()=>go('privacy')}/>
          <Row label="Notifications" onClick={()=>go('reminders')}/>
          <Row label="About hydrogen water" onClick={()=>go('education')}/>
          <Row label="Help & support" onClick={()=>go('help')}/>

          <SectionLabel>SESSION</SectionLabel>
          <Row label="Sign out" onClick={()=>go('auth')}/>
          <Row label="Delete account" onClick={()=>go('privacy')} danger/>

          <div style={{ padding:'24px 0 8px', textAlign:'center', fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color:'rgba(255,255,255,0.3)' }}>
            HYDROCAN · v3.0.1
          </div>
        </div>
      </div>
      <S_BottomTabs active={tab} onTab={setTab} accent={accent}/>
    </div>
  );
}

function ScreenReminders({ go, accent }) {
  const [times, setTimes] = React.useState(['07:30','13:00','19:00']);
  return (
    <div className="app" style={{ background:'#050608' }}>
      <ScreenHeader title="REMINDERS" onBack={()=>go('profile')}/>
      <div className="app-scroll" style={{ padding:'22px 22px' }}>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 26, color:'#fff', letterSpacing:'-0.02em', lineHeight: 1.05, marginBottom: 8 }}>
          When should we nudge you?
        </div>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 13, color:'rgba(255,255,255,0.6)', marginBottom: 18 }}>
          One gentle reminder per scheduled can.
        </div>
        {times.map((time, i)=>(
          <div key={i} style={{
            padding:'14px 0', display:'flex', alignItems:'center', justifyContent:'space-between',
            borderTop: i===0?'1px solid rgba(255,255,255,0.08)':'none',
            borderBottom:'1px solid rgba(255,255,255,0.08)'
          }}>
            <div>
              <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.18em', color:'rgba(255,255,255,0.5)' }}>CAN {String(i+1).padStart(2,'0')}</div>
              <div style={{ fontFamily:'var(--hc-display)', fontSize: 32, color:'#fff', letterSpacing:'-0.02em', marginTop: 2 }}>{time}</div>
            </div>
            <button onClick={()=>setTimes(times.filter((_,j)=>j!==i))} style={{
              background:'transparent', border:'1px solid rgba(255,255,255,0.18)', color:'rgba(255,255,255,0.7)',
              padding:'8px 12px', cursor:'pointer', fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.18em'
            }}>REMOVE</button>
          </div>
        ))}
        <button onClick={()=>setTimes([...times, '21:00'])} style={{
          marginTop: 18, width:'100%', padding:'12px',
          background:'transparent', border:'1px dashed rgba(255,255,255,0.2)', color: accent,
          cursor:'pointer', fontFamily:'var(--hc-mono)', fontSize: 10, letterSpacing:'0.22em'
        }}>+ ADD A TIME</button>

        <div style={{ marginTop: 28 }}>
          <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.5)', marginBottom: 12 }}>SMART NUDGES</div>
          {[
            { l:'Morning recovery summary', d:'After your wearable syncs.', on: true },
            { l:'Pre-workout reminder',     d:'30 min before scheduled training.', on: true },
            { l:'Sleep wind-down',          d:'60 min before your usual bedtime.', on: false },
          ].map((it,i)=>(
            <div key={i} style={{ padding:'12px 0', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <div style={{ fontFamily:'var(--hc-display)', fontSize: 14, color:'#fff' }}>{it.l}</div>
                <div style={{ fontFamily:'var(--hc-sans)', fontSize: 11, color:'rgba(255,255,255,0.5)', marginTop: 2 }}>{it.d}</div>
              </div>
              <div style={{
                width: 36, height: 20, borderRadius: 10, background: it.on ? accent : 'rgba(255,255,255,0.15)',
                position:'relative'
              }}>
                <div style={{ position:'absolute', top: 2, left: it.on?18:2, width: 16, height: 16, borderRadius:'50%', background:'#fff', transition:'left 0.2s' }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenPrivacy({ go, accent }) {
  return (
    <div className="app" style={{ background:'#050608' }}>
      <ScreenHeader title="PRIVACY" onBack={()=>go('profile')}/>
      <div className="app-scroll" style={{ padding:'22px 22px 30px' }}>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 26, color:'#fff', letterSpacing:'-0.02em', lineHeight: 1.05, marginBottom: 18 }}>
          You own your data.
        </div>

        <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)' }}>
          {[
            { l:'Health data',    d:'Read-only. We never write back to Apple Health, Health Connect, or WHOOP.' },
            { l:'On-device first',d:'Your last 30 days are computed locally. We sync aggregates to keep things fast.' },
            { l:'No third-party sharing', d:'We do not sell, share, or use your health data for advertising.' },
            { l:'Export anytime', d:'CSV of every metric and log we hold for you.' },
          ].map((it,i)=>(
            <div key={i} style={{ padding:'16px 0', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily:'var(--hc-display)', fontSize: 15, color:'#fff' }}>{it.l}</div>
              <div style={{ fontFamily:'var(--hc-sans)', fontSize: 12.5, color:'rgba(255,255,255,0.65)', marginTop: 4, lineHeight: 1.5 }}>{it.d}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, display:'flex', flexDirection:'column', gap: 8 }}>
          <button style={{ width:'100%', padding:'14px', background: accent, color:'#050608', border:'none', cursor:'pointer', fontFamily:'var(--hc-display)', fontSize: 14, display:'flex', justifyContent:'space-between' }}>
            <span>Export my data</span><span>↓</span>
          </button>
          <button style={{ width:'100%', padding:'14px', background:'transparent', color:'rgba(255,255,255,0.85)', border:'1px solid rgba(255,255,255,0.18)', cursor:'pointer', fontFamily:'var(--hc-display)', fontSize: 14, display:'flex', justifyContent:'space-between' }}>
            <span>Disconnect a source</span><span>›</span>
          </button>
          <button style={{ width:'100%', padding:'14px', background:'transparent', color:'#E59E7A', border:'1px solid rgba(229,158,122,0.3)', cursor:'pointer', fontFamily:'var(--hc-display)', fontSize: 14, display:'flex', justifyContent:'space-between' }}>
            <span>Delete account & all data</span><span>›</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ScreenHelp({ go, accent }) {
  const topics = [
    { l:'How is my recovery score calculated?', d:'Composite z-score · HRV/RHR/sleep' },
    { l:'Why is my baseline still building?',    d:'Confidence improves with data' },
    { l:'Connecting WHOOP, Oura, Garmin',         d:'OAuth + sync intervals' },
    { l:'Can I use Hydrocan without a wearable?',d:'Manual entry guide' },
    { l:'Subscription, billing, deliveries',     d:'Manage your cans' },
    { l:'Privacy & data export',                  d:'Your control' },
  ];
  return (
    <div className="app" style={{ background:'#050608' }}>
      <ScreenHeader title="HELP" onBack={()=>go('profile')}/>
      <div className="app-scroll" style={{ padding:'22px 22px 30px' }}>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 26, color:'#fff', letterSpacing:'-0.02em', lineHeight: 1.05, marginBottom: 18 }}>
          How can we help?
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)' }}>
          {topics.map((t,i)=>(
            <button key={i} style={{
              width:'100%', textAlign:'left', padding:'14px 0', background:'transparent',
              border:'none', borderBottom:'1px solid rgba(255,255,255,0.08)', cursor:'pointer',
              display:'flex', justifyContent:'space-between', alignItems:'center'
            }}>
              <div>
                <div style={{ fontFamily:'var(--hc-display)', fontSize: 14.5, color:'#fff' }}>{t.l}</div>
                <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.16em', color:'rgba(255,255,255,0.45)', marginTop: 4 }}>{t.d.toUpperCase()}</div>
              </div>
              <span style={{ color:'rgba(255,255,255,0.4)' }}>›</span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 22 }}>
          <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.5)', marginBottom: 10 }}>STILL STUCK</div>
          <button style={{ width:'100%', padding:'14px', background: accent, color:'#050608', border:'none', cursor:'pointer', fontFamily:'var(--hc-display)', fontSize: 14, display:'flex', justifyContent:'space-between' }}>
            <span>Chat with support</span><span>→</span>
          </button>
          <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.16em', color:'rgba(255,255,255,0.4)', marginTop: 10, textAlign:'center' }}>
            AVG RESPONSE · 14 MIN · MON–FRI 09–18 UTC
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenEducation({ go, accent }) {
  const articles = [
    { eyebrow:'01 · BACKGROUND', title:'What hydrogen water actually is', meta:'4 MIN · MOLECULAR HYDROGEN, H₂', img: S_PHOTO.studio },
    { eyebrow:'02 · MECHANISM',  title:'How H₂ interacts with reactive oxygen species', meta:'6 MIN · CELLULAR LEVEL', img: S_PHOTO.dawn },
    { eyebrow:'03 · EVIDENCE',   title:'What the published research does — and doesn\'t — show', meta:'8 MIN · 2007–2024 LITERATURE REVIEW', img: S_PHOTO.trail },
    { eyebrow:'04 · METHOD',     title:'How Hydrocan reads your wearable data', meta:'3 MIN · OUR CALCULATIONS', img: S_PHOTO.studio },
  ];
  return (
    <div className="app" style={{ background:'#050608' }}>
      <ScreenHeader title="LEARN" onBack={()=>go('profile')}/>
      <div className="app-scroll" style={{ padding:'22px 22px 30px' }}>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 28, color:'#fff', letterSpacing:'-0.025em', lineHeight: 1.0, marginBottom: 4 }}>
          The science.
        </div>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 14, color:'rgba(255,255,255,0.6)', marginBottom: 22 }}>
          Plain-language summaries of the actual research.
        </div>

        {articles.map((a,i)=>(
          <button key={i} style={{
            display:'block', width:'100%', textAlign:'left', padding: 0, background:'transparent', border:'none',
            cursor:'pointer', marginBottom: 18
          }}>
            <div style={{ position:'relative', height: 150, overflow:'hidden' }}>
              <img src={a.img} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(0.7) brightness(0.55) contrast(1.1)' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(5,6,8,0.1), rgba(5,6,8,0.85))' }}/>
              <div style={{ position:'absolute', left: 14, right: 14, bottom: 12 }}>
                <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color: accent }}>{a.eyebrow}</div>
                <div style={{ fontFamily:'var(--hc-display)', fontSize: 17, color:'#fff', letterSpacing:'-0.015em', lineHeight: 1.15, marginTop: 4, textWrap:'pretty' }}>{a.title}</div>
              </div>
            </div>
            <div style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color:'rgba(255,255,255,0.45)', marginTop: 8 }}>{a.meta}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ScreenManual({ go, accent }) {
  const [vals, setVals] = React.useState({ hrv:'', rhr:'', sleep:'', steps:'' });
  return (
    <div className="app" style={{ background:'#050608' }}>
      <ScreenHeader title="MANUAL ENTRY" onBack={()=>go('profile')}/>
      <div className="app-scroll" style={{ padding:'22px 22px 30px' }}>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 26, color:'#fff', letterSpacing:'-0.02em', lineHeight: 1.05, marginBottom: 8 }}>
          Today's numbers.
        </div>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 13, color:'rgba(255,255,255,0.6)', marginBottom: 24 }}>
          From a separate device or a checkup. Optional fields are fine.
        </div>
        {[
          { k:'hrv',   l:'HRV', unit:'ms',     hint:'RMSSD if your device shows it' },
          { k:'rhr',   l:'Resting heart rate', unit:'bpm', hint:'Lowest stable overnight value' },
          { k:'sleep', l:'Sleep duration',     unit:'h',   hint:'Total time asleep' },
          { k:'steps', l:'Steps', unit:'',     hint:'Day total' },
        ].map(f=>(
          <div key={f.k} style={{ marginBottom: 18 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.55)' }}>{f.l.toUpperCase()}</div>
              <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.18em', color:'rgba(255,255,255,0.4)' }}>{f.unit}</div>
            </div>
            <input value={vals[f.k]} onChange={e=>setVals({...vals, [f.k]: e.target.value})} placeholder="—" style={{
              width:'100%', background:'transparent', border:'none', borderBottom:'1px solid rgba(255,255,255,0.18)',
              padding:'10px 0 6px', fontFamily:'var(--hc-display)', fontSize: 26, color:'#fff', letterSpacing:'-0.02em', outline:'none'
            }}/>
            <div style={{ fontFamily:'var(--hc-sans)', fontSize: 11, color:'rgba(255,255,255,0.45)', marginTop: 4 }}>{f.hint}</div>
          </div>
        ))}
        <button onClick={()=>go('home')} style={{
          width:'100%', padding:'14px', marginTop: 14,
          background: accent, color:'#050608', border:'none', cursor:'pointer',
          fontFamily:'var(--hc-display)', fontSize: 15,
          display:'flex', justifyContent:'space-between', alignItems:'center'
        }}>
          <span>Save today's entry</span><span>→</span>
        </button>
      </div>
    </div>
  );
}

window.HCSet = { ScreenProfile, ScreenReminders, ScreenPrivacy, ScreenHelp, ScreenEducation, ScreenManual };
