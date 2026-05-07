// Welcome / sign-in. Photo background with heavy scrim, three CTAs.

import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '@/components/Screen';
import { Display } from '@/components/Display';
import { Eyebrow } from '@/components/Eyebrow';
import { palette, fonts, PHOTO } from '@/theme/tokens';
import { useSettings } from '@/stores/settings';
import type { RootStackParamList } from '@/navigation/types';

export function SignInScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={{ position: 'absolute', inset: 0 }}>
        <Image
          source={{ uri: PHOTO.dawn }}
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.32,
          }}
          contentFit="cover"
        />
        <LinearGradient
          colors={['rgba(5,6,8,0.4)', 'rgba(5,6,8,0.95)']}
          style={{ position: 'absolute', inset: 0 }}
        />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 22, paddingVertical: 38 }}>
        <Eyebrow size={9} letterSpacing={0.32} color={accent}>
          HYDROCAN · H₂
        </Eyebrow>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Display size={44} letterSpacing={-0.03} lineHeight={44 * 0.95} color={palette.text1}>
            Welcome.
          </Display>
          <Display
            size={17}
            italic
            color="rgba(255,255,255,0.7)"
            style={{ marginTop: 14, maxWidth: 280, lineHeight: 17 * 1.35 }}
          >
            Track how hydrogen water is changing your body — measured by the wearables you already wear.
          </Display>
        </View>

        <View style={{ gap: 8 }}>
          <Pressable
            onPress={() => nav.navigate('Onboarding')}
            style={{
              backgroundColor: '#fff',
              padding: 14,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: fonts.display, fontSize: 15, color: '#050608' }}>
               Continue with Apple
            </Text>
          </Pressable>
          <Pressable
            onPress={() => nav.navigate('Onboarding')}
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderColor: 'rgba(255,255,255,0.18)',
              borderWidth: 1,
              padding: 14,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: fonts.display, fontSize: 15, color: palette.text1 }}>
              G  Continue with Google
            </Text>
          </Pressable>
          <Pressable onPress={() => nav.navigate('Onboarding')} style={{ padding: 12, alignItems: 'center' }}>
            <Text style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 10 * 0.22, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
              Continue with Email
            </Text>
          </Pressable>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: fonts.mono,
              fontSize: 8.5,
              letterSpacing: 8.5 * 0.22,
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
              marginTop: 6,
            }}
          >
            By continuing you agree to our Terms
          </Text>
        </View>
      </View>
    </Screen>
  );
}
