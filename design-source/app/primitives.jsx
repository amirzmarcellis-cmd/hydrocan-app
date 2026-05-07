/* Hydrocan H₂ — Tighter, premium app primitives */

const ICONS = {
  home: <path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z"/>,
  spark: <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>,
  chart: <path d="M3 20h18M7 16V9M12 16V5M17 16v-7"/>,
  scan: <g><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM18 18h3v3h-3z"/></g>,
  user: <g><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></g>,
  drop: <path d="M12 3s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z"/>,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>,
  plus: <path d="M12 5v14M5 12h14"/>,
  back: <path d="M19 12H5M11 6l-6 6 6 6"/>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6"/>,
  bell: <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9zM10 21a2 2 0 0 0 4 0"/>,
  bag: <path d="M5 8h14l-1 12H6L5 8zM9 8a3 3 0 0 1 6 0"/>,
  send: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>,
  mic: <g><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></g>,
  more: <g><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></g>,
  search: <g><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></g>,
  close: <path d="M6 6l12 12M18 6 6 18"/>,
  flame: <path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-5s3-3 3-3zM7 14a5 5 0 0 0 10 0c0 4-2 8-5 8s-5-4-5-8z"/>,
  filter: <path d="M3 5h18M6 12h12M10 19h4"/>,
  watch: <g><rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 6V3h6v3M9 18v3h6v-3"/></g>,
  truck: <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7M6 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>,
  check: <path d="M5 12l4 4 10-10"/>,
};

const I = {};
Object.keys(ICONS).forEach(k => {
  I[k] = ({ size = 20, sw = 1.5, stroke = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{ICONS[k]}</svg>
  );
});

function TopBar({ left, right, title }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'8px 18px 6px' }}>
      <div style={{ minWidth: 28, display:'flex' }}>{left}</div>
      <div style={{ fontFamily:'var(--hc-mono)', fontSize:10, letterSpacing:'0.2em',
        textTransform:'uppercase', color:'var(--hc-text-2)' }}>{title}</div>
      <div style={{ minWidth: 28, display:'flex', justifyContent:'flex-end' }}>{right}</div>
    </div>
  );
}

function IconBtn({ children, onClick, badge }) {
  return (
    <button onClick={onClick} style={{
      width: 30, height: 30, borderRadius: 10,
      background: 'var(--hc-graphite-3)', border: '1px solid var(--hc-graphite-4)',
      color: 'var(--hc-text-1)', display:'flex', alignItems:'center', justifyContent:'center',
      cursor: 'pointer', position: 'relative', padding: 0,
    }}>
      {children}
      {badge && <span style={{ position:'absolute', top:-2, right:-2, width:7, height:7, borderRadius:'50%', background:'var(--hc-ice-bright)' }}/>}
    </button>
  );
}

function BottomTabs({ active, onTab, accent }) {
  const tabs = [
    { k:'home',  l:'TODAY', i:'home' },
    { k:'coach', l:'COACH', i:'spark' },
    { k:'log',   l:'LOG',   i:'plus' },
    { k:'community', l:'COHORT', i:'user' },
    { k:'profile',l:'ME',   i:'more' },
  ];
  return (
    <nav style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)',
      background:'rgba(10,12,16,0.94)', backdropFilter:'blur(20px)',
      borderTop:'1px solid var(--hc-graphite-4)', padding:'8px 6px 18px',
      flexShrink: 0 }}>
      {tabs.map(t => {
        const Icon = I[t.i];
        const isActive = active === t.k;
        return (
          <button key={t.k} onClick={()=>onTab && onTab(t.k)}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3,
              padding:'6px 2px', cursor:'pointer', background:'none', border:'none',
              color: isActive ? accent : 'var(--hc-text-4)' }}>
            <Icon size={18} sw={1.5}/>
            <span style={{ fontFamily:'var(--hc-mono)', fontSize:8, letterSpacing:'0.16em', fontWeight:500 }}>{t.l}</span>
          </button>
        );
      })}
    </nav>
  );
}

/* H₂ Response Score Ring */
function H2Ring({ score = 78, size = 220, accent = '#7CC9EE' }) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * (score / 100);
  return (
    <div style={{ position:'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="h2grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="1"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0.5"/>
          </linearGradient>
        </defs>
        {/* Outer tick ring */}
        {[...Array(80)].map((_, i) => {
          const a = (i / 80) * Math.PI * 2;
          const long = i % 10 === 0;
          const innerR = r + stroke / 2 + 5;
          const outerR = innerR + (long ? 9 : 5);
          return <line key={i}
            x1={size/2 + Math.cos(a) * innerR} y1={size/2 + Math.sin(a) * innerR}
            x2={size/2 + Math.cos(a) * outerR} y2={size/2 + Math.sin(a) * outerR}
            stroke={long ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.07)'} strokeWidth="1"/>;
        })}
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="rgba(255,255,255,0.05)" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="url(#h2grad)" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}/>
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex',
        flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        <div style={{ fontFamily:'var(--hc-mono)', fontSize:9, letterSpacing:'0.22em',
          color: accent, marginBottom: 6 }}>H₂ RESPONSE</div>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 86, lineHeight:0.85,
          letterSpacing:'-0.04em', color:'var(--hc-text-1)', fontFeatureSettings:"'tnum'" }}>{score}</div>
        <div style={{ fontFamily:'var(--hc-mono)', fontSize:9, letterSpacing:'0.22em',
          color:'var(--hc-text-3)', marginTop: 4 }}>TOP 14%</div>
      </div>
    </div>
  );
}

function H2Numeric({ score = 78, accent }) {
  return (
    <div style={{ textAlign:'center', padding: '12px 0 4px' }}>
      <div style={{ fontFamily:'var(--hc-mono)', fontSize:10, letterSpacing:'0.22em',
        color: accent, marginBottom: 10 }}>H₂ RESPONSE · DAY 14</div>
      <div style={{ fontFamily:'var(--hc-display)', fontSize: 132, lineHeight: 0.85,
        letterSpacing:'-0.05em', color: accent }}>{score}</div>
      <div style={{ fontFamily:'var(--hc-mono)', fontSize:10, letterSpacing:'0.18em',
        color:'var(--hc-text-3)', marginTop: 6 }}>VS 64 BASELINE · TOP 14%</div>
    </div>
  );
}

function H2Cellular({ score = 78, accent }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap: 24, padding:'20px 0 12px' }}>
      <div style={{ position:'relative', width: 140, height: 200 }}>
        <svg viewBox="0 0 140 200" width="140" height="200">
          <defs>
            <radialGradient id="cellGrad">
              <stop offset="0%" stopColor={accent} stopOpacity="0.7"/>
              <stop offset="100%" stopColor={accent} stopOpacity="0"/>
            </radialGradient>
          </defs>
          {/* Cells */}
          {[
            [30,40,18],[70,30,22],[105,55,16],[40,80,20],[80,70,24],
            [110,95,18],[25,115,16],[60,120,22],[100,140,20],[40,160,18],[80,170,16],
          ].map(([x,y,r], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={r+8} fill="url(#cellGrad)"/>
              <circle cx={x} cy={y} r={r} fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1"/>
              <circle cx={x} cy={y} r={r-2} fill={accent} fillOpacity="0.12"/>
              <circle cx={x} cy={y} r="2" fill={accent}/>
            </g>
          ))}
        </svg>
      </div>
      <div>
        <div style={{ fontFamily:'var(--hc-mono)', fontSize:9, letterSpacing:'0.22em',
          color: accent, marginBottom: 8 }}>H₂ RESPONSE</div>
        <div style={{ fontFamily:'var(--hc-display)', fontSize: 78, lineHeight:0.85,
          letterSpacing:'-0.04em', color:'var(--hc-text-1)' }}>{score}</div>
        <div style={{ fontFamily:'var(--hc-mono)', fontSize:9, letterSpacing:'0.18em',
          color:'var(--hc-text-3)', marginTop: 6 }}>CELLULAR · ACTIVE</div>
      </div>
    </div>
  );
}

function ImgTile({ src, h = 130, label, sub, eyebrow, children }) {
  return (
    <div style={{ position:'relative', height: h, borderRadius: 14, overflow:'hidden',
      background: 'var(--hc-graphite-3)' }}>
      <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
      <div style={{ position:'absolute', inset:0,
        background: 'linear-gradient(to top, rgba(5,6,8,0.92) 0%, rgba(5,6,8,0) 60%)' }}/>
      {(label || children) && (
        <div style={{ position:'absolute', left:0, right:0, bottom:0, padding:12 }}>
          {eyebrow && <div style={{ fontFamily:'var(--hc-mono)', fontSize:8.5, letterSpacing:'0.2em',
            color:'var(--hc-ice-bright)', marginBottom: 4, textTransform:'uppercase' }}>{eyebrow}</div>}
          {label && <div style={{ fontFamily:'var(--hc-display)', fontSize: 22,
            letterSpacing:'-0.02em', color:'#fff', lineHeight:1, marginBottom: 2 }}>{label}</div>}
          {sub && <div style={{ fontSize: 11, color:'rgba(255,255,255,0.7)', lineHeight:1.4 }}>{sub}</div>}
          {children}
        </div>
      )}
    </div>
  );
}

window.HCPrim = { I, TopBar, IconBtn, BottomTabs, H2Ring, H2Numeric, H2Cellular, ImgTile };
