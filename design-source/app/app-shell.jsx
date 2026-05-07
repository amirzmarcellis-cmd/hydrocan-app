/* Hydrocan — App shell */

const { ScreenOnboarding, ScreenCoach, ScreenLog, ScreenScan, ScreenWorkout } = window.HCS1;
const { ScreenTrends, ScreenRecovery, ScreenCommunity, ScreenSubscription, ScreenInbox, ScreenProduct } = window.HCS2;
const { ScreenAuth, ScreenOBName, ScreenOBCustomer, ScreenOBConnect, ScreenOBGoal, ScreenOBPermissions } = window.HCOB;
const { ScreenToday } = window.HCToday;
const { ScreenProfile, ScreenReminders, ScreenPrivacy, ScreenHelp, ScreenEducation, ScreenManual } = window.HCSet;

function HydrocanApp({ tweaks, startAt = 'home', frameId }) {
  const [route, setRoute] = React.useState(startAt);
  const [ob, setObState] = React.useState({ name:'', dob:'', sex:'', tier:'', connected:[], goal:3, manual:false });
  const setOb = (patch) => setObState(s => ({ ...s, ...patch }));
  const go = (r) => setRoute(r);
  const accent = tweaks.accent || '#B8E0F5';

  React.useEffect(()=>{ setRoute(startAt); }, [startAt]);

  const tabRoutes = ['home', 'coach', 'log', 'community', 'profile'];
  const activeTab = tabRoutes.includes(route) ? route : 'home';
  const setTab = (t) => setRoute(t);

  const screens = {
    auth:                 () => <ScreenAuth go={go} accent={accent}/>,
    'onboarding-name':    () => <ScreenOBName go={go} accent={accent} ob={ob} setOb={setOb}/>,
    'onboarding-customer':() => <ScreenOBCustomer go={go} accent={accent} ob={ob} setOb={setOb}/>,
    'onboarding-connect': () => <ScreenOBConnect go={go} accent={accent} ob={ob} setOb={setOb}/>,
    'onboarding-goal':    () => <ScreenOBGoal go={go} accent={accent} ob={ob} setOb={setOb}/>,
    'onboarding-permissions':() => <ScreenOBPermissions go={go} accent={accent}/>,
    onboarding:           () => <ScreenAuth go={go} accent={accent}/>,
    home:                 () => <ScreenToday tweaks={tweaks} go={go} accent={accent} tab={activeTab} setTab={setTab}/>,
    coach:                () => <ScreenCoach tweaks={tweaks} go={go} accent={accent} tab={activeTab} setTab={setTab}/>,
    log:                  () => <ScreenLog go={go} accent={accent} tab={activeTab} setTab={setTab}/>,
    scan:                 () => <ScreenScan go={go} accent={accent}/>,
    workout:              () => <ScreenWorkout go={go} accent={accent}/>,
    trends:               () => <ScreenTrends go={go} accent={accent} tab={activeTab} setTab={setTab}/>,
    community:            () => <ScreenCommunity go={go} accent={accent} tab={activeTab} setTab={setTab}/>,
    recovery:             () => <ScreenRecovery go={go} accent={accent} tab={activeTab} setTab={setTab}/>,
    subscription:         () => <ScreenSubscription go={go} accent={accent}/>,
    profile:              () => <ScreenProfile go={go} accent={accent} tab={activeTab} setTab={setTab}/>,
    notifications:        () => <ScreenInbox go={go} accent={accent}/>,
    product:              () => <ScreenProduct go={go} accent={accent}/>,
    reminders:            () => <ScreenReminders go={go} accent={accent}/>,
    privacy:              () => <ScreenPrivacy go={go} accent={accent}/>,
    help:                 () => <ScreenHelp go={go} accent={accent}/>,
    education:            () => <ScreenEducation go={go} accent={accent}/>,
    manual:               () => <ScreenManual go={go} accent={accent}/>,
    connect:              () => <ScreenOBConnect go={go} accent={accent} ob={ob} setOb={setOb}/>,
  };

  const Screen = screens[route] || screens.home;
  return Screen();
}

window.HydrocanApp = HydrocanApp;
window.SCREENS = { auth:1,'onboarding-name':1,'onboarding-customer':1,'onboarding-connect':1,'onboarding-goal':1,'onboarding-permissions':1,home:1,coach:1,log:1,scan:1,workout:1,trends:1,community:1,recovery:1,subscription:1,profile:1,notifications:1,product:1,reminders:1,privacy:1,help:1,education:1,manual:1 };
