import { View, Text } from 'react-native';

interface CanProgressProps {
  cansLogged: number;
  target: number;
}

export function CanProgress({ cansLogged, target }: CanProgressProps) {
  const slots = Math.max(target, cansLogged);
  return (
    <View className="rounded-lg border border-border bg-surface p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-text">Today's HydroCans</Text>
        <Text className="text-sm text-text-dim">
          {cansLogged} / {target}
        </Text>
      </View>
      <View className="flex-row gap-2">
        {Array.from({ length: slots }).map((_, i) => {
          const filled = i < cansLogged;
          return (
            <View
              key={i}
              className={`h-10 flex-1 rounded-md border ${
                filled ? 'border-h2-500 bg-h2-500/30' : 'border-border bg-surface2'
              }`}
            />
          );
        })}
      </View>
    </View>
  );
}
