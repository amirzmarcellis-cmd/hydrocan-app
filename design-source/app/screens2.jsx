/* Hydrocan H₂ — Trends, Recovery, Subscription, Profile, Inbox, Notifications, Product */

const { I, TopBar, IconBtn, BottomTabs, ImgTile } = window.HCPrim;
const { PHOTO } = window.HC;

/* ============== TRENDS — personal lab notebook ============== */
function ScreenTrends({ go, accent, tab, setTab }) {
  const data = [42,48,55,52,61,58,64,68,65,72,70,75,73,78];
  const max = 100;
  const [title, setTitle] = React.useState('Day 14 study · Marcus K.');
  const [editing, setEditing] = React.useState(false);
  return (
    <div className="app">
      <TopBar left={<IconBtn onClick={()=>go('home')}><I.back size={14}/></IconBtn>} title="MY STUDY" right={<IconBtn><I.filter size={14}/></IconBtn>}/>
      <div className="app-scroll">
        {/* Editorial photo header */}
        <div style={{ position:'relative', height: 160, overflow:'hidden' }}>
          <img src={PHOTO.lab} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(0.4) brightness(0.7)' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(10,12,16,0.3), var(--hc-graphite-1))' }}/>
          <div style={{ position:'absolute', left: 18, bottom: 14, right: 18 }}>
            <div className="eyebrow eyebrow-ice" style={{ marginBottom: 6 }}>YOUR LAB NOTEBOOK</div>
            {editing ? (
              <input autoFocus value={title} onChange={e=>setTitle(e.target.value)} onBlur={()=>setEditing(false)} onKeyDown={e=>e.key==='Enter'&&setEditing(false)}
                style={{ background:'transparent', border:'none', outline:'none', borderBottom:`1px dashed ${accent}`, fontFamily:'var(--hc-display)', fontSize: 26, color:'#fff', width:'100%', padding: 0, letterSpacing:'-0.02em' }}/>
            ) : (
              <div onClick={()=>setEditing(true)} className="display" style={{ fontSize: 26, color:'#fff', cursor:'text', display:'flex', alignItems:'center', gap: 8 }}>
                {title}<span style={{ fontSize: 11, color: accent, opacity: 0.7 }}>✎</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding:'14px 18px 0' }}>
          <div className="card" style={{ padding: 14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <div className="eyebrow">H₂ RESPONSE · 14 DAYS</div>
              <div className="eyebrow eyebrow-ice">+86% VS BASELINE</div>
            </div>
            <div className="display" style={{ fontSize: 50, marginTop: 6, color: accent, lineHeight: 0.9 }}>78<span style={{ fontSize: 16, color:'var(--hc-text-3)' }}>/100</span></div>
            <svg viewBox="0 0 280 90" width="100%" height="100" style={{ marginTop: 8 }}>
              <defs><linearGradient id="trendArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={accent} stopOpacity="0.35"/><stop offset="1" stopColor={accent} stopOpacity="0"/></linearGradient></defs>
              {data.map((v,i)=>{const x=(i/(data.length-1))*280;const y=80-(v/max)*70;const nx=i<data.length-1?((i+1)/(data.length-1))*280:x;const ny=i<data.length-1?80-(data[i+1]/max)*70:y;return <g key={i}>{i<data.length-1&&<line x1={x} y1={y} x2={nx} y2={ny} stroke={accent} strokeWidth="2"/>}<circle cx={x} cy={y} r={i===data.length-1?4:2.5} fill={accent}/></g>;})}
              <path d={`M 0 80 ${data.map((v,i)=>`L ${(i/(data.length-1))*280} ${80-(v/max)*70}`).join(' ')} L 280 80 Z`} fill="url(#trendArea)"/>
              <text x="0" y="89" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(255,255,255,0.4)">D1</text>
              <text x="270" y="89" fontFamily="JetBrains Mono" fontSize="7" fill={accent} textAnchor="end">D14</text>
            </svg>
          </div>
        </div>

        <div className="sect-head" style={{ paddingTop: 18 }}><h3>H₂ markers</h3><span className="more">PROPRIETARY</span></div>
        <div style={{ padding:'0 18px 16px', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8 }}>
          {[{l:'OXIDATIVE STRESS',v:'−31%',sub:'8-OHdG proxy · 14d',color:'#7CC9EE'},{l:'INFLAMMATION IDX',v:'−22%',sub:'HRV+sleep+H₂ · 7d',color:'#7CC9EE'},{l:'CELLULAR HYDR.',v:'94%',sub:'Intracellular · now',color:'#B8E0F5'},{l:'MITOCHONDRIAL',v:'+18%',sub:'Energy proxy · 14d',color:'#E5C97A'}].map((m,i)=>(
            <div key={i} className="card"><div className="eyebrow" style={{ fontSize: 8 }}>{m.l}</div><div className="display" style={{ fontSize: 28, marginTop: 6, color: m.color, lineHeight: 0.95 }}>{m.v}</div><div className="body-sm" style={{ marginTop: 2, fontSize: 10 }}>{m.sub}</div></div>
          ))}
        </div>

        <div className="sect-head"><h3>What correlates</h3><span className="more">14 DAYS</span></div>
        <div style={{ padding:'0 18px 16px' }}>
          <div className="card">
            {[{l:'H₂ intake ↔ next-day HRV',v:'+0.71',good:true},{l:'H₂ intake ↔ deep sleep',v:'+0.58',good:true},{l:'Skipped days ↔ inflammation',v:'+0.62',good:false},{l:'H₂ pre-workout ↔ recovery',v:'+0.49',good:true}].map((c,i)=>(
              <div key={i} className="metric-row"><div style={{ fontSize: 12, color:'var(--hc-text-2)' }}>{c.l}</div><div style={{ fontFamily:'var(--hc-mono)', fontSize: 13, color: c.good?accent:'#E59E7A', fontWeight: 500 }}>{c.v}</div></div>
            ))}
          </div>
        </div>

        <div className="sect-head"><h3>Monday's report</h3><span className="more">2 DAYS</span></div>
        <div style={{ padding:'0 18px 22px' }}>
          <ImgTile src={PHOTO.lab} h={130} eyebrow="LAB-GRADE WEEKLY READOUT" label="Your 14→21 day cohort" sub="Shareable PDF · 4 biomarker pages"/>
        </div>
      </div>
      <BottomTabs active={tab} onTab={setTab} accent={accent}/>
    </div>
  );
}

/* ============== RECOVERY — H₂ correlation + tonight's action ============== */
function ScreenRecovery({ go, accent, tab, setTab }) {
  return (
    <div className="app">
      <TopBar left={<IconBtn onClick={()=>go('home')}><I.back size={14}/></IconBtn>} title="RECOVERY" right={<IconBtn><I.more size={14}/></IconBtn>}/>
      <div className="app-scroll">
        <div style={{ position:'relative', height:210 }}>
          <img src={PHOTO.recovery} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(0.2) contrast(1.05)' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(5,6,8,0.15), rgba(5,6,8,0.95))' }}/>
          <div style={{ position:'absolute', left:18, right:18, bottom:14 }}>
            <div className="eyebrow eyebrow-ice">RECOVERY · TODAY</div>
            <div className="display" style={{ fontSize: 60, color:'#fff', lineHeight: 0.9 }}>89<span style={{ fontSize:16, color:'rgba(255,255,255,0.5)' }}>/100</span></div>
            <div className="body-sm" style={{ color:'rgba(255,255,255,0.7)', marginTop: 4 }}>Highest in 14 days. Sleep window opens at 22:30.</div>
          </div>
        </div>

        <div style={{ padding:'14px 18px 6px', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:0 }}>
          {[{l:'HRV',v:'68',d:'+8'},{l:'RHR',v:'52',d:'−4'},{l:'SLEEP',v:'7:42',d:'+0:36'}].map((s,i)=>(
            <div key={i} style={{ borderRight: i<2?'1px solid var(--hc-graphite-4)':'none', paddingLeft: i>0?12:0 }}>
              <div className="eyebrow" style={{ fontSize:8 }}>{s.l}</div>
              <div className="display" style={{ fontSize:26, marginTop:4 }}>{s.v}</div>
              <div className="body-sm" style={{ fontSize: 9, color: accent }}>{s.d} VS 7D AVG</div>
            </div>
          ))}
        </div>

        {/* THE H2 STORY — main card */}
        <div className="sect-head" style={{ paddingTop: 18 }}><h3>H₂ days vs not</h3><span className="more">14 DAYS</span></div>
        <div style={{ padding:'0 18px 16px' }}>
          <div className="card card-elev" style={{ padding: 16, borderColor:'rgba(124,201,238,0.2)' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12 }}>
              <div style={{ textAlign:'center', padding:'14px 0', background:'rgba(124,201,238,0.08)', borderRadius: 12, border:`1px solid ${accent}33` }}>
                <div className="eyebrow eyebrow-ice" style={{ fontSize: 8 }}>WITH H₂</div>
                <div className="display" style={{ fontSize: 38, color: accent, marginTop: 6 }}>91</div>
                <div className="body-sm" style={{ fontSize: 9 }}>11 DAYS</div>
              </div>
              <div style={{ textAlign:'center', padding:'14px 0', background:'var(--hc-graphite-3)', borderRadius: 12 }}>
                <div className="eyebrow" style={{ fontSize: 8 }}>WITHOUT</div>
                <div className="display" style={{ fontSize: 38, marginTop: 6 }}>74</div>
                <div className="body-sm" style={{ fontSize: 9 }}>3 DAYS</div>
              </div>
            </div>
            <div className="body" style={{ marginTop: 14, fontSize: 12.5, lineHeight: 1.5, color:'var(--hc-text-1)' }}>
              <i style={{ color: accent }}>+17 points</i> on the days you drank H₂. The biggest delta in your data — bigger than caffeine timing or steps.
            </div>
          </div>
        </div>

        {/* TONIGHT'S ACTION — single CTA */}
        <div style={{ padding:'0 18px 22px' }}>
          <div style={{ borderTop:'1px solid var(--hc-graphite-4)', paddingTop: 16 }}>
            <div className="eyebrow eyebrow-ice" style={{ marginBottom: 8 }}>TONIGHT · 21:30</div>
            <div className="display" style={{ fontSize: 24, lineHeight: 1.1, marginBottom: 10 }}>
              One can of <i style={{ color: accent }}>Pure H₂</i>, 60 min before bed.
            </div>
            <div className="body" style={{ color:'var(--hc-text-2)', fontSize: 12.5, lineHeight: 1.5, marginBottom: 14 }}>
              Your deep-sleep correlation is +0.58 — strongest signal in the data. Pre-bed H₂ adds ~24 minutes of slow-wave on average.
            </div>
            <button onClick={()=>go('log')} className="btn btn-block" style={{ background: accent, color:'#050608' }}>Log a can now</button>
          </div>
        </div>
      </div>
      <BottomTabs active={tab} onTab={setTab} accent={accent}/>
    </div>
  );
}

/* ============== COMMUNITY — cohort + leaderboard ============== */
function ScreenCommunity({ go, accent, tab, setTab }) {
  const cohort = [
    { rank: 1, name:'Lena V.',     score: 94, days: 41, you:false, img: PHOTO.athleteRun },
    { rank: 2, name:'Akin O.',     score: 91, days: 28, you:false, img: PHOTO.athleteHIIT },
    { rank: 3, name:'Rita S.',     score: 89, days: 33, you:false, img: PHOTO.recovery },
    { rank: 4, name:'You · Marcus',score: 86, days: 14, you:true,  img: PHOTO.portrait },
    { rank: 5, name:'Tomas H.',    score: 84, days: 22, you:false, img: PHOTO.athleteTrail },
    { rank: 6, name:'Priya N.',    score: 81, days: 19, you:false, img: PHOTO.cells },
  ];
  return (
    <div className="app">
      <TopBar left={<IconBtn onClick={()=>go('home')}><I.back size={14}/></IconBtn>} title="COHORT" right={<IconBtn><I.filter size={14}/></IconBtn>}/>
      <div className="app-scroll">
        <div style={{ position:'relative', height: 180, overflow:'hidden' }}>
          <img src={PHOTO.lab} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(0.5) brightness(0.55)' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(10,12,16,0.3), var(--hc-graphite-1))' }}/>
          <div style={{ position:'absolute', left: 18, right: 18, bottom: 14 }}>
            <div className="eyebrow eyebrow-ice" style={{ marginBottom: 6 }}>JANUARY COHORT · 38,402 RESPONDERS</div>
            <div className="display" style={{ fontSize: 28, color:'#fff', lineHeight: 1 }}>You're in the <i style={{ color: accent }}>top 14%</i></div>
            <div className="body-sm" style={{ color:'rgba(255,255,255,0.6)', marginTop: 4 }}>Up from top 28% last week. 6,742 ahead of you.</div>
          </div>
        </div>

        {/* Percentile bar */}
        <div style={{ padding: '14px 18px 0' }}>
          <div className="card" style={{ padding: 14 }}>
            <div className="eyebrow eyebrow-ice">YOUR POSITION</div>
            <div style={{ position:'relative', height: 8, marginTop: 14, background:'var(--hc-graphite-4)', borderRadius: 4, overflow:'visible' }}>
              <div style={{ position:'absolute', inset:0, width:'86%', height: 8, background:`linear-gradient(90deg, ${accent}33, ${accent})`, borderRadius: 4 }}/>
              <div style={{ position:'absolute', left:'86%', top: -4, width: 3, height: 16, background:'#fff', borderRadius: 1 }}/>
              <div style={{ position:'absolute', left:'86%', top: -22, transform:'translateX(-50%)', fontFamily:'var(--hc-mono)', fontSize: 10, color: accent, whiteSpace:'nowrap' }}>YOU · 86</div>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop: 8 }}>
              <span className="body-sm" style={{ fontSize: 9 }}>BOTTOM</span>
              <span className="body-sm" style={{ fontSize: 9 }}>P50</span>
              <span className="body-sm" style={{ fontSize: 9 }}>TOP 1%</span>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="sect-head" style={{ paddingTop: 18 }}><h3>This week's leaders</h3><span className="more">YOUR COHORT · 6/2,400</span></div>
        <div style={{ padding:'0 18px 16px', display:'flex', flexDirection:'column', gap: 6 }}>
          {cohort.map((p)=>(
            <div key={p.rank} className="card" style={{
              padding: 10, display:'grid', gridTemplateColumns:'24px 36px 1fr auto', gap: 10, alignItems:'center',
              borderColor: p.you ? accent : 'var(--hc-graphite-4)',
              background: p.you ? 'rgba(124,201,238,0.06)' : 'var(--hc-graphite-2)' }}>
              <div style={{ fontFamily:'var(--hc-mono)', fontSize: 11, color: p.you ? accent : 'var(--hc-text-3)', textAlign:'center' }}>#{p.rank}</div>
              <div style={{ width: 36, height: 36, borderRadius:'50%', overflow:'hidden', border: p.you ? `1.5px solid ${accent}` : '1px solid var(--hc-graphite-4)' }}>
                <img src={p.img} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(0.3)' }}/>
              </div>
              <div>
                <div style={{ fontSize: 13, color:'var(--hc-text-1)', fontWeight: p.you ? 600 : 500 }}>{p.name}</div>
                <div className="body-sm" style={{ fontSize: 10 }}>Day {p.days} · streak</div>
              </div>
              <div className="display" style={{ fontSize: 22, color: p.you ? accent : 'var(--hc-text-1)' }}>{p.score}</div>
            </div>
          ))}
        </div>

        {/* Challenges */}
        <div className="sect-head"><h3>Active challenges</h3><span className="more">2 LIVE</span></div>
        <div style={{ padding:'0 18px 22px', display:'flex', flexDirection:'column', gap: 8 }}>
          <div style={{ position:'relative', height: 110, borderRadius: 14, overflow:'hidden' }}>
            <img src={PHOTO.athleteTrail} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, rgba(5,6,8,0.85) 30%, rgba(5,6,8,0.2))' }}/>
            <div style={{ position:'absolute', left: 14, right: 14, top: 12, bottom: 12, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
              <div>
                <div className="eyebrow eyebrow-ice" style={{ fontSize: 8 }}>14-DAY CONSISTENCY · 4D LEFT</div>
                <div className="display" style={{ fontSize: 18, color:'#fff', marginTop: 4 }}>Hit 80+ score, 14 days straight</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
                <div style={{ flex: 1, height: 4, background:'rgba(255,255,255,0.15)', borderRadius: 2, overflow:'hidden' }}>
                  <div style={{ width:'71%', height:'100%', background: accent }}/>
                </div>
                <span style={{ fontFamily:'var(--hc-mono)', fontSize: 10, color: accent }}>10/14</span>
              </div>
            </div>
          </div>
          <div className="card" style={{ display:'grid', gridTemplateColumns:'1fr auto', alignItems:'center', gap: 10 }}>
            <div>
              <div className="eyebrow" style={{ fontSize: 8 }}>NEW · STARTS MON</div>
              <div style={{ fontSize: 13, marginTop: 4, color:'var(--hc-text-1)' }}>Sub-30 inflammation index</div>
              <div className="body-sm" style={{ marginTop: 2, fontSize: 10 }}>1,204 already joined · 7 days</div>
            </div>
            <button className="pill pill-ice" style={{ cursor:'pointer' }}>JOIN</button>
          </div>
        </div>
      </div>
      <BottomTabs active={tab} onTab={setTab} accent={accent}/>
    </div>
  );
}

/* ============== SUBSCRIPTION ============== */
function ScreenSubscription({ go, accent }) {
  const [plan, setPlan] = React.useState('athlete');
  return (
    <div className="app">
      <TopBar left={<IconBtn onClick={()=>go('home')}><I.back size={14}/></IconBtn>} title="MEMBERSHIP" right={<IconBtn><I.bag size={14}/></IconBtn>}/>
      <div className="app-scroll">
        <div style={{ padding:'8px 18px 0' }}>
          <div className="eyebrow">HYDROCAN · DELIVERED</div>
          <div className="display" style={{ fontSize: 32, marginTop: 4 }}>Never run<br/><i style={{ color: accent }}>out again.</i></div>
        </div>
        <div style={{ padding:'18px 18px 0' }}>
          <ImgTile src={PHOTO.product1} h={170} eyebrow="MONTHLY · COLD-CHAIN" label="48 cans / month" sub="Free swap. Pause anytime."/>
        </div>
        <div className="sect-head" style={{ paddingTop: 18 }}><h3>Pick your tier</h3></div>
        <div style={{ padding:'0 18px 18px', display:'flex', flexDirection:'column', gap: 8 }}>
          {[
            { id:'starter',  name:'Starter',  cans: 24, price: 39,  perCan: 1.62, note:'Daily ritual' },
            { id:'athlete',  name:'Athlete',  cans: 48, price: 69,  perCan: 1.43, note:'Most popular · −12%' },
            { id:'pro',      name:'Pro',      cans: 96, price: 119, perCan: 1.23, note:'Hard training · −24%' },
          ].map(p=>{
            const isSel = plan===p.id;
            return (
              <button key={p.id} onClick={()=>setPlan(p.id)} className="card" style={{
                textAlign:'left', cursor:'pointer', padding: 14,
                borderColor: isSel ? accent : 'var(--hc-graphite-4)',
                background: isSel ? 'rgba(124,201,238,0.06)' : 'var(--hc-graphite-2)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
                      <div className="display" style={{ fontSize: 22 }}>{p.name}</div>
                      {p.id==='athlete' && <span className="pill pill-ice" style={{ fontSize: 8 }}>POPULAR</span>}
                    </div>
                    <div className="body-sm" style={{ marginTop: 2 }}>{p.cans} cans · ${p.perCan.toFixed(2)}/can · {p.note}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div className="display" style={{ fontSize: 26, color: isSel ? accent : 'var(--hc-text-1)' }}>${p.price}</div>
                    <div className="eyebrow" style={{ fontSize: 7 }}>/MONTH</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div style={{ padding:'0 18px 22px' }}>
          <button className="btn btn-block" style={{ background: accent, color:'#050608' }}><I.truck size={14}/> Start delivery · ships Tue</button>
        </div>
      </div>
    </div>
  );
}

/* ============== PROFILE ============== */
function ScreenProfile({ go, accent, tab, setTab }) {
  return (
    <div className="app">
      <TopBar left={<IconBtn onClick={()=>go('home')}><I.back size={14}/></IconBtn>} title="PROFILE" right={<IconBtn><I.more size={14}/></IconBtn>}/>
      <div className="app-scroll">
        <div style={{ padding:'10px 18px 14px', display:'flex', alignItems:'center', gap: 14 }}>
          <div style={{ width:64, height:64, borderRadius:'50%', overflow:'hidden', border:`2px solid ${accent}` }}>
            <img src={PHOTO.portrait} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          </div>
          <div style={{ flex:1 }}>
            <div className="display" style={{ fontSize: 24 }}>Marcus K.</div>
            <div className="eyebrow" style={{ marginTop: 2 }}>DAY 14 · TOP 14%</div>
          </div>
        </div>
        <div style={{ padding:'0 18px 14px', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 6 }}>
          {[{l:'STREAK',v:'14'},{l:'CANS',v:'52'},{l:'H₂ SCORE',v:'78'}].map((s,i)=>(
            <div key={i} className="card" style={{ padding: 10, textAlign:'center' }}>
              <div className="display" style={{ fontSize: 22, color: accent }}>{s.v}</div>
              <div className="eyebrow" style={{ fontSize: 7.5, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div className="sect-head"><h3>Your study</h3></div>
        <div style={{ padding:'0 18px 14px' }}>
          {[
            { l:'14-day H₂ report', sub:'Lab-grade PDF · ready Mon', go:'trends' },
            { l:'Workout protocols', sub:'Auto-generated for runs, lifts, HIIT', go:'workout' },
            { l:'Subscription · Athlete', sub:'48 cans/mo · ships Tue', go:'subscription' },
            { l:'Connected wearables', sub:'WHOOP, Garmin, Apple Health' },
            { l:'Notifications', sub:'Briefings, streak, low stock', go:'notifications' },
          ].map((r,i)=>(
            <button key={i} onClick={()=>r.go && go(r.go)} className="metric-row" style={{ width:'100%', background:'none', border:'none', textAlign:'left', cursor:'pointer', padding:'12px 0' }}>
              <div>
                <div style={{ fontSize: 13, color:'var(--hc-text-1)' }}>{r.l}</div>
                <div className="body-sm" style={{ marginTop: 2 }}>{r.sub}</div>
              </div>
              <I.arrow size={14} stroke="var(--hc-text-3)"/>
            </button>
          ))}
        </div>
      </div>
      <BottomTabs active={tab} onTab={setTab} accent={accent}/>
    </div>
  );
}

/* ============== INBOX (notifications) ============== */
function ScreenInbox({ go, accent }) {
  const items = [
    { eye:'COACH · 7:14 AM', h:'Day 14. Top 14% globally.', s:'Oxidative stress −31%. Open to see your numbers.', new:true },
    { eye:'WEEKLY REPORT', h:'Your 7-day H₂ readout is ready', s:'Inflammation index −22%. PDF inside.', new:true },
    { eye:'STREAK', h:'Day 14 — keep it', s:'Skipping resets compounding effect. ~80ml before bed.', new:false },
    { eye:'DELIVERY', h:'Shipped — arriving Tue', s:'48 cans · refrigerated cold-chain.', new:false },
    { eye:'INSIGHT', h:'You sleep deeper on H₂ days', s:'Correlation: +0.58 across 14 days.', new:false },
  ];
  return (
    <div className="app">
      <TopBar left={<IconBtn onClick={()=>go('home')}><I.back size={14}/></IconBtn>} title="INBOX · 5" right={<IconBtn><I.filter size={14}/></IconBtn>}/>
      <div className="app-scroll">
        <div style={{ padding:'6px 18px 12px' }}>
          <div className="eyebrow">TODAY</div>
          <div className="display" style={{ fontSize: 28, marginTop: 4 }}>What you need <i style={{ color: accent }}>to see.</i></div>
        </div>
        <div style={{ padding:'0 18px 22px', display:'flex', flexDirection:'column', gap: 8 }}>
          {items.map((it,i)=>(
            <div key={i} className="card" style={{ borderColor: it.new ? 'rgba(124,201,238,0.25)' : 'var(--hc-graphite-4)', display:'grid', gridTemplateColumns:'1fr auto', gap: 8, alignItems:'flex-start' }}>
              <div>
                <div className="eyebrow" style={{ fontSize: 8, color: it.new ? accent : 'var(--hc-text-3)' }}>{it.eye}</div>
                <div style={{ fontSize: 13.5, marginTop: 4, color:'var(--hc-text-1)', fontWeight: 500 }}>{it.h}</div>
                <div className="body-sm" style={{ marginTop: 3 }}>{it.s}</div>
              </div>
              {it.new && <span style={{ width: 7, height: 7, borderRadius:'50%', background: accent, marginTop: 6 }}/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============== PRODUCT ============== */
function ScreenProduct({ go, accent }) {
  return (
    <div className="app">
      <TopBar left={<IconBtn onClick={()=>go('home')}><I.back size={14}/></IconBtn>} title="ELECTRO H₂" right={<IconBtn><I.bag size={14}/></IconBtn>}/>
      <div className="app-scroll">
        <div style={{ position:'relative', height: 240, background:'#0F1218' }}>
          <img src={PHOTO.product2} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(5,6,8,0.3), rgba(5,6,8,0.85))' }}/>
          <div style={{ position:'absolute', left: 18, right: 18, bottom: 16 }}>
            <div className="eyebrow eyebrow-ice">PERFORMANCE LINE</div>
            <div className="display" style={{ fontSize: 38, color:'#fff', marginTop: 4 }}>Electro H₂</div>
          </div>
        </div>
        <div style={{ padding:'14px 18px 0', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 0 }}>
          {[{l:'H₂',v:'1.6',u:'PPM'},{l:'PH',v:'8.4',u:''},{l:'NA+',v:'420',u:'MG'}].map((s,i)=>(
            <div key={i} style={{ borderRight: i<2?'1px solid var(--hc-graphite-4)':'none', paddingLeft: i>0?12:0 }}>
              <div className="eyebrow" style={{ fontSize: 8 }}>{s.l}</div>
              <div className="display" style={{ fontSize: 24, marginTop: 4, color: i===0?accent:'var(--hc-text-1)' }}>{s.v}<span style={{ fontSize: 10, color:'var(--hc-text-3)' }}> {s.u}</span></div>
            </div>
          ))}
        </div>
        <div style={{ padding: 18 }}>
          <p style={{ fontSize: 13.5, lineHeight: 1.5, color:'var(--hc-text-2)', margin: 0 }}>
            Engineered for sustained output. Sodium-loaded for sweat replacement. H₂-saturated for redox. Zero sweetener.
          </p>
        </div>
        <div style={{ padding:'0 18px 22px' }}>
          <button className="btn btn-block" style={{ background: accent, color:'#050608' }} onClick={()=>go('subscription')}>Add to subscription · $1.43</button>
        </div>
      </div>
    </div>
  );
}

window.HCS2 = { ScreenTrends, ScreenRecovery, ScreenCommunity, ScreenSubscription, ScreenProfile, ScreenInbox, ScreenProduct };
