import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignInScreen } from '@/screens/auth/SignInScreen';
import { OnboardingNameScreen } from '@/screens/onboarding/OnboardingNameScreen';
import { OnboardingCustomerScreen } from '@/screens/onboarding/OnboardingCustomerScreen';
import { OnboardingConnectScreen } from '@/screens/onboarding/OnboardingConnectScreen';
import { OnboardingGoalScreen } from '@/screens/onboarding/OnboardingGoalScreen';
import { OnboardingPermissionsScreen } from '@/screens/onboarding/OnboardingPermissionsScreen';

import { TabNavigator } from './TabNavigator';

import { TrendsScreen } from '@/screens/secondary/TrendsScreen';
import { RecoveryScreen } from '@/screens/secondary/RecoveryScreen';
import { ScanScreen } from '@/screens/secondary/ScanScreen';
import { WorkoutScreen } from '@/screens/secondary/WorkoutScreen';
import { ProductScreen } from '@/screens/secondary/ProductScreen';
import { SubscriptionScreen } from '@/screens/secondary/SubscriptionScreen';
import { RemindersScreen } from '@/screens/secondary/RemindersScreen';
import { ManualScreen } from '@/screens/secondary/ManualScreen';
import { PrivacyScreen } from '@/screens/secondary/PrivacyScreen';
import { HelpScreen } from '@/screens/secondary/HelpScreen';
import { EducationScreen } from '@/screens/secondary/EducationScreen';
import { NotificationsScreen } from '@/screens/secondary/NotificationsScreen';
import { ConnectScreen } from '@/screens/secondary/ConnectScreen';

import { palette } from '@/theme/tokens';
import { useAuthStore } from '@/stores/auth';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: palette.graphite0,
    card: palette.graphite1,
    text: palette.text1,
    border: palette.graphite4,
    primary: palette.iceBright,
    notification: palette.iceBright,
  },
};

function Loading() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.graphite0 }}>
      <ActivityIndicator color={palette.iceBright} />
    </View>
  );
}

export function RootNavigator() {
  const initialized = useAuthStore((s) => s.initialized);
  const initialize = useAuthStore((s) => s.initialize);
  const session = useAuthStore((s) => s.session);
  const onboarded = useAuthStore((s) => s.onboarded);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!initialized) return <Loading />;

  // Demo flow: any signed-in user OR (no auth required for demo) sees onboarding
  // until permissions screen marks `onboarded = true`.
  // For prototype convenience, signing in via the welcome screen also flips
  // `onboarded` to true after the last onboarding step.
  const isAppReady = !!session || onboarded;

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: palette.graphite0 } }}>
        {!isAppReady ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingNameScreen} />
            <Stack.Screen name="OnboardingCustomer" component={OnboardingCustomerScreen} />
            <Stack.Screen name="OnboardingConnect" component={OnboardingConnectScreen} />
            <Stack.Screen name="OnboardingGoal" component={OnboardingGoalScreen} />
            <Stack.Screen name="OnboardingPermissions" component={OnboardingPermissionsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Trends" component={TrendsScreen} />
            <Stack.Screen name="Recovery" component={RecoveryScreen} />
            <Stack.Screen name="Scan" component={ScanScreen} options={{ presentation: 'modal' }} />
            <Stack.Screen name="Workout" component={WorkoutScreen} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Subscription" component={SubscriptionScreen} />
            <Stack.Screen name="Reminders" component={RemindersScreen} />
            <Stack.Screen name="Manual" component={ManualScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
            <Stack.Screen name="Education" component={EducationScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Connect" component={ConnectScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
