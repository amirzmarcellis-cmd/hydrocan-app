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

const ARTICLES = [
  { num: 'I', t: 'How molecular hydrogen reaches your cells', m: '6 min', img: PHOTO.waterMacro },
  { num: 'II', t: 'Oxidative stress, in plain English', m: '4 min', img: PHOTO.bubbles },
  { num: 'III', t: 'The 30-day rule: why effects compound', m: '5 min', img: PHOTO.dawn },
  { num: 'IV', t: 'What your HRV is actually telling you', m: '7 min', img: PHOTO.studio },
  { num: 'V', t: 'When *not* to drink Hydrocan', m: '3 min', img: PHOTO.trail },
];

export function EducationScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<any>();
  const Back = I.back;

  return (
    <Screen scroll>
      <TopBar
        title="LEARN"
        left={<IconBtn onPress={() => nav.goBack()}><Back size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ paddingHorizontal: 22, paddingTop: 8 }}>
        <Eyebrow size={9} color={accent}>
          THE · SCIENCE
        </Eyebrow>
        <Display size={30} style={{ marginTop: 6 }}>
          Five-minute{' '}
          <Display italic color={accent} size={30}>
            briefings.
          </Display>
        </Display>
      </View>

      <View style={{ padding: 22, gap: 12 }}>
        {ARTICLES.map((a) => (
          <View key={a.num} style={{ height: 160, borderRadius: 14, overflow: 'hidden', backgroundColor: palette.graphite3 }}>
            <Image source={{ uri: a.img }} style={{ width: '100%', height: '100%', opacity: 0.8 }} contentFit="cover" />
            <LinearGradient colors={['rgba(5,6,8,0)', 'rgba(5,6,8,0.92)']} locations={[0.4, 1]} style={{ position: 'absolute', inset: 0 }} />
            <View style={{ position: 'absolute', left: 14, right: 14, bottom: 14 }}>
              <Eyebrow size={9} color={accent}>
                {a.num} · {a.m} READ
              </Eyebrow>
              <Display size={20} style={{ marginTop: 4, color: '#fff' }}>
                {a.t}
              </Display>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}
