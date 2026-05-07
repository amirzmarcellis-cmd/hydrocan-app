import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
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

const FIELDS = [
  { k: 'sleep', l: 'Sleep last night', unit: 'hrs', placeholder: '7.5' },
  { k: 'energy', l: 'Morning energy', unit: '/ 5', placeholder: '4' },
  { k: 'hr', l: 'Resting heart rate', unit: 'bpm', placeholder: '52' },
  { k: 'mood', l: 'Mood', unit: '/ 5', placeholder: '4' },
];

export function ManualScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<any>();
  const Back = I.back;
  const [vals, setVals] = useState<Record<string, string>>({});

  return (
    <Screen scroll>
      <TopBar
        title="MANUAL ENTRY"
        left={<IconBtn onPress={() => nav.goBack()}><Back size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ paddingHorizontal: 22, paddingTop: 8 }}>
        <Eyebrow size={9} color={accent}>
          NO-WEARABLE · MODE
        </Eyebrow>
        <Display size={30} style={{ marginTop: 6 }}>
          Tell us how the morning{' '}
          <Display italic color={accent} size={30}>
            felt.
          </Display>
        </Display>
        <Body size={12} color={palette.text3} style={{ marginTop: 8 }}>
          Less precise than wearable signals — but consistent self-report still produces a useful study.
        </Body>
      </View>

      <View style={{ paddingHorizontal: 22, paddingTop: 22 }}>
        {FIELDS.map((f) => (
          <View key={f.k} style={{ marginBottom: 18 }}>
            <Eyebrow size={9} color={palette.text3} style={{ marginBottom: 8 }}>
              {f.l}
            </Eyebrow>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', borderBottomColor: 'rgba(255,255,255,0.2)', borderBottomWidth: 1 }}>
              <TextInput
                value={vals[f.k] ?? ''}
                onChangeText={(v) => setVals((p) => ({ ...p, [f.k]: v }))}
                placeholder={f.placeholder}
                placeholderTextColor="rgba(255,255,255,0.3)"
                keyboardType="numeric"
                style={{
                  flex: 1,
                  fontFamily: fonts.display,
                  fontSize: 28,
                  color: palette.text1,
                  paddingVertical: 8,
                }}
              />
              <Eyebrow size={9} color={palette.text3}>
                {f.unit}
              </Eyebrow>
            </View>
          </View>
        ))}
      </View>

      <View style={{ padding: 22, paddingBottom: 28 }}>
        <Button label="Save today's entry" rightArrow block accent={accent} onPress={() => nav.goBack()} />
      </View>
    </Screen>
  );
}
