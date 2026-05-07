// Bottom tab bar — TODAY · COACH · LOG · COHORT · ME with mono labels.

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TodayScreen } from '@/screens/tabs/TodayScreen';
import { CoachScreen } from '@/screens/tabs/CoachScreen';
import { LogScreen } from '@/screens/tabs/LogScreen';
import { CohortScreen } from '@/screens/tabs/CohortScreen';
import { ProfileScreen } from '@/screens/tabs/ProfileScreen';
import { palette, fonts } from '@/theme/tokens';
import { useSettings } from '@/stores/settings';
import { I, type IconKey } from '@/icons';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<keyof TabParamList, IconKey> = {
  Today: 'home',
  Coach: 'spark',
  Log: 'plus',
  Cohort: 'user',
  Profile: 'more',
};

const LABELS: Record<keyof TabParamList, string> = {
  Today: 'TODAY',
  Coach: 'COACH',
  Log: 'LOG',
  Cohort: 'COHORT',
  Profile: 'ME',
};

export function TabNavigator() {
  const accent = useSettings((s) => s.accent);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const Icon = I[ICONS[route.name as keyof TabParamList]];
        return {
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'rgba(10,12,16,0.94)',
            borderTopColor: palette.graphite4,
            borderTopWidth: 1,
            height: 78,
            paddingTop: 8,
            paddingBottom: 18,
          },
          tabBarLabelStyle: {
            fontFamily: fonts.mono,
            fontSize: 8,
            letterSpacing: 8 * 0.16,
          },
          tabBarLabel: LABELS[route.name as keyof TabParamList],
          tabBarActiveTintColor: accent,
          tabBarInactiveTintColor: palette.text4,
          tabBarIcon: ({ color }) => <Icon size={18} stroke={color} sw={1.5} />,
        };
      }}
    >
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Coach" component={CoachScreen} />
      <Tab.Screen name="Log" component={LogScreen} />
      <Tab.Screen name="Cohort" component={CohortScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
