// Profile / Me — avatar, key stats, settings rows.

import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@/components/Screen';
import { Display } from '@/components/Display';
import { Eyebrow } from '@/components/Eyebrow';
import { Body } from '@/components/Body';
import { palette, fonts, PHOTO } from '@/theme/tokens';
import { useSettings } from '@/stores/settings';
import { TopBar } from '@/components/TopBar';
import { useAuthStore } from '@/stores/auth';
import { I } from '@/icons';
import { USER } from '@/data/mockUser';

const ROWS = [
  { l: 'Reminders', r: 'Drink schedule', go: 'Reminders' },
  { l: 'Connections', r: '2 connected', go: 'Connect' },
  { l: 'Manual entry', r: 'No-wearable mode', go: 'Manual' },
  { l: 'Subscription', r: 'Pro · 48 / mo', go: 'Subscription' },
  { l: 'Privacy', r: 'Data control', go: 'Privacy' },
  { l: 'Help & support', r: 'Topics · contact', go: 'Help' },
  { l: 'Learn the science', r: 'Studies · methods', go: 'Education' },
  { l: 'Inbox', r: '2 new', go: 'Notifications' },
];

export function ProfileScreen() {
  const accent = useSettings((s) => s.accent);
  const signOut = useAuthStore((s) => s.signOut);
  const nav = useNavigation<any>();
  const Arrow = I.arrow;

  return (
    <Screen scroll>
      <TopBar title="ME" />
      <View style={{ paddingHorizontal: 22, paddingTop: 8, alignItems: 'center' }}>
        <View style={{ width: 96, height: 96, borderRadius: 48, overflow: 'hidden', borderColor: accent, borderWidth: 2 }}>
          <Image source={{ uri: PHOTO.portrait }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
        </View>
        <Display size={30} style={{ marginTop: 14 }}>
          {USER.name}
        </Display>
        <Eyebrow size={9} color={palette.text3} style={{ marginTop: 4 }}>
          DAY {String(USER.dayN).padStart(3, '0')} · BROOKLYN · NY
        </Eyebrow>
      </View>

      <View style={{ paddingHorizontal: 22, marginTop: 22, flexDirection: 'row', gap: 6 }}>
        {[
          { l: 'STREAK', v: '14' },
          { l: 'CANS', v: '47' },
          { l: 'EFFECT', v: '+14%' },
        ].map((m) => (
          <View key={m.l} style={{ flex: 1, backgroundColor: palette.graphite2, borderColor: palette.graphite4, borderWidth: 1, padding: 12 }}>
            <Eyebrow size={8.5}>{m.l}</Eyebrow>
            <Text style={{ fontFamily: fonts.display, fontSize: 26, color: palette.text1, marginTop: 4, letterSpacing: -0.6 }}>{m.v}</Text>
          </View>
        ))}
      </View>

      <View style={{ paddingHorizontal: 22, marginTop: 22 }}>
        {ROWS.map((r, i) => (
          <Pressable
            key={r.l}
            onPress={() => nav.navigate(r.go)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 16,
              borderTopColor: i === 0 ? palette.graphite4 : 'transparent',
              borderTopWidth: i === 0 ? 1 : 0,
              borderBottomColor: palette.graphite4,
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ fontFamily: fonts.display, fontSize: 17, color: palette.text1 }}>{r.l}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text style={{ fontFamily: fonts.mono, fontSize: 9.5, letterSpacing: 9.5 * 0.16, color: palette.text3, textTransform: 'uppercase' }}>
                {r.r}
              </Text>
              <Arrow size={14} stroke={palette.text3} />
            </View>
          </Pressable>
        ))}
      </View>

      <View style={{ paddingHorizontal: 22, paddingVertical: 28 }}>
        <Pressable
          onPress={signOut}
          style={{
            paddingVertical: 14,
            alignItems: 'center',
            borderColor: palette.graphite4,
            borderWidth: 1,
          }}
        >
          <Text style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 10 * 0.22, color: palette.warm, textTransform: 'uppercase' }}>SIGN OUT</Text>
        </Pressable>
        <Body size={11} color={palette.text4} style={{ marginTop: 12, textAlign: 'center' }}>
          Hydrocan · v2.0.0
        </Body>
      </View>
    </Screen>
  );
}
