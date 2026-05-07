import { Text, type TextStyle } from 'react-native';
import { fonts, palette } from '@/theme/tokens';

interface Props {
  children: React.ReactNode;
  size?: number;
  weight?: '300' | '400' | '500' | '600' | '700' | '900';
  color?: string;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
}

const weightToFont: Record<NonNullable<Props['weight']>, string> = {
  '300': fonts.sans,
  '400': fonts.sans,
  '500': fonts.sansMedium,
  '600': fonts.sansSemibold,
  '700': fonts.sansBold,
  '900': fonts.sansBlack,
};

export function Body({ children, size = 13, weight = '400', color = palette.text2, style, numberOfLines }: Props) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: weightToFont[weight],
          fontSize: size,
          lineHeight: size * 1.45,
          color,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
