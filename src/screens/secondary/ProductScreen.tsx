// Product / Can detail.

import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/Screen';
import { Display } from '@/components/Display';
import { Eyebrow } from '@/components/Eyebrow';
import { Body } from '@/components/Body';
import { palette, fonts, PHOTO } from '@/theme/tokens';
import { useSettings } from '@/stores/settings';
import { TopBar } from '@/components/TopBar';
import { IconBtn } from '@/components/IconBtn';
import { I } from '@/icons';
import { useNavigation } from '@react-navigation/native';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export function ProductScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<any>();
  const Back = I.back;
  const Bag = I.bag;

  return (
    <Screen scroll>
      <TopBar
        title="HYDROCAN"
        left={<IconBtn onPress={() => nav.goBack()}><Back size={14} stroke={palette.text1} /></IconBtn>}
        right={<IconBtn><Bag size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ height: 380, position: 'relative' }}>
        <Image source={{ uri: PHOTO.canPure }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
        <LinearGradient colors={['transparent', palette.graphite0]} locations={[0.5, 1]} style={{ position: 'absolute', inset: 0 }} />
        <View style={{ position: 'absolute', left: 22, right: 22, bottom: 22 }}>
          <Eyebrow size={9} color={accent}>
            EVERYDAY · 1.6 PPM
          </Eyebrow>
          <Display size={44} style={{ marginTop: 6 }}>
            Pure H₂
          </Display>
          <Body size={13} color={palette.text2} style={{ marginTop: 6, maxWidth: 320 }}>
            The base formula. Triple-distilled water, super-saturated with molecular hydrogen. No flavours, no fillers.
          </Body>
        </View>
      </View>

      <View style={{ padding: 22, gap: 12 }}>
        <Card>
          <Eyebrow size={9}>SPECS</Eyebrow>
          {[
            ['Volume', '330ml'],
            ['Dissolved H₂', '1.6 ppm'],
            ['pH', '7.4'],
            ['ORP', '−500 mV'],
            ['Calories', '0'],
          ].map(([k, v], i) => (
            <View
              key={k}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                borderTopColor: palette.graphite4,
                borderTopWidth: i === 0 ? 0 : 1,
              }}
            >
              <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: palette.text2 }}>{k}</Text>
              <Text style={{ fontFamily: fonts.mono, fontSize: 12, color: palette.text1, letterSpacing: 12 * 0.1 }}>{v}</Text>
            </View>
          ))}
        </Card>

        <Card elev>
          <Eyebrow size={9} color={accent}>
            WHY THIS CAN
          </Eyebrow>
          <Display size={20} style={{ marginTop: 6 }}>
            The most-logged can in the cohort.
          </Display>
          <Body size={12} color={palette.text3} style={{ marginTop: 8 }}>
            72% of members start with Pure. It's the cleanest signal in your study — no added variables.
          </Body>
        </Card>
      </View>

      <View style={{ paddingHorizontal: 22, paddingBottom: 28 }}>
        <Button label="Add to subscription · $3.20 / can" rightArrow block accent={accent} onPress={() => nav.navigate('Subscription')} />
      </View>
    </Screen>
  );
}
