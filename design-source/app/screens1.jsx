/* Hydrocan H₂ — Today + AI Coach + Onboarding + Log + Scan + Workout */

const { I, TopBar, IconBtn, BottomTabs, H2Ring, H2Numeric, H2Cellular, ImgTile } = window.HCPrim;
const { PHOTO, COACH_VOICES, USER, todaySummary } = window.HC;
const _t = todaySummary(USER);
const _voiceLine = (v, key) => {
  const f = v && v[key];
  return typeof f === 'function' ? f(_t, USER) : (f || '');
};

/* ============== ONBOARDING ============== */
function ScreenOnboarding({ go, accent }) {
  return (
    <div className="app" style={{ background:'#000' }}>
      <img src={PHOTO.athleteRun} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(0.3) contrast(1.05)', zIndex:0 }}/>
      <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(180deg, rgba(5,6,8,0.4) 0%, rgba(5,6,8,0.2) 35%, rgba(5,6,8,0.92) 80%, rgba(5,6,8,0.99) 100%)' }}/>
      <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', height:'100%', padding:'56px 22px 28px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontWeight:900, fontSize:18, letterSpacing:'-0.02em' }}>HYDROCAN<span style={{ color: accent, marginLeft: 4 }}>·H₂</span></div>
          <div className="eyebrow">SKIP</div>
        </div>
        <div style={{ flex:1 }}/>
        <div className="eyebrow eyebrow-ice" style={{ marginBottom: 14 }}>HYDROGEN HEALTH · OS</div>
        <div className="display" style={{ fontSize: 52, color:'#fff', marginBottom: 18, lineHeight: 0.95 }}>
          The first app that<br/><i style={{ color: accent }}>scores how H₂</i><br/>changes <i>you</i>.
        </div>
        <div className="body" style={{ color:'rgba(255,255,255,0.78)', marginBottom: 26, fontSize: 13 }}>
          Hydrogen-rich water lowers oxidative stress, inflammation, and recovery debt. Hydrocan measures all three — on you, every day.
        </div>
        <button className="btn btn-block" style={{ background: accent, color:'#050608', marginBottom: 10 }} onClick={()=>go && go('home')}>Begin · 14-day study</button>
        <button className="btn btn-block" style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.15)', color:'#fff' }}>I have an account</button>
      </div>
    </div>
  );
}

/* ============== TODAY — MATERIAL MACRO. The score floats over water. ============== */
function ScreenToday({ tweaks, go, accent, tab, setTab }) {
  const score = (tweaks.userState === 'dehydrated') ? 42 : (tweaks.userState === 'athlete') ? 86 : (tweaks.userState === 'casual') ? 64 : 78;
  const isEve = tweaks.timeOfDay === 'evening';
  const bgImage = isEve ? PHOTO.bubbles : PHOTO.waterMacro;

  // Issue/edition style metadata — like a journal masthead
  const edition = isEve ? 'EVENING EDITION' : 'MORNING EDITION';
  const time = isEve ? '19:42' : '07:14';
  const tempC = isEve ? '14°' : '11°';

  // ONE editorial finding — the body of today's "page"
  const finding = isEve
    ? { label:'TODAY\u2019S FINDING', body:'Your inflammation index sits at its lowest point in the study — down 22% over seven days.', detail:'The strongest stretch since you began. Optimal sleep window opens at 22:30.', cta:'Read your study', goTo:'trends' }
    : { label:'TODAY\u2019S FINDING', body:'Day fourteen. Oxidative stress, down thirty-one percent — your body has begun to respond.', detail:'The H\u2082 effect compounds from here. Week eight is where the curve steepens.', cta:'Read your study', goTo:'trends' };

  // Volume / total — small monospace footnote band
  return (
    <div className="app" style={{ background:'#050608' }}>
      {/* FULL-BLEED MACRO — the whole screen is the photo, scrim is heavy */}
      <div style={{ position:'absolute', inset: 0, zIndex: 0, overflow:'hidden' }}>
        <img src={bgImage} alt="" style={{
          width:'100%', height:'100%', objectFit:'cover',
          filter:'grayscale(0.85) brightness(0.42) contrast(1.15) blur(0.5px)',
          transform:'scale(1.05)'
        }}/>
        {/* layered scrims for depth */}
        <div style={{ position:'absolute', inset:0,
          background:'radial-gradient(ellipse 70% 50% at 50% 38%, rgba(124,201,238,0.10), transparent 60%)' }}/>
        <div style={{ position:'absolute', inset:0,
          background:'linear-gradient(180deg, rgba(5,6,8,0.55) 0%, rgba(5,6,8,0.25) 30%, rgba(5,6,8,0.55) 70%, rgba(5,6,8,0.95) 100%)' }}/>
        {/* faint vertical gradient grain via noise-ish overlay using SVG turbulence */}
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.06, mixBlendMode:'overlay', pointerEvents:'none' }}>
          <filter id="todaygrain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter>
          <rect width="100%" height="100%" filter="url(#todaygrain)"/>
        </svg>
      </div>

      {/* CONTENT — sits over the macro */}
      <div style={{ position:'relative', zIndex: 1, display:'flex', flexDirection:'column', height:'100%' }}>

        {/* Masthead — like a journal */}
        <div style={{ padding:'12px 22px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', color:'rgba(255,255,255,0.55)' }}>
            HYDROCAN<span style={{ color: accent, marginLeft: 4 }}>·</span>H₂
          </div>
          <button onClick={()=>go('notifications')} style={{
            background:'transparent', border:'none', color:'rgba(255,255,255,0.55)',
            fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.22em', cursor:'pointer', padding: 4
          }}>
            INBOX · 2 NEW
          </button>
        </div>

        {/* Edition rule — fine line, mono labels */}
        <div style={{ margin:'10px 22px 0', borderTop:'1px solid rgba(255,255,255,0.12)', borderBottom:'1px solid rgba(255,255,255,0.12)',
          padding:'7px 0', display:'flex', justifyContent:'space-between' }}>
          <span style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color:'rgba(255,255,255,0.7)' }}>{edition}</span>
          <span style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color:'rgba(255,255,255,0.5)' }}>VOL.II · NO.014</span>
          <span style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.22em', color:'rgba(255,255,255,0.5)' }}>{time} · {tempC}</span>
        </div>

        {/* WATERMARK SCORE — floats over the macro, large but quiet */}
        <div style={{ flex: 1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 22px', position:'relative' }}>

          {/* Tiny eyebrow above score */}
          <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9, letterSpacing:'0.32em', color:'rgba(255,255,255,0.5)', marginBottom: 6 }}>
            H₂ · RESPONSE · SCORE
          </div>

          {/* The score — outlined, letter-pressed feel, ENORMOUS */}
          <div style={{ position:'relative', display:'flex', alignItems:'flex-start', justifyContent:'center' }}>
            <div style={{
              fontFamily:'var(--hc-display)', fontWeight: 400, fontStyle:'italic',
              fontSize: 220, lineHeight: 0.82, letterSpacing:'-0.04em',
              color: '#fff',
              textShadow: `0 0 60px ${accent}40, 0 2px 0 rgba(0,0,0,0.4)`,
              fontVariantNumeric:'tabular-nums',
            }}>
              {score}
            </div>
            {/* /100 superscript */}
            <div style={{ marginLeft: 6, marginTop: 18, fontFamily:'var(--hc-mono)', fontSize: 11, letterSpacing:'0.2em', color:'rgba(255,255,255,0.55)' }}>
              /100
            </div>
          </div>

          {/* Hairline rule + delta */}
          <div style={{ width: 80, height: 1, background:'rgba(255,255,255,0.25)', margin:'14px 0 12px' }}/>
          <div style={{ fontFamily:'var(--hc-mono)', fontSize: 9.5, letterSpacing:'0.22em', color:'rgba(255,255,255,0.7)' }}>
            <span style={{ color: accent }}>+14</span>&nbsp;&nbsp;FROM YESTERDAY&nbsp;&nbsp;<span style={{ color:'rgba(255,255,255,0.3)' }}>·</span>&nbsp;&nbsp;<span style={{ color: accent }}>+86%</span>&nbsp;&nbsp;FROM DAY 1
          </div>

          {/* Editorial caption — subtle, not a card */}
          <div style={{ marginTop: 30, maxWidth: 280, textAlign:'center' }}>
            <div style={{ fontFamily:'var(--hc-mono)', fontSize: 8.5, letterSpacing:'0.32em', color: accent, marginBottom: 10 }}>
              ¶ {finding.label}
            </div>
            <div style={{
              fontFamily:'var(--hc-display)', fontWeight: 400, fontSize: 19, lineHeight: 1.25,
              color:'rgba(255,255,255,0.95)', letterSpacing:'-0.01em', textWrap:'pretty'
            }}>
              {finding.body}
            </div>
          </div>
        </div>

        {/* BOTTOM EDITORIAL FOOTER — three columns, like a newspaper masthead foot */}
        <div style={{ padding:'14px 22px 6px' }}>
          {/* hairline */}
          <div style={{ height:1, background:'rgba(255,255,255,0.12)', marginBottom: 12 }}/>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
            {[
              { l:'STREAK', v:'14' },
              { l:'INTAKE', v:'1.4L' },
              { l:'NEXT', v: isEve ? '21:00' : '17:00' },
            ].map((m,i)=>(
              <div key={i} style={{ textAlign: i===1?'center':(i===0?'left':'right') }}>
                <div style={{ fontFamily:'var(--hc-mono)', fontSize: 8, letterSpacing:'0.28em', color:'rgba(255,255,255,0.45)' }}>{m.l}</div>
                <div style={{ fontFamily:'var(--hc-display)', fontWeight: 400, fontSize: 22, color:'#fff', marginTop: 2, letterSpacing:'-0.02em' }}>{m.v}</div>
              </div>
            ))}
          </div>

          {/* Two restrained CTAs — text-only with chevrons, like editorial links */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
            <button onClick={()=>go(finding.goTo)} style={{
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.16)',
              padding:'13px 14px', borderRadius: 0, cursor:'pointer', textAlign:'left',
              display:'flex', flexDirection:'column', gap: 4
            }}>
              <span style={{ fontFamily:'var(--hc-mono)', fontSize: 7.5, letterSpacing:'0.28em', color:'rgba(255,255,255,0.5)' }}>I.</span>
              <span style={{ fontFamily:'var(--hc-display)', fontSize: 14, color:'#fff', letterSpacing:'-0.01em' }}>Read your study →</span>
            </button>
            <button onClick={()=>go(isEve ? 'log' : 'workout')} style={{
              background: accent, border:'none',
              padding:'13px 14px', borderRadius: 0, cursor:'pointer', textAlign:'left',
              display:'flex', flexDirection:'column', gap: 4
            }}>
              <span style={{ fontFamily:'var(--hc-mono)', fontSize: 7.5, letterSpacing:'0.28em', color:'rgba(5,6,8,0.55)' }}>II.</span>
              <span style={{ fontFamily:'var(--hc-display)', fontSize: 14, color:'#050608', letterSpacing:'-0.01em' }}>{isEve ? 'Log evening can →' : 'Open run plan →'}</span>
            </button>
          </div>
        </div>

        <BottomTabs active={tab} onTab={setTab} accent={accent}/>
      </div>
    </div>
  );
}

/* ============== COACH ============== */
function ScreenCoach({ tweaks, go, accent, tab, setTab }) {
  const voice = COACH_VOICES[tweaks.coachVoice || 'direct'];
  const morningLine = _voiceLine(voice, 'morning');
  const eveningLine = _voiceLine(voice, 'evening');
  const insightLine = _voiceLine(voice, 'insight');
  const SEED = [
    { from:'coach', text: morningLine },
    { from:'user',  text: "Why is my recovery score " + _t.score + "?" },
    { from:'coach', text: insightLine },
  ];
  const [messages, setMessages] = React.useState(SEED);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const scrollRef = React.useRef();
  React.useEffect(()=>{ if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, typing]);

  const reply = (txt) => {
    const t = txt.toLowerCase();
    if (t.includes('h2') || t.includes('hydrogen') || t.includes('score')) return insightLine;
    if (t.includes('week') || t.includes('review')) return eveningLine;
    if (t.includes('workout') || t.includes('run')) return "Pre: 500ml H₂ Electro 45 min out. During: 200ml every 15 min. Post: 750ml Recover within 60 min. Logged to your protocol.";
    if (t.includes('inflam')) return "Inflammation index −22% in 7 days. Strongest drop on days you exceeded 2L. Keep stacking.";
    return "Based on your last 14 days: drink 350ml H₂ Pure now, then a Citrus around 14:00. Your sweat rate today is 12% above baseline.";
  };
  const send = (text) => {
    if (!text.trim()) return;
    setMessages(m=>[...m, { from:'user', text }]);
    setInput(''); setTyping(true);
    setTimeout(()=>{ setMessages(m=>[...m, { from:'coach', text: reply(text) }]); setTyping(false); }, 800);
  };

  return (
    <div className="app">
      <TopBar left={<IconBtn onClick={()=>go('home')}><I.back size={14}/></IconBtn>} title=" " right={<IconBtn><I.more size={14}/></IconBtn>}/>
      <div style={{ padding:'0 18px 12px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid var(--hc-graphite-4)' }}>
        <div style={{ position:'relative', width:42, height:42 }}>
          <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:`radial-gradient(circle, ${accent}, transparent 70%)`, opacity:0.5 }} className="pulse"/>
          <div style={{ position:'absolute', inset:5, borderRadius:'50%', background:'var(--hc-graphite-3)', border:`1px solid ${accent}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <I.spark size={18} stroke={accent}/>
          </div>
        </div>
        <div style={{ flex:1 }}>
          <div className="display" style={{ fontSize:20 }}>{voice.name}</div>
          <div className="eyebrow" style={{ marginTop:1, fontSize:8.5 }}>{voice.title}</div>
        </div>
        <span className="pill pill-ice" style={{ fontSize:8 }}><span style={{ width:5, height:5, borderRadius:'50%', background:accent }} className="pulse"/> ONLINE</span>
      </div>

      {/* Briefing card */}
      <div style={{ padding:'12px 18px 6px' }}>
        <div className="card card-elev" style={{ borderColor:'rgba(124,201,238,0.25)', padding: 12 }}>
          <div className="eyebrow eyebrow-ice" style={{ fontSize: 8 }}>DAILY BRIEFING · 07:14</div>
          <div style={{ marginTop:6, color:'var(--hc-text-1)', fontSize:13, lineHeight:1.45 }}>"{tweaks.timeOfDay==='evening' ? eveningLine : morningLine}"</div>
        </div>
      </div>

      <div ref={scrollRef} className="app-scroll" style={{ padding:'10px 18px 4px', display:'flex', flexDirection:'column', gap:8 }}>
        {messages.map((m,i)=>(
          <div key={i} className={`bubble ${m.from==='user' ? 'bubble-user' : 'bubble-coach'}`} style={m.from==='user' ? { background: accent } : null}>{m.text}</div>
        ))}
        {typing && <div className="bubble bubble-coach" style={{ width: 50 }}><span className="dot"/><span className="dot"/><span className="dot"/></div>}
      </div>

      <div style={{ padding:'4px 14px 6px', display:'flex', gap:5, overflowX:'auto', flexShrink:0 }}>
        {['Why is my H₂ Score 78?','Pre-run protocol','Show inflammation trend','Recommend a can'].map((s,i)=>(
          <button key={i} onClick={()=>send(s)} className="pill" style={{ flexShrink:0, cursor:'pointer' }}>{s}</button>
        ))}
      </div>

      <div style={{ padding:'6px 14px 12px', display:'flex', gap:7, alignItems:'center', borderTop:'1px solid var(--hc-graphite-4)' }}>
        <button style={{ width:34, height:34, borderRadius:'50%', background:'var(--hc-graphite-3)', border:'1px solid var(--hc-graphite-4)', color:'var(--hc-text-2)', display:'flex', alignItems:'center', justifyContent:'center' }}><I.plus size={16}/></button>
        <div style={{ flex:1, background:'var(--hc-graphite-3)', borderRadius:22, border:'1px solid var(--hc-graphite-4)', padding:'8px 14px', display:'flex', alignItems:'center', gap:8 }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send(input); }}
            placeholder={`Ask ${voice.name}…`}
            style={{ flex:1, background:'transparent', border:'none', outline:'none', color:'var(--hc-text-1)', fontFamily:'var(--hc-sans)', fontSize:13 }}/>
          <I.mic size={14} stroke="var(--hc-text-3)"/>
        </div>
        <button onClick={()=>send(input)} style={{ width:34, height:34, borderRadius:'50%', background: accent, border:'none', color:'#050608', display:'flex', alignItems:'center', justifyContent:'center' }}><I.send size={14}/></button>
      </div>
    </div>
  );
}

/* ============== LOG ============== */
const CANS = [
  { id:'pure',    name:'Pure H₂',     subtitle:'1.6 ppm dissolved',    tag:'EVERYDAY', color:'#B8E0F5' },
  { id:'electro', name:'Electro H₂',  subtitle:'Sodium · Mg · K+',     tag:'PERFORM',  color:'#7CC9EE' },
  { id:'citrus',  name:'Citrus H₂',   subtitle:'Yuzu · Pink salt',     tag:'DAILY',    color:'#E5C97A' },
  { id:'recover', name:'Recover H₂',  subtitle:'BCAA · L-Theanine',    tag:'POST',     color:'#C7B8F5' },
];

function ScreenLog({ go, accent, tab, setTab }) {
  const [amount, setAmount] = React.useState(330);
  const [selected, setSelected] = React.useState('pure');
  return (
    <div className="app">
      <TopBar left={<IconBtn onClick={()=>go('home')}><I.back size={14}/></IconBtn>} title="LOG H₂ INTAKE" right={<IconBtn onClick={()=>go('scan')}><I.scan size={14}/></IconBtn>}/>
      <div className="app-scroll">
        <div style={{ padding:'10px 18px 0' }}>
          <div className="eyebrow">ADD HYDROCAN</div>
          <div className="display" style={{ fontSize:30, marginTop:4 }}>Tap, scan,<br/><i style={{ color: accent }}>or speak.</i></div>
        </div>
        <div style={{ padding:'20px 18px 6px', textAlign:'center' }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>AMOUNT · ML</div>
          <div className="display" style={{ fontSize: 88, color: accent, lineHeight: 0.9 }}>{amount}</div>
          <div className="body-sm" style={{ marginTop: 4 }}>{(amount/1000).toFixed(2)}L · adds ~+{Math.round(amount/120)} to H₂ Score</div>
          <div style={{ display:'flex', gap:6, justifyContent:'center', marginTop:14, flexWrap:'wrap' }}>
            {[150, 250, 330, 500, 750].map(v=>(
              <button key={v} onClick={()=>setAmount(v)} className="pill"
                style={{ cursor:'pointer', background: amount===v ? accent : 'var(--hc-graphite-3)', color: amount===v ? '#050608' : 'var(--hc-text-2)', borderColor: amount===v ? accent : 'var(--hc-graphite-4)' }}>
                {v}ML
              </button>
            ))}
          </div>
        </div>
        <div className="sect-head" style={{ paddingTop: 22 }}><h3>Which can?</h3><span className="more">{CANS.length} TYPES</span></div>
        <div style={{ padding:'0 18px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8 }}>
          {CANS.map(c=>(
            <button key={c.id} onClick={()=>setSelected(c.id)} className="card"
              style={{ padding:12, textAlign:'left', cursor:'pointer',
                borderColor: selected===c.id ? accent : 'var(--hc-graphite-4)',
                background: selected===c.id ? 'rgba(124,201,238,0.06)' : 'var(--hc-graphite-2)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius:'50%', background: c.color }}/>
                <span className="eyebrow" style={{ fontSize: 7.5 }}>{c.tag}</span>
              </div>
              <div className="display" style={{ fontSize: 19, color:'var(--hc-text-1)' }}>{c.name}</div>
              <div className="body-sm" style={{ marginTop: 2, fontSize: 10 }}>{c.subtitle}</div>
            </button>
          ))}
        </div>
        <div style={{ padding:'18px 18px 24px' }}>
          <button className="btn btn-block" style={{ background: accent, color:'#050608' }} onClick={()=>go('home')}>Add {amount}ml of {CANS.find(c=>c.id===selected).name}</button>
          <div style={{ display:'flex', gap: 8, marginTop: 8 }}>
            <button className="btn" style={{ flex:1, background:'var(--hc-graphite-3)', color:'var(--hc-text-1)', border:'1px solid var(--hc-graphite-4)' }} onClick={()=>go('scan')}><I.scan size={13}/> SCAN</button>
            <button className="btn" style={{ flex:1, background:'var(--hc-graphite-3)', color:'var(--hc-text-1)', border:'1px solid var(--hc-graphite-4)' }}><I.mic size={13}/> VOICE</button>
          </div>
        </div>
      </div>
      <BottomTabs active={tab} onTab={setTab} accent={accent}/>
    </div>
  );
}

/* ============== SCAN ============== */
function ScreenScan({ go, accent }) {
  return (
    <div className="app" style={{ background:'#000' }}>
      <img src={PHOTO.productMoody} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.4) contrast(1.1)', zIndex:0 }}/>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(0,0,0,0.4), rgba(0,0,0,0.92))', zIndex:1 }}/>
      <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', height:'100%' }}>
        <TopBar left={<IconBtn onClick={()=>go('log')}><I.close size={14}/></IconBtn>} title="SCAN A CAN" right={<IconBtn><I.bolt size={14}/></IconBtn>}/>
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 22px', textAlign:'center' }}>
          <div style={{ position:'relative', width:200, height:200 }}>
            {[{top:0,left:0,r:'90deg'},{top:0,right:0,r:'180deg'},{bottom:0,right:0,r:'-90deg'},{bottom:0,left:0,r:'0deg'}].map((c,i)=>(
              <div key={i} style={{ position:'absolute', width:30, height:30, borderTop:`2px solid ${accent}`, borderLeft:`2px solid ${accent}`, transform:`rotate(${c.r})`, ...c }}/>
            ))}
            <div style={{ position:'absolute', inset:10, overflow:'hidden' }}>
              <div className="scan-line" style={{ background:`linear-gradient(90deg, transparent, ${accent}, transparent)` }}/>
            </div>
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color: accent }}><I.scan size={26} stroke={accent}/></div>
          </div>
          <div className="display" style={{ fontSize:26, color:'#fff', marginTop:30 }}>Center the code</div>
          <div className="body-sm" style={{ color:'rgba(255,255,255,0.6)', marginTop:6, maxWidth:240 }}>Hold over the can's NFC chip or QR code. We'll log it automatically.</div>
          <div style={{ display:'flex', gap:8, marginTop:24 }}>
            <span className="pill pill-ice">NFC</span>
            <span className="pill" style={{ background:'rgba(255,255,255,0.06)', borderColor:'rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.7)' }}>QR</span>
            <span className="pill" style={{ background:'rgba(255,255,255,0.06)', borderColor:'rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.7)' }}>BARCODE</span>
          </div>
        </div>
        <div style={{ padding:'0 18px 22px' }}>
          <button className="btn btn-block" style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff' }} onClick={()=>go('log')}>Enter manually</button>
        </div>
      </div>
    </div>
  );
}

/* ============== RUN PLAN — simple Before/During/After ============== */
function ScreenWorkout({ go, accent }) {
  const steps = [
    { when:'BEFORE', time:'45 min before', title:'1 can · Electro H₂', body:'Sodium-load so you don\'t cramp. The salt + H₂ combo is the part most runners get wrong.', img: PHOTO.athleteRun, done:true },
    { when:'DURING', time:'Every 15 min',  title:'A few sips · Pure H₂', body:'Small, frequent. Big gulps slosh and slow you down. Aim for a third of a can each interval.', img: PHOTO.athleteHIIT, done:false },
    { when:'AFTER',  time:'Within 1 hour', title:'1 can · Recover H₂', body:'BCAAs + electrolytes inside the recovery window. This is the can that drops next-day soreness most.', img: PHOTO.recovery, done:false },
  ];
  return (
    <div className="app">
      <TopBar left={<IconBtn onClick={()=>go('home')}><I.back size={14}/></IconBtn>} title="RUN PLAN" right={<IconBtn><I.more size={14}/></IconBtn>}/>
      <div className="app-scroll">
        <div style={{ position:'relative', height:210, overflow:'hidden' }}>
          <img src={PHOTO.athleteTrail} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(5,6,8,0.15), rgba(5,6,8,0.95))' }}/>
          <div style={{ position:'absolute', left: 18, right: 18, bottom: 16 }}>
            <div className="eyebrow eyebrow-ice">17:00 · TRAIL · 10K TEMPO</div>
            <div className="display" style={{ fontSize:32, color:'#fff', marginTop:4 }}>Your <i style={{ color: accent }}>3-can</i> plan</div>
            <div className="body-sm" style={{ color:'rgba(255,255,255,0.7)', marginTop: 4 }}>Built around your sweat rate · 84°F outside</div>
          </div>
        </div>
        <div style={{ padding:'16px 18px 22px' }}>
          {steps.map((s,i)=>(
            <div key={i} style={{ marginBottom: 12, borderRadius: 14, overflow:'hidden', background:'var(--hc-graphite-2)', border:'1px solid var(--hc-graphite-4)' }}>
              <div style={{ display:'grid', gridTemplateColumns:'104px 1fr' }}>
                <div style={{ position:'relative' }}>
                  <img src={s.img} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(0.3)' }}/>
                  <div style={{ position:'absolute', inset:0, background: s.done ? `linear-gradient(135deg, ${accent}66, transparent)` : 'rgba(5,6,8,0.25)' }}/>
                  <div style={{ position:'absolute', top: 8, left: 8 }}>
                    <span className="pill" style={{ fontSize: 8, background:'rgba(5,6,8,0.7)', borderColor: s.done?accent:'transparent', color: s.done?accent:'#fff' }}>{i+1} · {s.when}</span>
                  </div>
                </div>
                <div style={{ padding:'12px 14px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                    <span className="eyebrow" style={{ fontSize: 8, color: s.done ? accent : 'var(--hc-text-3)' }}>{s.time}</span>
                    {s.done && <I.check size={13} stroke={accent}/>}
                  </div>
                  <div className="display" style={{ fontSize: 18, marginTop: 4, lineHeight: 1.1 }}>{s.title}</div>
                  <div className="body-sm" style={{ marginTop: 5, fontSize: 11.5, lineHeight: 1.45 }}>{s.body}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding:'0 18px 22px' }}>
          <button className="btn btn-block" style={{ background: accent, color:'#050608' }}>START RUN</button>
          <button className="btn btn-block" style={{ marginTop: 8, background:'var(--hc-graphite-3)', border:'1px solid var(--hc-graphite-4)', color:'var(--hc-text-1)' }}>Why this plan?</button>
        </div>
      </div>
    </div>
  );
}

window.HCS1 = { ScreenOnboarding, ScreenToday, ScreenCoach, ScreenLog, ScreenScan, ScreenWorkout };
