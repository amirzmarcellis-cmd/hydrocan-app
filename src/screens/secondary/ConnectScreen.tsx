// Add data source — same UI as onboarding step 3, accessible from Profile.

import { View, Text, Pressable, ScrollView } from 'react-native';
import { Screen } from '@/components/Screen';
import { Display } from '@/components/Display';
import { Eyebrow } from '@/components/Eyebrow';
import { Body } from '@/components/Body';
import { palette, fonts } from '@/theme/tokens';
import { useSettings } from '@/stores/settings';
import { TopBar } from '@/components/TopBar';
import { IconBtn } from '@/components/IconBtn';
import { I } from '@/icons';
import { useNavigation } from '@react-navigation/native';
import { useOnboarding } from '@/stores/onboarding';

const SOURCES = [
  { k: 'apple', l: 'Apple Health', d: 'HRV · sleep · steps · workouts' },
  { k: 'google', l: 'Health Connect', d: 'Android & Samsung Health' },
  { k: 'whoop', l: 'WHOOP', d: 'Recovery · strain · sleep' },
  { k: 'oura', l: 'Oura', d: 'Readiness · sleep · temp' },
  { k: 'garmin', l: 'Garmin Connect', d: 'Body Battery · stress · sleep' },
  { k: 'fitbit', l: 'Fitbit', d: 'Sleep score · resting HR' },
];

export function ConnectScreen() {
  const accent = useSettings((s) => s.accent);
  const ob = useOnboarding();
  const nav = useNavigation<any>();
  const Back = I.back;
  const conn = ob.connected;

  const toggle = (k: string) =>
    ob.set({ connected: conn.includes(k) ? conn.filter((x) => x !== k) : [...conn, k] });

  return (
    <Screen scroll>
      <TopBar
        title="CONNECTIONS"
        left={<IconBtn onPress={() => nav.goBack()}><Back size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ paddingHorizontal: 22, paddingTop: 8 }}>
        <Eyebrow size={9} color={accent}>
          SIGNAL · SOURCES
        </Eyebrow>
        <Display size={28} style={{ marginTop: 6 }}>
          What's piped{' '}
          <Display italic color={accent} size={28}>
            into your study.
          </Display>
        </Display>
      </View>

      <View style={{ paddingHorizontal: 22, paddingTop: 18, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {SOURCES.map((s) => {
          const on = conn.includes(s.k);
          return (
            <Pressable
              key={s.k}
              onPress={() => toggle(s.k)}
              style={{
                width: '48.5%',
                minHeight: 92,
                padding: 12,
                backgroundColor: on ? 'rgba(184,224,245,0.08)' : 'transparent',
                borderColor: on ? accent : palette.graphite4,
                borderWidth: 1,
                justifyContent: 'space-between',
              }}
            >
              <Display size={14}>{s.l}</Display>
              <View>
                <Eyebrow size={8.5} color={on ? accent : palette.text3}>
                  {on ? 'CONNECTED' : 'TAP TO CONNECT'}
                </Eyebrow>
                <Body size={10.5} color={palette.text3} style={{ marginTop: 4 }}>
                  {s.d}
                </Body>
              </View>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}
