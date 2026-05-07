import { useState } from 'react';
import { View, Text, Pressable, Switch } from 'react-native';
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

const SLOTS = [
  { l: 'Morning', t: '07:30', d: 'Sets the day' },
  { l: 'Mid-day', t: '12:30', d: 'Highest-effect window' },
  { l: 'Pre-workout', t: '17:00', d: 'Tied to your calendar' },
  { l: 'Wind-down', t: '21:00', d: 'Recover formula' },
];

export function RemindersScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<any>();
  const Back = I.back;
  const [active, setActive] = useState<Record<string, boolean>>({ Morning: true, 'Mid-day': true, 'Pre-workout': false, 'Wind-down': true });

  return (
    <Screen scroll>
      <TopBar
        title="REMINDERS"
        left={<IconBtn onPress={() => nav.goBack()}><Back size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ paddingHorizontal: 22, paddingTop: 8 }}>
        <Eyebrow size={9} color={accent}>
          DRINK · SCHEDULE
        </Eyebrow>
        <Display size={30} style={{ marginTop: 6 }}>
          Quiet,{' '}
          <Display italic color={accent} size={30}>
            useful nudges.
          </Display>
        </Display>
        <Body size={13} color={palette.text3} style={{ marginTop: 8, maxWidth: 320 }}>
          We only fire when there's something to act on. No streaks, no shame.
        </Body>
      </View>

      <View style={{ paddingHorizontal: 22, paddingTop: 22 }}>
        {SLOTS.map((s, i) => (
          <View
            key={s.l}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 16,
              borderTopColor: palette.graphite4,
              borderTopWidth: i === 0 ? 1 : 0,
              borderBottomColor: palette.graphite4,
              borderBottomWidth: 1,
            }}
          >
            <View>
              <Display size={17}>{s.l}</Display>
              <Eyebrow size={9} color={palette.text3} style={{ marginTop: 4 }}>
                {s.t} · {s.d}
              </Eyebrow>
            </View>
            <Switch
              value={!!active[s.l]}
              onValueChange={(v) => setActive((p) => ({ ...p, [s.l]: v }))}
              trackColor={{ false: palette.graphite4, true: accent }}
              thumbColor="#fff"
            />
          </View>
        ))}
      </View>

      <View style={{ padding: 22, paddingBottom: 28 }}>
        <Body size={11} color={palette.text4}>
          Reminders pause when our model thinks you're already on track for the day.
        </Body>
      </View>
    </Screen>
  );
}
