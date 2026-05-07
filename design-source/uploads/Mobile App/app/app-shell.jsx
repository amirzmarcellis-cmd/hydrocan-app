// Hydrocan Health — App shell
const SCREENS = {
  onboarding: ScreenOnboarding,
  home: ScreenHome,
  log: ScreenLog,
  recovery: ScreenRecovery,
  trends: ScreenTrends,
  scan: ScreenScan,
  product: ScreenProduct,
  subscription: ScreenSubscription,
  profile: ScreenProfile,
  coach: ScreenCoach,
  notifications: ScreenNotifications,
};

const NAVBAR_MAP = {
  home: 'home', trends: 'trends', coach: 'coach', profile: 'profile',
};

function HydrocanApp({ tweaks, startAt = 'home', frameId, showTabbar = true }) {
  const [screen, setScreen] = React.useState(startAt);
  React.useEffect(() => { setScreen(startAt); }, [startAt]);

  const Screen = SCREENS[screen] || SCREENS.home;
  const isFullBleed = screen === 'scan';
  const navbarActive = NAVBAR_MAP[screen];

  return (
    <div className={`app-root ${tweaks.theme === 'light' ? 'app-light' : ''}`} data-screen-label={`${frameId} ${screen}`}>
      <Screen tweaks={tweaks} onNav={setScreen}/>
      {showTabbar && !isFullBleed && screen !== 'onboarding' && (
        <TabBar active={navbarActive} onNav={setScreen}/>
      )}
    </div>
  );
}

Object.assign(window, { HydrocanApp, SCREENS });
