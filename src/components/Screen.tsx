import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';

interface ScreenProps {
  children: ReactNode;
  scrollable?: boolean;
  className?: string;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export function Screen({
  children,
  scrollable = false,
  className = '',
  edges = ['top', 'bottom'],
}: ScreenProps) {
  const inner = scrollable ? (
    <ScrollView
      className="flex-1"
      contentContainerClassName={`pb-10 ${className}`}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View className={`flex-1 ${className}`}>{children}</View>
  );

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={edges}>
      <StatusBar style="light" />
      {inner}
    </SafeAreaView>
  );
}
