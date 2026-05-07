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

const ITEMS = [
  { kind: 'INSIGHT', t: 'HRV up 4ms vs your baseline', s: 'Your strongest signal in 6 days.', dot: true, time: '07:14' },
  { kind: 'COACH', t: 'Try a Citrus around 14:00', s: 'Mid-day H₂ correlates strongest with your score.', dot: true, time: 'YESTERDAY' },
  { kind: 'DELIVERY', t: 'Box arrives Thursday', s: '24 cans · Standard plan · UPS tracking attached.', dot: false, time: '2D AGO' },
  { kind: 'STUDY', t: 'Day 14 — your effect is firming up', s: 'Confidence shifts from "building" to "low" today.', dot: false, time: '3D AGO' },
];

export function NotificationsScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<any>();
  const Back = I.back;

  return (
    <Screen scroll>
      <TopBar
        title="INBOX"
        left={<IconBtn onPress={() => nav.goBack()}><Back size={14} stroke={palette.text1} /></IconBtn>}
        right={<IconBtn><I.filter size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ padding: 22, gap: 10 }}>
        {ITEMS.map((it, i) => (
          <Card key={i}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                {it.dot && <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: accent }} />}
                <Eyebrow size={9} color={it.dot ? accent : palette.text3}>
                  {it.kind}
                </Eyebrow>
              </View>
              <Eyebrow size={8.5} color={palette.text4}>
                {it.time}
              </Eyebrow>
            </View>
            <Display size={17} style={{ marginTop: 6 }}>
              {it.t}
            </Display>
            <Body size={12} color={palette.text3} style={{ marginTop: 4 }}>
              {it.s}
            </Body>
          </Card>
        ))}
      </View>
    </Screen>
  );
}
