import { View, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { palette, radii } from '@/theme/tokens';

interface Props {
  children: ReactNode;
  elev?: boolean;
  style?: ViewStyle | ViewStyle[];
}

export function Card({ children, elev = false, style }: Props) {
  return (
    <View
      style={[
        {
          backgroundColor: elev ? palette.graphite3 : palette.graphite2,
          borderColor: palette.graphite4,
          borderWidth: 1,
          borderRadius: radii.lg,
          padding: 14,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
