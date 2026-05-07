import { View, Text, Pressable } from 'react-native';
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
import { I } from '@/icons';
import type { RootStackParamList } from '@/navigation/types';

const TIERS = [
  { k: 'starter', l: 'Starter', d: '12 cans / month' },
  { k: 'standard', l: 'Standard', d: '24 cans / month' },
  { k: 'pro', l: 'Pro', d: '48 cans / month' },
  { k: 'none', l: 'Not yet', d: 'I want to try Hydrocan first' },
] as const;

export function OnboardingCustomerScreen() {
  const ob = useOnboarding();
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const Check = I.check;

  return (
    <Screen>
      <OBHeader step={1} />
      <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 28, paddingBottom: 22 }}>
        <Display size={30} style={{ marginBottom: 8 }}>
          Are you a Hydrocan customer?
        </Display>
        <Body size={14} color="rgba(255,255,255,0.6)" style={{ marginBottom: 24 }}>
          We'll match your subscription so logs sync automatically.
        </Body>
        <View style={{ gap: 8 }}>
          {TIERS.map((t) => {
            const active = ob.tier === t.k;
            return (
              <Pressable
                key={t.k}
                onPress={() => ob.set({ tier: t.k })}
                style={{
                  padding: 14,
                  backgroundColor: active ? 'rgba(184,224,245,0.08)' : 'transparent',
                  borderColor: active ? accent : 'rgba(255,255,255,0.12)',
                  borderWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View>
                  <Text style={{ fontFamily: fonts.display, fontSize: 16, color: palette.text1 }}>{t.l}</Text>
                  <Text
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 9,
                      letterSpacing: 9 * 0.16,
                      color: 'rgba(255,255,255,0.5)',
                      marginTop: 4,
                      textTransform: 'uppercase',
                    }}
                  >
                    {t.d}
                  </Text>
                </View>
                {active ? <Check size={18} stroke={accent} /> : null}
              </Pressable>
            );
          })}
        </View>
        <View style={{ flex: 1 }} />
        <Button
          label="Continue"
          rightArrow
          block
          accent={accent}
          disabled={!ob.tier}
          onPress={() => nav.navigate('OnboardingConnect')}
        />
      </View>
    </Screen>
  );
}
