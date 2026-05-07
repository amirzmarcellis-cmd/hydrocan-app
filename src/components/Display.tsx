import { Text, type TextStyle } from 'react-native';
import { fonts, palette } from '@/theme/tokens';

interface Props {
  children: React.ReactNode;
  size?: number;
  lineHeight?: number;
  italic?: boolean;
  letterSpacing?: number; // in em
  color?: string;
  style?: TextStyle | TextStyle[];
}

export function Display({
  children,
  size = 22,
  lineHeight,
  italic = false,
  letterSpacing = -0.02,
  color = palette.text1,
  style,
}: Props) {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.display,
          fontSize: size,
          lineHeight: lineHeight ?? size * 1.05,
          letterSpacing: size * letterSpacing,
          fontStyle: italic ? 'italic' : 'normal',
          color,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
