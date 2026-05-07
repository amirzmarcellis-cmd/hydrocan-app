// Quick log — amount stepper, can selector grid, three-button row at the bottom.

import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@/components/Screen';
import { Display } from '@/components/Display';
import { Eyebrow } from '@/components/Eyebrow';
import { Body } from '@/components/Body';
import { palette, fonts } from '@/theme/tokens';
import { I } from '@/icons';
import { useSettings } from '@/stores/settings';
import { TopBar } from '@/components/TopBar';
import { IconBtn } from '@/components/IconBtn';
import { Pill } from '@/components/Pill';

const CANS = [
  { id: 'pure', name: 'Pure H₂', subtitle: '1.6 ppm dissolved', tag: 'EVERYDAY', color: '#B8E0F5' },
  { id: 'electro', name: 'Electro H₂', subtitle: 'Sodium · Mg · K+', tag: 'PERFORM', color: '#7CC9EE' },
  { id: 'citrus', name: 'Citrus H₂', subtitle: 'Yuzu · Pink salt', tag: 'DAILY', color: '#E5C97A' },
  { id: 'recover', name: 'Recover H₂', subtitle: 'BCAA · L-Theanine', tag: 'POST', color: '#C7B8F5' },
];

const AMOUNTS = [150, 250, 330, 500, 750];

export function LogScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<any>();
  const [amount, setAmount] = useState(330);
  const [selectedId, setSelectedId] = useState('pure');
  const selected = CANS.find((c) => c.id === selectedId)!;

  const Back = I.back;
  const Scan = I.scan;
  const Mic = I.mic;

  return (
    <Screen scroll>
      <TopBar
        title="LOG H₂ INTAKE"
        left={<IconBtn onPress={() => nav.navigate('Tabs', { screen: 'Today' })}><Back size={14} stroke={palette.text1} /></IconBtn>}
        right={<IconBtn onPress={() => nav.navigate('Scan')}><Scan size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ paddingHorizontal: 18, paddingTop: 10 }}>
        <Eyebrow size={9}>ADD HYDROCAN</Eyebrow>
        <Display size={30} style={{ marginTop: 4 }}>
          Tap, scan,
        </Display>
        <Display size={30} italic color={accent}>
          or speak.
        </Display>
      </View>

      <View style={{ alignItems: 'center', paddingTop: 20, paddingHorizontal: 18 }}>
        <Eyebrow size={9} style={{ marginBottom: 12 }}>
          AMOUNT · ML
        </Eyebrow>
        <Text style={{ fontFamily: fonts.display, fontSize: 88, lineHeight: 88 * 0.9, color: accent, letterSpacing: -88 * 0.04 }}>
          {amount}
        </Text>
        <Body size={11} color={palette.text3} style={{ marginTop: 4 }}>
          {(amount / 1000).toFixed(2)}L · adds ~+{Math.round(amount / 120)} to H₂ Score
        </Body>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, marginTop: 14 }}>
          {AMOUNTS.map((v) => (
            <Pill key={v} label={`${v}ML`} active={amount === v} onPress={() => setAmount(v)} accent={accent} />
          ))}
        </ScrollView>
      </View>

      <View style={{ paddingTop: 22, paddingHorizontal: 18 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <Display size={22}>Which can?</Display>
          <Eyebrow size={9}>{CANS.length} TYPES</Eyebrow>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {CANS.map((c) => {
            const active = selectedId === c.id;
            return (
              <Pressable
                key={c.id}
                onPress={() => setSelectedId(c.id)}
                style={{
                  width: '48.5%',
                  padding: 12,
                  backgroundColor: active ? 'rgba(124,201,238,0.06)' : palette.graphite2,
                  borderColor: active ? accent : palette.graphite4,
                  borderWidth: 1,
                  borderRadius: 14,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c.color }} />
                  <Eyebrow size={7.5}>{c.tag}</Eyebrow>
                </View>
                <Display size={19}>{c.name}</Display>
                <Body size={10} color={palette.text3} style={{ marginTop: 2 }}>
                  {c.subtitle}
                </Body>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={{ paddingHorizontal: 18, paddingVertical: 22, gap: 8 }}>
        <Pressable
          onPress={() => nav.navigate('Tabs', { screen: 'Today' })}
          style={{ backgroundColor: accent, paddingVertical: 13, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontFamily: fonts.display, fontSize: 14, color: palette.graphite0 }}>
            Add {amount}ml of {selected.name}
          </Text>
        </Pressable>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable
            onPress={() => nav.navigate('Scan')}
            style={{
              flex: 1,
              backgroundColor: palette.graphite3,
              borderColor: palette.graphite4,
              borderWidth: 1,
              paddingVertical: 13,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 6,
            }}
          >
            <Scan size={13} stroke={palette.text1} />
            <Text style={{ fontFamily: fonts.display, fontSize: 13, color: palette.text1 }}>SCAN</Text>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: palette.graphite3,
              borderColor: palette.graphite4,
              borderWidth: 1,
              paddingVertical: 13,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 6,
            }}
          >
            <Mic size={13} stroke={palette.text1} />
            <Text style={{ fontFamily: fonts.display, fontSize: 13, color: palette.text1 }}>VOICE</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
