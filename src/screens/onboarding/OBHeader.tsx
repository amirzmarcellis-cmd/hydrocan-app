// Shared progress dots + step counter for all 5 onboarding screens.

import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { palette, fonts } from '@/theme/tokens';
import { I } from '@/icons';
import { useSettings } from '@/stores/settings';

interface Props {
  step: number;
  total?: number;
  onBack?: () => void;
}

export function OBHeader({ step, total = 5, onBack }: Props) {
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation();
  const Back = I.back;
  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 5, paddingHorizontal: 22, paddingTop: 8 }}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 2,
              borderRadius: 1,
              backgroundColor: i <= step ? accent : 'rgba(255,255,255,0.12)',
            }}
          />
        ))}
      </View>
      <View
        style={{
          paddingHorizontal: 18,
          paddingTop: 14,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {step > 0 ? (
          <Pressable onPress={onBack ?? (() => nav.goBack())} style={{ padding: 6 }}>
            <Back size={16} stroke="rgba(255,255,255,0.7)" />
          </Pressable>
        ) : (
          <View style={{ width: 28 }} />
        )}
        <Text
          style={{
            fontFamily: fonts.mono,
            fontSize: 9,
            letterSpacing: 9 * 0.22,
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          {String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </Text>
        <View style={{ width: 28 }} />
      </View>
    </View>
  );
}
