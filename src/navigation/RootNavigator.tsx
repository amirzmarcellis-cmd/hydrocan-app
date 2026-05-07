import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { SignInScreen } from '@/screens/auth/SignInScreen';
import { SetupPinScreen } from '@/screens/auth/SetupPinScreen';
import { EnterPinScreen } from '@/screens/auth/EnterPinScreen';
import { OnboardingScreen } from '@/screens/auth/OnboardingScreen';
import { WrappedScreen } from '@/screens/WrappedScreen';
import { PaywallScreen } from '@/screens/PaywallScreen';
import { useAuthStore } from '@/stores/auth';
import { useProfile } from '@/hooks/useProfile';
import { palette } from '@/design/tokens';

export type RootStackParamList = {
  SignIn: undefined;
  SetupPin: undefined;
  EnterPin: undefined;
  Onboarding: undefined;
  Tabs: undefined;
  Wrapped: undefined;
  Paywall: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: palette.bg,
    card: palette.surface,
    text: palette.text,
    border: palette.border,
    primary: palette.h2_500,
    notification: palette.h2_400,
  },
};

function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-bg">
      <ActivityIndicator color={palette.h2_400} />
    </View>
  );
}

export function RootNavigator() {
  const session = useAuthStore((s) => s.session);
  const initialized = useAuthStore((s) => s.initialized);
  const initialize = useAuthStore((s) => s.initialize);
  const pinUnlocked = useAuthStore((s) => s.pinUnlocked);
  const profile = useProfile();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!initialized) return <Loading />;

  const signedIn = !!session;
  const hasPin = !!profile.data?.pin_hash;
  const onboardingDone = !!profile.data?.onboarding_completed_at;

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: palette.bg } }}>
        {!signedIn ? (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        ) : !hasPin ? (
          <Stack.Screen name="SetupPin">
            {() => <SetupPinScreen onDone={() => profile.refetch()} />}
          </Stack.Screen>
        ) : !pinUnlocked ? (
          <Stack.Screen name="EnterPin" component={EnterPinScreen} />
        ) : !onboardingDone ? (
          <Stack.Screen name="Onboarding">
            {() => <OnboardingScreen onComplete={() => profile.refetch()} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen
              name="Wrapped"
              options={{ presentation: 'fullScreenModal', animation: 'fade' }}
            >
              {({ navigation }) => <WrappedScreen onClose={() => navigation.goBack()} />}
            </Stack.Screen>
            <Stack.Screen
              name="Paywall"
              options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
            >
              {({ navigation }) => <PaywallScreen onClose={() => navigation.goBack()} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
