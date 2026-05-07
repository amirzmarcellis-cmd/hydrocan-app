import { View, Text, Pressable, type ViewStyle } from 'react-native';
import { palette, fonts, radii } from '@/theme/tokens';

interface Props {
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  accent?: string;
}

export function Pill({ label, active = false, onPress, style, accent = palette.iceBright }: Props) {
  const inner = (
    <View
      style={[
        {
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: radii.pill,
          borderWidth: 1,
          borderColor: active ? accent : palette.graphite4,
          backgroundColor: active ? 'rgba(124,201,238,0.18)' : palette.graphite3,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Text
        style={{
          fontFamily: fonts.mono,
          fontSize: 9,
          letterSpacing: 9 * 0.16,
          color: active ? accent : palette.text2,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
    </View>
  );
  return onPress ? <Pressable onPress={onPress}>{inner}</Pressable> : inner;
}
