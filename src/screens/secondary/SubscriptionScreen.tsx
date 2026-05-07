// Subscribe — delivery plan picker.

import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
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
import { Button } from '@/components/Button';

const PLANS = [
  { k: 'starter', l: 'Starter', sub: '12 cans / month', price: '$38', save: null },
  { k: 'standard', l: 'Standard', sub: '24 cans / month', price: '$72', save: 'Save 5%' },
  { k: 'pro', l: 'Pro', sub: '48 cans / month', price: '$132', save: 'Save 14%' },
];

export function SubscriptionScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<any>();
  const Back = I.back;
  const [plan, setPlan] = useState('standard');

  return (
    <Screen scroll>
      <TopBar
        title="DELIVERY PLAN"
        left={<IconBtn onPress={() => nav.goBack()}><Back size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ paddingHorizontal: 22, paddingTop: 8 }}>
        <Eyebrow size={9} color={accent}>
          MEMBERSHIP · MONTHLY
        </Eyebrow>
        <Display size={32} style={{ marginTop: 6 }}>
          Hydrocan,{' '}
          <Display italic color={accent} size={32}>
            on schedule.
          </Display>
        </Display>
        <Body size={13} color={palette.text2} style={{ marginTop: 8, maxWidth: 320 }}>
          Pause, swap, or cancel any time. First box ships in 48 hours.
        </Body>
      </View>

      <View style={{ paddingHorizontal: 22, paddingTop: 22, gap: 8 }}>
        {PLANS.map((p) => {
          const active = plan === p.k;
          return (
            <Pressable
              key={p.k}
              onPress={() => setPlan(p.k)}
              style={{
                padding: 16,
                backgroundColor: active ? 'rgba(184,224,245,0.06)' : palette.graphite2,
                borderColor: active ? accent : palette.graphite4,
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <Display size={20}>{p.l}</Display>
                <Eyebrow size={9} color={palette.text3} style={{ marginTop: 2 }}>
                  {p.sub}
                </Eyebrow>
                {p.save ? (
                  <Eyebrow size={8.5} color={accent} style={{ marginTop: 4 }}>
                    {p.save}
                  </Eyebrow>
                ) : null}
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontFamily: fonts.display, fontSize: 28, color: palette.text1 }}>{p.price}</Text>
                <Eyebrow size={8.5} color={palette.text3}>
                  / MONTH
                </Eyebrow>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={{ padding: 22, paddingBottom: 28 }}>
        <Button label="Confirm plan" rightArrow block accent={accent} onPress={() => nav.goBack()} />
        <Body size={11} color={palette.text4} style={{ marginTop: 12, textAlign: 'center' }}>
          Free shipping in continental US. Pause for travel anytime.
        </Body>
      </View>
    </Screen>
  );
}
