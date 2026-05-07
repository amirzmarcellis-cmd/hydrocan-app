// Hydrocan Health — main app shell with routing + Tweaks integration

function HydrocanApp({ tweaks, setTweaks }) {
  const [screen, setScreen] = React.useState(tweaks.initialScreen || 'home');

  React.useEffect(() => {
    if (tweaks.initialScreen) setScreen(tweaks.initialScreen);
  }, [tweaks.initialScreen]);

  const nav = (s) => setScreen(s);

  const S = {
    home: ScreenHome, log: ScreenLog, recovery: ScreenRecovery, trends: ScreenTrends,
    onboarding: ScreenOnboarding, scan: ScreenScan, product: ScreenProduct,
    subscription: ScreenSubscription, profile: ScreenProfile, coach: ScreenCoach,
    notifications: ScreenNotifications,
  };
  const Cur = S[screen] || ScreenHome;

  const showTabBar = !['onboarding', 'scan'].includes(screen);
  const tabActive = ({ home: 'home', trends: 'trends', recovery: 'trends', scan: 'scan', coach: 'coach', profile: 'profile' })[screen] || 'home';

  return (
    <div className={`app-root hc-grain ${tweaks.dark ? 'dark-app' : ''}`}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Cur tweaks={tweaks} onNav={nav} />
      </div>
      {showTabBar && <TabBar active={tabActive} onNav={nav}/>}
    </div>
  );
}

// Tweaks panel
function TweaksPanel({ tweaks, setTweaks, visible }) {
  if (!visible) return null;
  const update = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    // persist
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
    } catch (e) {}
  };
  return (
    <div className="tweaks-panel">
      <h4>Tweaks</h4>
      <div className="tweak-row">
        <label>Theme</label>
        <select value={tweaks.dark ? 'dark' : 'light'} onChange={e => update('dark', e.target.value === 'dark')}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="tweak-row">
        <label>Hero metric <span className="value">{tweaks.heroVariant}</span></label>
        <select value={tweaks.heroVariant} onChange={e => update('heroVariant', e.target.value)}>
          <option value="numeric">Numeric (editorial)</option>
          <option value="ring">Ring</option>
          <option value="fluid">Fluid can</option>
        </select>
      </div>
      <div className="tweak-row">
        <label>Daily goal <span className="value">{tweaks.goal}L</span></label>
        <input type="range" min="1.5" max="4" step="0.1" value={tweaks.goal} onChange={e => update('goal', parseFloat(e.target.value))}/>
      </div>
      <div className="tweak-row">
        <label>Connected device</label>
        <select value={tweaks.device} onChange={e => update('device', e.target.value)}>
          <option value="whoop">Whoop</option>
          <option value="apple">Apple Health</option>
          <option value="google">Google Fit</option>
        </select>
      </div>
      <div className="tweak-row">
        <label>Start screen</label>
        <select value={tweaks.initialScreen} onChange={e => update('initialScreen', e.target.value)}>
          {['home','onboarding','log','recovery','trends','product','subscription','scan','profile','coach','notifications'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  );
}

// Canvas layout
function Canvas() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "dark": false,
    "heroVariant": "numeric",
    "goal": 2.5,
    "device": "whoop",
    "initialScreen": "home"
  }/*EDITMODE-END*/;

  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [tweaksVisible, setTweaksVisible] = React.useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
    return () => window.removeEventListener('message', handler);
  }, []);

  // Two flows: iOS on one column (multiple screens), Android on another
  const flow1 = [
    { screen: 'onboarding', label: 'Onboarding' },
    { screen: 'home', label: 'Home · today' },
    { screen: 'log', label: 'Log a can' },
    { screen: 'recovery', label: 'Recovery · Whoop' },
    { screen: 'trends', label: 'Trends · weekly' },
    { screen: 'scan', label: 'Scan can' },
  ];
  const flow2 = [
    { screen: 'coach', label: 'AI coach · Hydro' },
    { screen: 'notifications', label: 'Notifications' },
    { screen: 'product', label: 'Product detail' },
    { screen: 'subscription', label: 'Subscription' },
    { screen: 'profile', label: 'Profile & goals' },
  ];

  return (
    <>
      <div className="canvas-bg">
        {/* Header */}
        <div style={{ maxWidth: 1440, margin: '0 auto 80px' }}>
          <div className="section-label">Hydrocan Health · Mobile app · v1 · April 2026</div>
          <h1 className="canvas-title">The first<br/>water health app.</h1>
          <p className="canvas-sub">Hydrocan Health connects to Whoop, Apple Health and Google Fit to translate your body's signals into one number: how much hydrogen water you actually need today. Designed for the GCC wellness crowd — Dubai professionals, Riyadh creatives, and anyone who treats hydration as ritual.</p>

          {/* System row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, paddingTop: 40, borderTop: '1px solid rgba(18,18,18,0.15)' }}>
            {[
              { l: 'Hero metaphor', v: 'Editorial numeric' },
              { l: 'Integrations', v: 'Whoop · Apple · Google' },
              { l: 'Market', v: 'GCC · Global' },
              { l: 'Screens', v: '11 designed' },
            ].map(c => (
              <div key={c.l}>
                <div className="section-label" style={{ marginBottom: 10 }}>{c.l}</div>
                <div style={{ fontFamily: 'Wondra, serif', fontSize: 22, letterSpacing: '-0.02em', color: '#121212' }}>{c.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* iOS row 1 */}
        <div style={{ maxWidth: 1600, margin: '0 auto 100px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 40 }}>
            <div>
              <div className="section-label">01 · Primary flow</div>
              <div style={{ fontFamily: 'Wondra, serif', fontSize: 44, letterSpacing: '-0.03em', color: '#121212', marginTop: 8 }}>iOS · the ritual.</div>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(18,18,18,0.55)', maxWidth: 360, textAlign: 'right', lineHeight: 1.5 }}>Open the app. See your hydration score. Log a can. Understand why your recovery moved.</div>
          </div>
          <div style={{ display: 'flex', gap: 36, overflowX: 'auto', paddingBottom: 24 }} className="scroll-x">
            {flow1.map((s, i) => (
              <div key={s.screen} style={{ flexShrink: 0 }}>
                <IOSDevice width={340} height={735} dark={tweaks.dark}>
                  <HydrocanApp tweaks={{ ...tweaks, initialScreen: s.screen }} setTweaks={setTweaks}/>
                </IOSDevice>
                <div className="screen-caption">
                  <div className="lbl">{String(i + 1).padStart(2, '0')}</div>
                  <div className="name">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Android row */}
        <div style={{ maxWidth: 1600, margin: '0 auto 100px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 40 }}>
            <div>
              <div className="section-label">02 · Secondary flow</div>
              <div style={{ fontFamily: 'Wondra, serif', fontSize: 44, letterSpacing: '-0.03em', color: '#121212', marginTop: 8 }}>Android · the depth.</div>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(18,18,18,0.55)', maxWidth: 360, textAlign: 'right', lineHeight: 1.5 }}>Coach, commerce, subscription, profile — the long-tail surfaces that turn intent into a habit.</div>
          </div>
          <div style={{ display: 'flex', gap: 36, overflowX: 'auto', paddingBottom: 24 }} className="scroll-x">
            {flow2.map((s, i) => (
              <div key={s.screen} style={{ flexShrink: 0 }}>
                <AndroidDevice width={340} height={735} dark={tweaks.dark}>
                  <HydrocanApp tweaks={{ ...tweaks, initialScreen: s.screen }} setTweaks={setTweaks}/>
                </AndroidDevice>
                <div className="screen-caption">
                  <div className="lbl">{String(i + 1).padStart(2, '0')}</div>
                  <div className="name">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live clickable prototype */}
        <div style={{ maxWidth: 1440, margin: '0 auto', paddingTop: 60, borderTop: '1px solid rgba(18,18,18,0.15)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div className="section-label">03 · Live prototype</div>
              <div style={{ fontFamily: 'Wondra, serif', fontSize: 56, letterSpacing: '-0.03em', color: '#121212', lineHeight: 0.95, margin: '12px 0 20px' }}>Try it.</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(18,18,18,0.7)', marginBottom: 24 }}>Fully clickable across all 11 screens. Tap the tab bar, log a can, check your recovery, chat with the coach. Toggle Tweaks to try the fluid-can hero, dark mode, or a different daily goal.</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['Home', 'Log a can', 'Recovery', 'Trends', 'Scan', 'Coach', 'Product', 'Subscription', 'Profile', 'Notifications', 'Onboarding'].map(s => (
                  <span key={s} style={{ padding: '6px 14px', borderRadius: 9999, border: '1px solid rgba(18,18,18,0.2)', fontSize: 12, color: 'rgba(18,18,18,0.7)' }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <IOSDevice width={380} height={820} dark={tweaks.dark}>
                <HydrocanApp tweaks={tweaks} setTweaks={setTweaks}/>
              </IOSDevice>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ maxWidth: 1440, margin: '120px auto 0', paddingTop: 40, borderTop: '1px solid rgba(18,18,18,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Wondra, serif', fontSize: 22, letterSpacing: '-0.02em' }}>hydrocan<span style={{ opacity: 0.4 }}>health</span></div>
          <div style={{ fontSize: 11, color: 'rgba(18,18,18,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Beyond common. Dubai · 2026</div>
        </div>
      </div>

      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} visible={tweaksVisible}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Canvas/>);
