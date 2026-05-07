import { Pressable, Text, type ViewStyle, type TextStyle, View, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { palette, fonts } from '@/theme/tokens';

type Variant = 'primary' | 'secondary' | 'ghost' | 'editorial';
type Size = 'sm' | 'md' | 'lg';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  accent?: string;
  loading?: boolean;
  disabled?: boolean;
  rightArrow?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  block?: boolean;
}

const PADS: Record<Size, { v: number; h: number; fs: number }> = {
  sm: { v: 9, h: 12, fs: 12 },
  md: { v: 13, h: 18, fs: 13 },
  lg: { v: 15, h: 14, fs: 15 },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  accent = palette.iceBright,
  loading = false,
  disabled = false,
  rightArrow = false,
  style,
  textStyle,
  block = false,
}: Props) {
  const handle = () => {
    if (!disabled && !loading) {
      if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      onPress();
    }
  };

  const pad = PADS[size];
  let bg: string, color: string, border: string | undefined;
  switch (variant) {
    case 'primary':
      bg = disabled ? 'rgba(255,255,255,0.06)' : accent;
      color = disabled ? 'rgba(255,255,255,0.3)' : '#050608';
      border = undefined;
      break;
    case 'secondary':
      bg = palette.graphite3;
      color = palette.text1;
      border = palette.graphite4;
      break;
    case 'ghost':
      bg = 'transparent';
      color = accent;
      border = undefined;
      break;
    case 'editorial':
      bg = 'rgba(255,255,255,0.04)';
      color = palette.text1;
      border = 'rgba(255,255,255,0.16)';
      break;
  }

  return (
    <Pressable
      onPress={handle}
      style={({ pressed }) => [
        {
          paddingVertical: pad.v,
          paddingHorizontal: pad.h,
          backgroundColor: bg,
          borderColor: border,
          borderWidth: border ? 1 : 0,
          opacity: pressed ? 0.85 : 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: block ? '100%' : undefined,
        },
        style,
      ]}
    >
      {loading ? (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <ActivityIndicator color={color} />
        </View>
      ) : (
        <>
          <Text
            style={[
              {
                color,
                fontFamily: fonts.display,
                fontSize: pad.fs,
                letterSpacing: -0.2,
                flex: rightArrow ? 1 : undefined,
                textAlign: rightArrow ? 'left' : 'center',
              },
              textStyle,
            ]}
          >
            {label}
          </Text>
          {rightArrow && (
            <Text style={{ color, fontFamily: fonts.display, fontSize: pad.fs }}>→</Text>
          )}
        </>
      )}
    </Pressable>
  );
}
