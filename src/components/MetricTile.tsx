import { View, Text } from 'react-native';

interface MetricTileProps {
  label: string;
  value: string;
  unit?: string;
  delta?: { value: number; positive?: boolean };
  className?: string;
}

export function MetricTile({ label, value, unit, delta, className = '' }: MetricTileProps) {
  return (
    <View className={`flex-1 rounded-lg border border-border bg-surface p-4 ${className}`}>
      <Text className="mb-2 text-xs uppercase tracking-wider text-text-dim">{label}</Text>
      <View className="flex-row items-baseline">
        <Text className="text-2xl font-bold text-text">{value}</Text>
        {unit ? <Text className="ml-1 text-sm text-text-dim">{unit}</Text> : null}
      </View>
      {delta ? (
        <Text
          className={`mt-1 text-xs ${delta.positive === false ? 'text-depleted' : 'text-lift'}`}
        >
          {delta.value > 0 ? '+' : ''}
          {delta.value.toFixed(1)}
        </Text>
      ) : null}
    </View>
  );
}
