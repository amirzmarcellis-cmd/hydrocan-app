// Hydrocan Health — Whoop-inspired primitives

// ─────────────────────────────────────────────────────────────
// Icons (stroked, 1.5, inherit currentColor)
// ─────────────────────────────────────────────────────────────
const Ico = {
  home: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></svg>,
  droplet: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2.5c4 5.2 7 8.4 7 12a7 7 0 0 1-14 0c0-3.6 3-6.8 7-12z"/></svg>,
  activity: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12h3l3-8 4 16 3-8h5"/></svg>,
  chart: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 20V4M3 20h18M7 16v-5M11 16V8M15 16v-3M19 16V6"/></svg>,
  user: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>,
  plus: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  scan: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2M4 12h16"/></svg>,
  bell: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10.3 21a2 2 0 0 0 3.4 0"/></svg>,
  sparkle: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>,
  arrow: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  check: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12l5 5 11-11"/></svg>,
  chev: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 6l6 6-6 6"/></svg>,
  chevL: (p={}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 6l-6 6 6 6"/></svg>,
  chevDown: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9l6 6 6-6"/></svg>,
  heart: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.8 6.6a5.5 5.5 0 0 0-9.3-2.5L12 5l-.5-.9A5.5 5.5 0 0 0 3 8c0 6 9 13 9 13s9-7 9-13a5.5 5.5 0 0 0-.2-1.4z"/></svg>,
  zap: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2 3 14h7l-1 8 10-12h-7z"/></svg>,
  moon: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>,
  settings: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3h.1a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/></svg>,
  truck: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 4h13v12H1zM14 8h4l3 3v5h-7M5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>,
  refresh: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8M3 16l3 2.7A9 9 0 0 0 21 12M21 4v4h-4M3 20v-4h4"/></svg>,
  more: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>,
  close: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 6l12 12M6 18 18 6"/></svg>,
  flash: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2 3 14h7l-1 8 10-12h-7z"/></svg>,
  whoop: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="8" width="18" height="8" rx="4"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>,
  apple: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17 13a4 4 0 0 1 2-3.3 4.3 4.3 0 0 0-3.3-1.8c-1.4-.2-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.6 0-3 .9-3.8 2.3-1.7 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7 1.4 0 1.8.7 3 .7 1.3 0 2.1-1.2 2.9-2.3a10 10 0 0 0 1.3-2.7 4 4 0 0 1-2.8-3.8zM15 6.5A4 4 0 0 0 16 3a4 4 0 0 0-2.6 1.3A3.7 3.7 0 0 0 12.3 8 3.3 3.3 0 0 0 15 6.5z"/></svg>,
  google: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>,
  mic: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>,
  info: (p={}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>,
  trend: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 17l6-6 4 4 7-7M14 7h6v6"/></svg>,
  trendDown: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 7l6 6 4-4 7 7M14 17h6v-6"/></svg>,
};

// ─────────────────────────────────────────────────────────────
// Wordmark — Hydrocan Health
// ─────────────────────────────────────────────────────────────
function Wordmark({ size = 16, tag = 'HEALTH' }) {
  return (
    <div className="hc-wm-group">
      <span className="hc-wordmark" style={{ fontSize: size, color: 'var(--app-fg)' }}>HYDROCAN</span>
      {tag && <span className="tag" style={{ fontSize: size * 0.55 }}>{tag}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Whoop-style score ring — thick arc, glow, metric in center
// ─────────────────────────────────────────────────────────────
function ScoreRing({ pct = 72, size = 240, label = 'Hydration', detail = '1.8L of 2.5L', color = 'var(--hc-accent)', variant = 'ring' }) {
  const strokeW = 10;
  const r = (size - strokeW * 2) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;

  if (variant === 'fluid') {
    return <FluidCan pct={pct} size={size} detail={detail} />;
  }
  if (variant === 'numeric') {
    return (
      <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="ambient-ring" style={{ width: size * 0.82, height: size * 0.82, borderColor: color }}/>
        <div className="ambient-ring" style={{ width: size * 0.82, height: size * 0.82, animationDelay: '1.25s', borderColor: color }}/>
        <div style={{ textAlign: 'center', zIndex: 2 }}>
          <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 8 }}>{label}</div>
          <div className="hc-metric" style={{ fontSize: size * 0.52, color: color, textShadow: `0 0 40px ${color}44` }}>
            {pct}<span style={{ fontSize: size * 0.14, opacity: 0.5 }}>%</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--app-muted)', marginTop: 8, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{detail}</div>
        </div>
      </div>
    );
  }

  // Default: whoop-style ring
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 20px ${color}66)` }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeW} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeW} strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.2s var(--ease-smooth)' }}/>
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 6 }}>{label}</div>
        <div className="hc-metric-bold" style={{ fontSize: size * 0.32, color: color, textShadow: `0 0 30px ${color}55`, fontWeight: 800 }}>
          {pct}<span style={{ fontSize: size * 0.12, opacity: 0.6 }}>%</span>
        </div>
        <div style={{ fontSize: 10, color: 'var(--app-muted)', marginTop: 4, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{detail}</div>
      </div>
    </div>
  );
}

// Fluid-can — water-level visualization with brand can
function FluidCan({ pct = 72, size = 240, detail = '1.8L of 2.5L' }) {
  const canW = size * 0.4;
  const canH = size * 0.85;
  const fillH = (pct / 100) * (canH - 20);
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <svg width={canW} height={canH} viewBox={`0 0 ${canW} ${canH}`}>
        <defs>
          <clipPath id="canClip">
            <rect x="2" y="10" width={canW - 4} height={canH - 20} rx="10" />
          </clipPath>
          <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--hc-accent)" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="var(--hc-accent)" stopOpacity="1"/>
          </linearGradient>
        </defs>
        <rect x="2" y="10" width={canW - 4} height={canH - 20} rx="10" fill="var(--app-surface-2)" stroke="var(--app-border-strong)" strokeWidth="1"/>
        <g clipPath="url(#canClip)">
          <rect x="2" y={canH - 10 - fillH} width={canW - 4} height={fillH} fill="url(#fillGrad)" />
          <path d={`M0 ${canH - 10 - fillH} Q ${canW/4} ${canH - 14 - fillH}, ${canW/2} ${canH - 10 - fillH} T ${canW} ${canH - 10 - fillH} V ${canH} H 0 Z`} fill="var(--hc-accent)" opacity="0.6"/>
        </g>
        <rect x="2" y="10" width={canW - 4} height="3" fill="var(--app-border-strong)"/>
        <rect x={canW/2 - 6} y="6" width="12" height="3" rx="1" fill="var(--app-border-strong)"/>
      </svg>
      <div>
        <div className="hc-label" style={{ color: 'var(--app-muted)', marginBottom: 6 }}>Today</div>
        <div className="hc-metric-bold" style={{ fontSize: 44, color: 'var(--hc-accent)', lineHeight: 1 }}>{pct}<span style={{ fontSize: 14, opacity: 0.5 }}>%</span></div>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--app-muted)', marginTop: 8, letterSpacing: '0.04em' }}>{detail}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tab bar
// ─────────────────────────────────────────────────────────────
function TabBar({ active, onNav }) {
  const tabs = [
    { id: 'home', label: 'Today', ico: Ico.home },
    { id: 'trends', label: 'Trends', ico: Ico.chart },
    { id: 'scan', fab: true },
    { id: 'coach', label: 'Coach', ico: Ico.sparkle },
    { id: 'profile', label: 'Profile', ico: Ico.user },
  ];
  return (
    <div className="hc-tabbar">
      {tabs.map(t => t.fab ? (
        <button key={t.id} className="hc-tab" onClick={() => onNav('scan')}>
          <div style={{
            width: 46, height: 46, borderRadius: '50%',
            background: 'var(--hc-accent)', color: '#0a0a0a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: -12, boxShadow: '0 0 24px var(--hc-accent-glow)',
          }}><Ico.plus/></div>
        </button>
      ) : (
        <button key={t.id} className="hc-tab" data-active={active === t.id} onClick={() => onNav(t.id)}>
          <t.ico/>
          <span className="hc-tab-label">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sparkline with gradient fill (Whoop style)
// ─────────────────────────────────────────────────────────────
function Spark({ data, w = 100, h = 34, color = 'var(--hc-accent)', fill = true }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return [x, y];
  });
  const line = pts.map(p => p.join(',')).join(' ');
  const area = `${pts[0][0]},${h} ${line} ${pts[pts.length-1][0]},${h}`;
  const id = 'sg' + Math.random().toString(36).slice(2, 8);
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {fill && <polygon points={area} fill={`url(#${id})`}/>}
      <polyline points={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2.5" fill={color}/>
    </svg>
  );
}

// Bar chart with highlight
function BarChart({ data, labels, h = 120, highlight = -1, goal }) {
  const max = Math.max(...data, goal || 0) * 1.1;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: h, position: 'relative' }}>
        {goal && (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: `${(goal / max) * 100}%`, borderTop: '1px dashed var(--app-border-strong)' }}>
            <span style={{ position: 'absolute', right: 0, top: -16, fontSize: 9, color: 'var(--app-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>GOAL {goal}L</span>
          </div>
        )}
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{
              height: `${(v / max) * 100}%`,
              background: i === highlight ? 'var(--hc-accent)' : 'var(--app-surface-3)',
              boxShadow: i === highlight ? '0 0 12px var(--hc-accent-glow)' : 'none',
              borderRadius: 2,
              transition: 'height 0.8s var(--ease-smooth)',
            }}/>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        {labels.map((l, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: i === highlight ? 'var(--hc-accent)' : 'var(--app-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

// Metric card (Whoop small-card)
function MetricCard({ label, value, unit, trend, spark, color }) {
  return (
    <div className="hc-card" style={{ padding: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div className="hc-label" style={{ color: 'var(--app-muted)' }}>{label}</div>
        {trend && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: trend.startsWith('+') ? 'var(--hc-green)' : 'var(--hc-red)', fontFamily: 'var(--font-mono)' }}>
            {trend.startsWith('+') ? <Ico.trend/> : <Ico.trendDown/>}
            {trend}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <div className="hc-metric-bold" style={{ fontSize: 30, color: color || 'var(--app-fg)' }}>{value}</div>
        {unit && <div style={{ fontSize: 12, color: 'var(--app-muted)', fontFamily: 'var(--font-mono)' }}>{unit}</div>}
      </div>
      {spark && <div style={{ marginTop: 10 }}><Spark data={spark} w={140} h={28} color={color || 'var(--hc-accent)'}/></div>}
    </div>
  );
}

Object.assign(window, { Ico, Wordmark, ScoreRing, FluidCan, TabBar, Spark, BarChart, MetricCard });
