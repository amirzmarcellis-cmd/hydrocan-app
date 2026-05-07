import { View, Text } from 'react-native';
import { Screen } from '@/components/Screen';
import { Display } from '@/components/Display';
import { Body } from '@/components/Body';
import { palette, fonts } from '@/theme/tokens';
import { useSettings } from '@/stores/settings';
import { OBHeader } from './OBHeader';
import { Button } from '@/components/Button';
import { I, type IconKey } from '@/icons';
import { useAuthStore } from '@/stores/auth';

const ITEMS: { l: string; d: string; icon: IconKey }[] = [
  { l: 'Health data', d: 'HRV, sleep, steps, workouts. Read-only.', icon: 'spark' },
  { l: 'Notifications', d: 'Drink reminders + your daily score.', icon: 'bell' },
  { l: 'Bluetooth', d: 'Optional — for can NFC tap-to-log.', icon: 'plus' },
];

export function OnboardingPermissionsScreen() {
  const accent = useSettings((s) => s.accent);
  const setOnboarded = useAuthStore((s) => s.setOnboarded);

  return (
    <Screen>
      <OBHeader step={4} />
      <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 28, paddingBottom: 22 }}>
        <Display size={30} style={{ marginBottom: 8 }}>
          One last set of permissions.
        </Display>
        <Body size={13} color="rgba(255,255,255,0.6)" style={{ marginBottom: 24 }}>
          You'll see the system prompts after this screen.
        </Body>
        <View>
          {ITEMS.map((it, i) => {
            const Icon = I[it.icon];
            return (
              <View
                key={i}
                style={{
                  paddingVertical: 16,
                  borderTopWidth: i === 0 ? 1 : 0,
                  borderBottomWidth: 1,
                  borderTopColor: 'rgba(255,255,255,0.08)',
                  borderBottomColor: 'rgba(255,255,255,0.08)',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <Icon size={18} stroke={accent} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.display, fontSize: 15, color: palette.text1 }}>{it.l}</Text>
                  <Text style={{ fontFamily: fonts.sans, fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 3, lineHeight: 15.4 }}>
                    {it.d}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 9,
                    letterSpacing: 9 * 0.18,
                    color: accent,
                    textTransform: 'uppercase',
                  }}
                >
                  ALLOW
                </Text>
              </View>
            );
          })}
        </View>
        <View style={{ flex: 1 }} />
        <Button label="Enter Hydrocan" rightArrow block accent={accent} onPress={() => setOnboarded(true)} />
      </View>
    </Screen>
  );
}
