// Navigation type registry for typed navigation.

export type TabParamList = {
  Today: undefined;
  Coach: undefined;
  Log: undefined;
  Cohort: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  Onboarding: undefined;
  OnboardingCustomer: undefined;
  OnboardingConnect: undefined;
  OnboardingGoal: undefined;
  OnboardingPermissions: undefined;
  Tabs: { screen?: keyof TabParamList } | undefined;
  Trends: undefined;
  Recovery: undefined;
  Scan: undefined;
  Workout: undefined;
  Product: undefined;
  Subscription: undefined;
  Reminders: undefined;
  Manual: undefined;
  Privacy: undefined;
  Help: undefined;
  Education: undefined;
  Notifications: undefined;
  Connect: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
