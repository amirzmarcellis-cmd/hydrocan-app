// My study — sparkline panels for each tracked signal, full A/B detail.

import { ScrollView, View, Text } from 'react-native';
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
import { Sparkline } from '@/components/Sparkline';
import { USER } from '@/data/mockUser';
import { h2Effect, splitByH2, type EffectKey } from '@/lib/recovery';

const PANELS: { key: EffectKey; label: string; unit: string; src: string; method: string; invert?: boolean }[] = [
  { key: 'hrv', label: 'Heart-rate variability', unit: 'ms', src: 'WHOOP', method: 'HRV (RMSSD) on H₂ vs non-H₂ mornings.' },
  { key: 'rhr', label: 'Resting heart rate', unit: 'bpm', src: 'WHOOP', method: 'Lower on H₂ days indicates better recovery.', invert: true },
  { key: 'sleepEff', label: 'Sleep efficiency', unit: '%', src: 'Apple Health', method: 'Time asleep ÷ time in bed.' },
  { key: 'respRate', label: 'Respiratory rate', unit: 'br/min', src: 'WHOOP', method: 'Lower = calmer recovery state.', invert: true },
];

export function TrendsScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<any>();
  const { onIdx } = splitByH2(USER);
  const splitAtFor = (sliceLen: number) => Math.max(0, onIdx[0]! - (USER.cans.length - sliceLen));
  const Back = I.back;

  return (
    <Screen scroll>
      <TopBar
        title="MY STUDY"
        left={<IconBtn onPress={() => nav.goBack()}><Back size={14} stroke={palette.text1} /></IconBtn>}
        right={<IconBtn><I.filter size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ paddingHorizontal: 18, paddingTop: 8 }}>
        <Eyebrow size={9} color={accent}>
          PERSONAL · LAB · NOTEBOOK
        </Eyebrow>
        <Display size={30} style={{ marginTop: 4 }}>
          14 days of you,
        </Display>
        <Display size={30} italic color={accent}>
          on H₂.
        </Display>
        <Body size={12} color={palette.text3} style={{ marginTop: 8, maxWidth: 320 }}>
          Each panel splits 30 days at the day you started. Your own n-of-1 trial.
        </Body>
      </View>

      <ScrollView contentContainerStyle={{ padding: 18, gap: 12 }} scrollEnabled={false}>
        {PANELS.map((p) => {
          const series = USER[p.key].slice(-30);
          const e = h2Effect(USER, p.key);
          const sign = (e.delta ?? 0) > 0 ? '+' : '';
          const good = p.invert ? (e.delta ?? 0) < 0 : (e.delta ?? 0) > 0;
          const col = good ? accent : palette.warm;
          return (
            <View key={p.key} style={{ backgroundColor: palette.graphite2, borderColor: palette.graphite4, borderWidth: 1, padding: 14 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <View>
                  <Eyebrow size={8.5}>{p.src}</Eyebrow>
                  <Display size={17} style={{ marginTop: 2 }}>
                    {p.label}
                  </Display>
                </View>
                {e.ready ? (
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontFamily: fonts.display, fontSize: 26, color: col, letterSpacing: -0.5 }}>
                      {sign}
                      {e.delta}
                    </Text>
                    <Eyebrow size={8.5}>n={e.nOn} ON · {e.nOff} OFF</Eyebrow>
                  </View>
                ) : (
                  <Eyebrow size={9}>BUILDING</Eyebrow>
                )}
              </View>

              <View style={{ marginTop: 14 }}>
                <Sparkline data={series} width={310} height={68} accent={accent} stroke={1.5} splitAt={splitAtFor(series.length)} />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                <Eyebrow size={8.5} color={palette.text3}>
                  TODAY · {series[series.length - 1]} {p.unit}
                </Eyebrow>
                <Eyebrow size={8.5} color={palette.text3}>
                  30-DAY · OFF | ON
                </Eyebrow>
              </View>

              <Body size={11.5} color={palette.text2} style={{ marginTop: 10 }}>
                {p.method}
              </Body>
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
}
