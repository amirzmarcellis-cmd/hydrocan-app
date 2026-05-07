// Run plan — Before / During / After protocol cards.

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
import { Button } from '@/components/Button';

const STEPS = [
  { when: 'BEFORE', time: '45 min before', title: '1 can · Electro H₂', body: 'Sodium-load so you don\'t cramp. The salt + H₂ combo is the part most runners get wrong.', img: PHOTO.trail, done: true },
  { when: 'DURING', time: 'Every 15 min', title: 'A few sips · Pure H₂', body: 'Small, frequent. Big gulps slosh. Aim for a third of a can each interval.', img: PHOTO.studio, done: false },
  { when: 'AFTER', time: 'Within 1 hour', title: '1 can · Recover H₂', body: 'BCAAs + electrolytes inside the recovery window. Drops next-day soreness most.', img: PHOTO.dawn, done: false },
];

export function WorkoutScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<any>();
  const Back = I.back;
  const Check = I.check;

  return (
    <Screen scroll>
      <TopBar
        title="RUN PLAN"
        left={<IconBtn onPress={() => nav.goBack()}><Back size={14} stroke={palette.text1} /></IconBtn>}
        right={<IconBtn><I.more size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ height: 210, overflow: 'hidden' }}>
        <Image source={{ uri: PHOTO.trail }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
        <LinearGradient colors={['rgba(5,6,8,0.15)', 'rgba(5,6,8,0.95)']} style={{ position: 'absolute', inset: 0 }} />
        <View style={{ position: 'absolute', left: 18, right: 18, bottom: 16 }}>
          <Eyebrow size={9.5} color={accent}>
            17:00 · TRAIL · 10K TEMPO
          </Eyebrow>
          <Display size={32} style={{ marginTop: 4 }}>
            Your{' '}
            <Display italic color={accent} size={32}>
              3-can
            </Display>{' '}
            plan
          </Display>
          <Body size={11} color="rgba(255,255,255,0.7)" style={{ marginTop: 4 }}>
            Built around your sweat rate · 84°F outside
          </Body>
        </View>
      </View>

      <View style={{ paddingHorizontal: 18, paddingTop: 16, gap: 12 }}>
        {STEPS.map((s, i) => (
          <View key={s.when} style={{ borderRadius: 14, overflow: 'hidden', backgroundColor: palette.graphite2, borderColor: palette.graphite4, borderWidth: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 104, height: 104, position: 'relative' }}>
                <Image source={{ uri: s.img }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
                <LinearGradient
                  colors={s.done ? [`${accent}66`, 'transparent'] : ['rgba(5,6,8,0.25)', 'rgba(5,6,8,0.25)']}
                  style={{ position: 'absolute', inset: 0 }}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    backgroundColor: 'rgba(5,6,8,0.7)',
                    borderColor: s.done ? accent : 'transparent',
                    borderWidth: 1,
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderRadius: 999,
                  }}
                >
                  <Eyebrow size={8} color={s.done ? accent : '#fff'}>
                    {i + 1} · {s.when}
                  </Eyebrow>
                </View>
              </View>
              <View style={{ flex: 1, padding: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Eyebrow size={8} color={s.done ? accent : palette.text3}>
                    {s.time}
                  </Eyebrow>
                  {s.done ? <Check size={13} stroke={accent} /> : null}
                </View>
                <Display size={18} style={{ marginTop: 4 }}>
                  {s.title}
                </Display>
                <Body size={11.5} color={palette.text2} style={{ marginTop: 5 }}>
                  {s.body}
                </Body>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={{ padding: 18, paddingBottom: 28, gap: 8 }}>
        <Button label="START RUN" rightArrow block accent={accent} onPress={() => nav.goBack()} />
        <Button label="Why this plan?" variant="secondary" block onPress={() => {}} />
      </View>
    </Screen>
  );
}
