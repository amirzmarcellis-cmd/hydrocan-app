import { View, Text } from 'react-native';
import { palette, getZoneFromScore, zoneColors } from '@/design/tokens';

interface MiniBarChartProps {
  data: { label: string; value: number }[];
  max?: number;
  height?: number;
}

export function MiniBarChart({ data, max = 100, height = 140 }: MiniBarChartProps) {
  if (!data.length) {
    return <Text className="text-text-dim">No data yet</Text>;
  }
  return (
    <View>
      <View className="flex-row items-end gap-1" style={{ height }}>
        {data.map((d, i) => {
          const h = Math.max(2, (d.value / max) * height);
          const color = zoneColors[getZoneFromScore(d.value)];
          return (
            <View key={i} className="flex-1 items-center justify-end">
              <View
                style={{
                  height: h,
                  width: '80%',
                  backgroundColor: color,
                  borderRadius: 4,
                  opacity: 0.85,
                }}
              />
            </View>
          );
        })}
      </View>
      <View className="mt-2 flex-row gap-1">
        {data.map((d, i) => (
          <Text
            key={i}
            className="flex-1 text-center text-[10px] text-text-dim"
            numberOfLines={1}
          >
            {d.label}
          </Text>
        ))}
      </View>
    </View>
  );
}
