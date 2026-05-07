// The thin top/bottom rule with mono labels you see at the top of Today —
// "MORNING EDITION · EXP·DAY 014 · 07:14"

import { View, Text } from 'react-native';
import { palette, fonts } from '@/theme/tokens';

interface Props {
  left?: string;
  center?: string;
  right?: string;
  rightColor?: string;
  marginX?: number;
}

export function EditorialRule({ left = '', center = '', right = '', rightColor, marginX = 22 }: Props) {
  const ts = (color: string = palette.text2) => ({
    fontFamily: fonts.mono,
    fontSize: 8.5,
    letterSpacing: 8.5 * 0.22,
    color,
    textTransform: 'uppercase' as const,
  });
  return (
    <View
      style={{
        marginHorizontal: marginX,
        marginTop: 10,
        borderTopColor: 'rgba(255,255,255,0.18)',
        borderBottomColor: 'rgba(255,255,255,0.18)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text style={ts(palette.text2)}>{left}</Text>
      <Text style={ts('rgba(255,255,255,0.5)')}>{center}</Text>
      <Text style={ts(rightColor ?? 'rgba(255,255,255,0.5)')}>{right}</Text>
    </View>
  );
}
