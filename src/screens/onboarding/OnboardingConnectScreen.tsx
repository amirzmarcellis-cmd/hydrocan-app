import { View, Text, Pressable, ScrollView } from 'react-native';
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

const SOURCES = [
  { k: 'apple', l: 'Apple Health', d: 'HRV · sleep · steps · workouts' },
  { k: 'google', l: 'Health Connect', d: 'Android & Samsung Health' },
  { k: 'whoop', l: 'WHOOP', d: 'Recovery · strain · sleep' },
  { k: 'oura', l: 'Oura', d: 'Readiness · sleep · temp' },
  { k: 'garmin', l: 'Garmin Connect', d: 'Body Battery · stress · sleep' },
  { k: 'fitbit', l: 'Fitbit', d: 'Sleep score · resting HR' },
];

export function OnboardingConnectScreen() {
  const ob = useOnboarding();
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const conn = ob.connected;

  const toggle = (k: string) =>
    ob.set({ connected: conn.includes(k) ? conn.filter((x) => x !== k) : [...conn, k] });

  return (
    <Screen>
      <OBHeader step={2} />
      <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 28, paddingBottom: 22 }}>
        <Display size={28} style={{ marginBottom: 8 }}>
          Connect what you wear.
        </Display>
        <Body size={13} color="rgba(255,255,255,0.6)" style={{ marginBottom: 18 }}>
          Pick at least one. We read — never write.
        </Body>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {SOURCES.map((s) => {
              const on = conn.includes(s.k);
              return (
                <Pressable
                  key={s.k}
                  onPress={() => toggle(s.k)}
                  style={{
                    width: '48.7%',
                    minHeight: 92,
                    padding: 12,
                    backgroundColor: on ? 'rgba(184,224,245,0.08)' : 'transparent',
                    borderColor: on ? accent : 'rgba(255,255,255,0.12)',
                    borderWidth: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontFamily: fonts.display, fontSize: 14, color: palette.text1 }}>{s.l}</Text>
                  <View>
                    <Text
                      style={{
                        fontFamily: fonts.mono,
                        fontSize: 8.5,
                        letterSpacing: 8.5 * 0.14,
                        color: on ? accent : 'rgba(255,255,255,0.5)',
                        marginBottom: 4,
                        textTransform: 'uppercase',
                      }}
                    >
                      {on ? 'CONNECTED' : 'TAP TO CONNECT'}
                    </Text>
                    <Text style={{ fontFamily: fonts.sans, fontSize: 10.5, color: 'rgba(255,255,255,0.55)', lineHeight: 14 }}>
                      {s.d}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
        <Pressable onPress={() => { ob.set({ manual: true }); nav.navigate('OnboardingGoal'); }} style={{ paddingVertical: 14 }}>
          <Text
            style={{
              fontFamily: fonts.mono,
              fontSize: 9.5,
              letterSpacing: 9.5 * 0.22,
              color: 'rgba(255,255,255,0.55)',
              textTransform: 'uppercase',
            }}
          >
            No wearable — enter manually
          </Text>
        </Pressable>
        <Button
          label={conn.length === 0 ? 'Pick at least one' : `Continue with ${conn.length}`}
          rightArrow
          block
          accent={accent}
          disabled={conn.length === 0}
          onPress={() => nav.navigate('OnboardingGoal')}
        />
      </View>
    </Screen>
  );
}
