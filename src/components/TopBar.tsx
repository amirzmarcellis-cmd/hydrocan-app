import { View, Text, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { palette, fonts } from '@/theme/tokens';

interface Props {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  style?: ViewStyle;
}

export function TopBar({ title = ' ', left, right, style }: Props) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 18,
          paddingTop: 8,
          paddingBottom: 6,
        },
        style,
      ]}
    >
      <View style={{ minWidth: 28, flexDirection: 'row' }}>{left}</View>
      <Text
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: 10 * 0.2,
          textTransform: 'uppercase',
          color: palette.text2,
        }}
      >
        {title}
      </Text>
      <View style={{ minWidth: 28, flexDirection: 'row', justifyContent: 'flex-end' }}>{right}</View>
    </View>
  );
}
