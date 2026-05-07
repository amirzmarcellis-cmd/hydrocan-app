import { Pressable, View, type ViewStyle } from 'react-native';
import { palette, radii } from '@/theme/tokens';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onPress?: () => void;
  badge?: boolean;
  style?: ViewStyle;
}

export function IconBtn({ children, onPress, badge = false, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: 30,
          height: 30,
          borderRadius: radii.md + 2,
          backgroundColor: palette.graphite3,
          borderColor: palette.graphite4,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      {children}
      {badge && (
        <View
          style={{
            position: 'absolute',
            top: -2,
            right: -2,
            width: 7,
            height: 7,
            borderRadius: 3.5,
            backgroundColor: palette.iceBright,
          }}
        />
      )}
    </Pressable>
  );
}
