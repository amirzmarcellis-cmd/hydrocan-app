import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '@/components/Screen';
import { Display } from '@/components/Display';
import { Body } from '@/components/Body';
import { palette, fonts } from '@/theme/tokens';
import { useOnboarding } from '@/stores/onboarding';
import { useSettings } from '@/stores/settings';
import { OBHeader } from './OBHeader';
import { Button } from '@/components/Button';
import type { RootStackParamList } from '@/navigation/types';

export function OnboardingGoalScreen() {
  const ob = useOnboarding();
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const goal = ob.goal;

  return (
    <Screen>
      <OBHeader step={3} />
      <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 28, paddingBottom: 22 }}>
        <Display size={30} style={{ marginBottom: 8 }}>
          Your daily goal.
        </Display>
        <Body size={13} color="rgba(255,255,255,0.6)" style={{ marginBottom: 30 }}>
          Cans of Hydrocan per day. You can change this anytime.
        </Body>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: fonts.display, fontSize: 140, lineHeight: 140 * 0.85, color: palette.text1, letterSpacing: -140 * 0.04 }}>
            {goal}
          </Text>
          <Text
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: 10 * 0.32,
              color: 'rgba(255,255,255,0.5)',
              marginTop: 8,
              textTransform: 'uppercase',
            }}
          >
            CANS PER DAY
          </Text>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 28 }}>
            {[1, 2, 3, 4, 5].map((n) => {
              const active = goal === n;
              return (
                <Pressable
                  key={n}
                  onPress={() => ob.set({ goal: n })}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: active ? accent : 'transparent',
                    borderColor: active ? accent : 'rgba(255,255,255,0.18)',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 11,
                      color: active ? palette.graphite0 : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {n}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Body size={11} color="rgba(255,255,255,0.5)" style={{ marginTop: 24, textAlign: 'center', maxWidth: 240 }}>
            Most members find {goal === 1 ? '1 can' : `${goal} cans`} fits naturally
            {goal >= 3 ? ' — one with each main meal.' : '.'}
          </Body>
        </View>
        <Button label="Continue" rightArrow block accent={accent} onPress={() => nav.navigate('OnboardingPermissions')} />
      </View>
    </Screen>
  );
}
