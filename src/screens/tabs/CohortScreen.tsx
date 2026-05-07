// Cohort — leaderboard of H₂ effect across the global Hydrocan cohort.

import { View, Text, ScrollView } from 'react-native';
import { Screen } from '@/components/Screen';
import { Display } from '@/components/Display';
import { Eyebrow } from '@/components/Eyebrow';
import { Body } from '@/components/Body';
import { palette, fonts } from '@/theme/tokens';
import { useSettings } from '@/stores/settings';
import { TopBar } from '@/components/TopBar';
import { Card } from '@/components/Card';

const ROWS = [
  { rank: 1, name: 'Anya P.', city: 'Stockholm', pct: '+18.2%', days: 64 },
  { rank: 2, name: 'David L.', city: 'Toronto', pct: '+17.4%', days: 58 },
  { rank: 3, name: 'Marcus K.', city: 'Brooklyn', pct: '+14.1%', days: 14, you: true },
  { rank: 4, name: 'Cassidy R.', city: 'Lisbon', pct: '+13.0%', days: 71 },
  { rank: 5, name: 'Jun M.', city: 'Tokyo', pct: '+12.6%', days: 49 },
  { rank: 6, name: 'Amelia W.', city: 'Sydney', pct: '+11.9%', days: 33 },
  { rank: 7, name: 'Tomás G.', city: 'Mexico City', pct: '+11.4%', days: 27 },
  { rank: 8, name: 'Niamh O.', city: 'Dublin', pct: '+10.9%', days: 56 },
];

export function CohortScreen() {
  const accent = useSettings((s) => s.accent);
  return (
    <Screen scroll>
      <TopBar title="COHORT · 38,210" />
      <View style={{ paddingHorizontal: 18, paddingTop: 4 }}>
        <Eyebrow size={9} color={accent}>
          GLOBAL · WEEK 19
        </Eyebrow>
        <Display size={30} style={{ marginTop: 4 }}>
          Best H₂ responses{' '}
          <Display italic color={accent} size={30}>
            this week.
          </Display>
        </Display>
        <Body size={12} color={palette.text3} style={{ marginTop: 8, maxWidth: 320 }}>
          Aggregated daily improvement across recovery signals on H₂ days vs off days. Anonymised, opt-in.
        </Body>
      </View>

      <View style={{ paddingHorizontal: 18, paddingTop: 22 }}>
        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 6 }}>
            <Eyebrow size={9}>RANK · NAME</Eyebrow>
            <Eyebrow size={9}>EFFECT · DAYS</Eyebrow>
          </View>
          {ROWS.map((r) => (
            <View
              key={r.rank}
              style={{
                paddingVertical: 12,
                borderTopColor: palette.graphite4,
                borderTopWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: r.you ? `${accent}11` : 'transparent',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Text
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    letterSpacing: 11 * 0.16,
                    color: r.rank <= 3 ? accent : palette.text3,
                    width: 22,
                  }}
                >
                  {String(r.rank).padStart(2, '0')}
                </Text>
                <View>
                  <Text style={{ fontFamily: fonts.display, fontSize: 16, color: palette.text1 }}>
                    {r.name}
                    {r.you ? '  · YOU' : ''}
                  </Text>
                  <Eyebrow size={8.5} color={palette.text3} style={{ marginTop: 2 }}>
                    {r.city}
                  </Eyebrow>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontFamily: fonts.display, fontSize: 18, color: accent, letterSpacing: -0.3 }}>{r.pct}</Text>
                <Eyebrow size={8.5} color={palette.text3}>
                  n={r.days}
                </Eyebrow>
              </View>
            </View>
          ))}
        </Card>
      </View>

      <View style={{ paddingHorizontal: 18, paddingTop: 18, paddingBottom: 22 }}>
        <Card elev>
          <Eyebrow size={9} color={accent}>
            COHORT NOTE
          </Eyebrow>
          <Display size={16} style={{ marginTop: 6 }}>
            Median user lifts +9.8% by day 30.
          </Display>
          <Body size={12} color={palette.text3} style={{ marginTop: 8 }}>
            Across all opted-in members tracking ≥ 14 days. Effects compound non-linearly through week 8.
          </Body>
        </Card>
      </View>
    </Screen>
  );
}
