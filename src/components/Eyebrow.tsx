import { Text, type TextStyle } from 'react-native';
import { palette, fonts } from '@/theme/tokens';

interface Props {
  children: React.ReactNode;
  size?: number;
  letterSpacing?: number; // in em
  color?: string;
  style?: TextStyle;
}

export function Eyebrow({ children, size = 9, letterSpacing = 0.22, color = palette.text3, style }: Props) {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.mono,
          fontSize: size,
          letterSpacing: size * letterSpacing,
          textTransform: 'uppercase',
          color,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
