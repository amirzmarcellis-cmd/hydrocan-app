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

const TOPICS = [
  { l: 'Why is my score slow to update?', d: 'Your wearable syncs once an hour by default.' },
  { l: 'How do you compute H₂ Effect?', d: 'A/B split on H₂ days vs off days, weighted across HRV, RHR, sleep, resp.' },
  { l: 'Pausing my subscription', d: 'Profile → Subscription → Pause. Resumes automatically after the date you pick.' },
  { l: 'Returning a damaged box', d: 'Tap a can in your inbox. Replacement ships same-day in continental US.' },
  { l: 'Connecting WHOOP / Oura', d: 'Profile → Connections → Add source. OAuth happens in the system browser.' },
];

export function HelpScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<any>();
  const Back = I.back;

  return (
    <Screen scroll>
      <TopBar
        title="HELP"
        left={<IconBtn onPress={() => nav.goBack()}><Back size={14} stroke={palette.text1} /></IconBtn>}
        right={<IconBtn><I.search size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ paddingHorizontal: 22, paddingTop: 8 }}>
        <Eyebrow size={9} color={accent}>
          SUPPORT · TOPICS
        </Eyebrow>
        <Display size={30} style={{ marginTop: 6 }}>
          How can we{' '}
          <Display italic color={accent} size={30}>
            help?
          </Display>
        </Display>
      </View>

      <View style={{ padding: 22, gap: 10 }}>
        {TOPICS.map((t) => (
          <Card key={t.l}>
            <Display size={16}>{t.l}</Display>
            <Body size={12} color={palette.text3} style={{ marginTop: 6 }}>
              {t.d}
            </Body>
          </Card>
        ))}
      </View>

      <View style={{ paddingHorizontal: 22, paddingBottom: 28 }}>
        <Card elev>
          <Eyebrow size={9} color={accent}>
            STILL STUCK?
          </Eyebrow>
          <Display size={18} style={{ marginTop: 6 }}>
            We reply in under 4 hours.
          </Display>
          <Body size={12} color={palette.text3} style={{ marginTop: 6 }}>
            help@hydrocan.health
          </Body>
        </Card>
      </View>
    </Screen>
  );
}
