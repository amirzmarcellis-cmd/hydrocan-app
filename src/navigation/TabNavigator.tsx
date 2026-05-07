import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '@/screens/tabs/HomeScreen';
import { TrendsScreen } from '@/screens/tabs/TrendsScreen';
import { LogScreen } from '@/screens/tabs/LogScreen';
import { CommunityScreen } from '@/screens/tabs/CommunityScreen';
import { CoachScreen } from '@/screens/tabs/CoachScreen';
import { palette } from '@/design/tokens';

export type TabParamList = {
  Home: undefined;
  Trends: undefined;
  Log: undefined;
  Community: undefined;
  Coach: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Trends: 'stats-chart',
  Log: 'add-circle',
  Community: 'people',
  Coach: 'sparkles',
};

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: palette.surface,
          borderTopColor: palette.border,
          height: 84,
          paddingTop: 6,
          paddingBottom: 24,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        tabBarActiveTintColor: palette.h2_300,
        tabBarInactiveTintColor: palette.textDim,
        tabBarIcon: ({ color, size, focused }) => {
          const name = ICONS[route.name];
          return (
            <Ionicons
              name={focused ? name : (`${name}-outline` as any)}
              size={route.name === 'Log' ? size + 8 : size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Trends" component={TrendsScreen} />
      <Tab.Screen name="Log" component={LogScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Coach" component={CoachScreen} />
    </Tab.Navigator>
  );
}
