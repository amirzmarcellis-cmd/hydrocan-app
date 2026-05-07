// NFC / QR scan — viewfinder overlay with animated scan line.

import { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
import { Pill } from '@/components/Pill';

export function ScanScreen() {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<any>();
  const Close = I.close;
  const Bolt = I.bolt;
  const ScanI = I.scan;

  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, { toValue: 1, duration: 2400, easing: Easing.linear, useNativeDriver: true }),
    ).start();
  }, [anim]);

  return (
    <Screen bg="#000">
      <TopBar
        title="SCAN A CAN"
        left={<IconBtn onPress={() => nav.goBack()}><Close size={14} stroke={palette.text1} /></IconBtn>}
        right={<IconBtn><Bolt size={14} stroke={palette.text1} /></IconBtn>}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22 }}>
        <View style={{ position: 'relative', width: 200, height: 200 }}>
          {[
            { top: 0, left: 0, rotate: '90deg' },
            { top: 0, right: 0, rotate: '180deg' },
            { bottom: 0, right: 0, rotate: '-90deg' },
            { bottom: 0, left: 0, rotate: '0deg' },
          ].map((c, i) => (
            <View
              key={i}
              style={{
                position: 'absolute',
                width: 30,
                height: 30,
                borderTopColor: accent,
                borderLeftColor: accent,
                borderTopWidth: 2,
                borderLeftWidth: 2,
                transform: [{ rotate: c.rotate }],
                top: c.top,
                left: c.left,
                right: c.right,
                bottom: c.bottom,
              }}
            />
          ))}
          <Animated.View
            style={{
              position: 'absolute',
              left: 10,
              right: 10,
              height: 2,
              transform: [
                {
                  translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 180] }),
                },
              ],
              opacity: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 1, 0] }),
            }}
          >
            <LinearGradient
              colors={['transparent', accent, 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Animated.View>
          <View style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}>
            <ScanI size={26} stroke={accent} />
          </View>
        </View>
        <Display size={26} style={{ marginTop: 30, color: palette.text1 }}>
          Center the code
        </Display>
        <Body size={11} color="rgba(255,255,255,0.6)" style={{ marginTop: 6, maxWidth: 240, textAlign: 'center' }}>
          Hold over the can's NFC chip or QR code. We'll log it automatically.
        </Body>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 24 }}>
          <Pill label="NFC" active accent={accent} />
          <Pill label="QR" />
          <Pill label="BARCODE" />
        </View>
      </View>
      <View style={{ padding: 18 }}>
        <Pressable
          onPress={() => nav.goBack()}
          style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            borderColor: 'rgba(255,255,255,0.12)',
            borderWidth: 1,
            paddingVertical: 14,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: fonts.display, fontSize: 14, color: palette.text1 }}>Enter manually</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
