// Hydrocan screen wrapper — graphite background, optional safe-area edges.

import { View, ScrollView, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { palette } from '@/theme/tokens';

interface Props {
  children: ReactNode;
  scroll?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  bg?: string;
}

export function Screen({ children, scroll = false, edges = ['top'], style, contentStyle, bg = palette.graphite0 }: Props) {
  return (
    <SafeAreaView edges={edges} style={[{ flex: 1, backgroundColor: bg }, style]}>
      <StatusBar style="light" />
      {scroll ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={contentStyle}>
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
