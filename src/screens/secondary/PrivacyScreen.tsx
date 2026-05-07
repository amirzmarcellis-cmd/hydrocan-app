import { useState } from 'react';
import { View, Text, Switch } from 'react-native';
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

const TOGGLES = [
  { k: 'cohort', l: 'Cohort participation', d: 'Anonymised data feeds the global leaderboard.' },
  { k: 'research', l: 'Aggregate research', d: 'Help validate H₂ effects in a large study.' },
  { k: 'crash', l: 'Crash & error logs', d: 'Helps us fix bugs faster.' },
  { k: 'ads', l: 'Personalised content', d: 'Off by default. We never sell your data.' },
];

export function PrivacyScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<any>();
  const Back = I.back;
  const [vals, setVals] = useState<Record<string, boolean>>({ cohort: true, research: true, crash: true, ads: false });

  return (
    <Screen scroll>
      <TopBar
        title="PRIVACY"
        left={<IconBtn onPress={() => nav.goBack()}><Back size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ paddingHorizontal: 22, paddingTop: 8 }}>
        <Eyebrow size={9} color={accent}>
          DATA · CONTROL
        </Eyebrow>
        <Display size={30} style={{ marginTop: 6 }}>
          Your data is{' '}
          <Display italic color={accent} size={30}>
            yours.
          </Display>
        </Display>
        <Body size={12} color={palette.text3} style={{ marginTop: 8, maxWidth: 320 }}>
          Stored encrypted. Never sold. Granular toggles below — change anytime.
        </Body>
      </View>

      <View style={{ paddingHorizontal: 22, paddingTop: 22 }}>
        {TOGGLES.map((t, i) => (
          <View
            key={t.k}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 14,
              borderTopColor: palette.graphite4,
              borderTopWidth: i === 0 ? 1 : 0,
              borderBottomColor: palette.graphite4,
              borderBottomWidth: 1,
              gap: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <Display size={16}>{t.l}</Display>
              <Body size={11} color={palette.text3} style={{ marginTop: 4 }}>
                {t.d}
              </Body>
            </View>
            <Switch
              value={!!vals[t.k]}
              onValueChange={(v) => setVals((p) => ({ ...p, [t.k]: v }))}
              trackColor={{ false: palette.graphite4, true: accent }}
              thumbColor="#fff"
            />
          </View>
        ))}
      </View>

      <View style={{ padding: 22, paddingBottom: 28, gap: 8 }}>
        <Button label="Export all my data" variant="secondary" block onPress={() => {}} />
        <Button label="Delete account" variant="ghost" block accent={palette.warm} onPress={() => {}} />
      </View>
    </Screen>
  );
}
