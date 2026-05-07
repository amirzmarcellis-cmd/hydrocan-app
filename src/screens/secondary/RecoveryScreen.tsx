// Tonight — recovery action. Single hero card with the night's protocol.

import { View, Text } from 'react-native';
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
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { todaySummary } from '@/lib/recovery';
import { USER } from '@/data/mockUser';

const STEPS = [
  { l: 'Wind-down can', d: '350ml Recover H₂ · 21:30', t: 'NUTRITION' },
  { l: 'Cool the room', d: '17–19°C · cool sheets', t: 'ENVIRONMENT' },
  { l: 'No screens', d: 'Last 30 min before bed', t: 'BEHAVIOUR' },
  { l: 'Lights out', d: 'Target 22:30 · 7h45 sleep', t: 'TIMING' },
];

export function RecoveryScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<any>();
  const t = todaySummary(USER);
  const Back = I.back;

  return (
    <Screen scroll>
      <TopBar
        title="TONIGHT"
        left={<IconBtn onPress={() => nav.goBack()}><Back size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ paddingHorizontal: 18, paddingTop: 8 }}>
        <Eyebrow size={9} color={accent}>
          RECOVERY · ACTION
        </Eyebrow>
        <Display size={36} style={{ marginTop: 6 }}>
          Tonight,
        </Display>
        <Display size={36} italic color={accent}>
          sleep deep.
        </Display>
        <Body size={13} color={palette.text2} style={{ marginTop: 10 }}>
          Score is {t.score}. Sleep efficiency target: 91%. The four nudges below stack.
        </Body>
      </View>

      <View style={{ padding: 18, gap: 10 }}>
        {STEPS.map((s, i) => (
          <Card key={s.l}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Eyebrow size={8.5} color={accent}>
                {String(i + 1).padStart(2, '0')} · {s.t}
              </Eyebrow>
              <Eyebrow size={8.5} color={palette.text3}>
                OPTIONAL
              </Eyebrow>
            </View>
            <Display size={18} style={{ marginTop: 6 }}>
              {s.l}
            </Display>
            <Body size={12} color={palette.text3} style={{ marginTop: 4 }}>
              {s.d}
            </Body>
          </Card>
        ))}
      </View>

      <View style={{ padding: 18, paddingBottom: 28 }}>
        <Button label="Set tonight's plan" rightArrow block accent={accent} onPress={() => nav.goBack()} />
      </View>
    </Screen>
  );
}
