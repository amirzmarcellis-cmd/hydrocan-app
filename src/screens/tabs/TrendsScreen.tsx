import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { MetricTile } from '@/components/MetricTile';
import { MiniBarChart } from '@/components/MiniBarChart';
import { Tag } from '@/components/Tag';
import { useMetricsHistory, useHealthHistory } from '@/hooks/useMetrics';

const RANGES = [7, 14, 30] as const;
type Range = (typeof RANGES)[number];

function avg(values: (number | null)[]): number {
  const v = values.filter((x): x is number => typeof x === 'number');
  if (!v.length) return 0;
  return v.reduce((a, b) => a + b, 0) / v.length;
}

export function TrendsScreen() {
  const [range, setRange] = useState<Range>(14);
  const metrics = useMetricsHistory(range);
  const health = useHealthHistory(range);

  const series = (metrics.data ?? []).map((m) => ({
    label: m.date.slice(5),
    value: Number(m.h2_index ?? 0),
  }));

  const avgIndex = avg((metrics.data ?? []).map((m) => (m.h2_index ? Number(m.h2_index) : null)));
  const avgRecovery = avg(
    (health.data ?? []).map((h) => (h.recovery_score ? Number(h.recovery_score) : null)),
  );
  const avgHrv = avg((health.data ?? []).map((h) => (h.hrv_ms ? Number(h.hrv_ms) : null)));

  return (
    <Screen scrollable className="px-5">
      <Text className="mb-2 mt-2 text-2xl font-bold text-text">Trends</Text>
      <Text className="mb-5 text-sm text-text-dim">
        How your H₂ Index has evolved over the past {range} days.
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
        <View className="flex-row gap-2 px-1">
          {RANGES.map((r) => (
            <Pressable key={r} onPress={() => setRange(r)}>
              <Tag label={`${r} days`} active={range === r} />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Card elevated>
        <Text className="mb-3 text-sm font-semibold text-text">H₂ Index — last {range} days</Text>
        <MiniBarChart data={series} max={100} height={160} />
      </Card>

      <View className="mt-4 flex-row gap-3">
        <MetricTile label="Avg H₂" value={avgIndex.toFixed(0)} />
        <MetricTile label="Recovery" value={avgRecovery.toFixed(0)} unit="/100" />
        <MetricTile label="HRV" value={avgHrv ? avgHrv.toFixed(0) : '—'} unit="ms" />
      </View>

      <Card className="mt-4">
        <Text className="mb-2 text-xs uppercase tracking-wider text-text-dim">Recent days</Text>
        <View>
          {(metrics.data ?? []).slice(-7).reverse().map((m) => (
            <View
              key={m.date}
              className="flex-row items-center justify-between border-b border-border py-3 last:border-0"
            >
              <Text className="text-sm text-text">{m.date}</Text>
              <View className="flex-row items-center gap-3">
                <Text className="text-sm text-text-dim">{m.cans_logged} cans</Text>
                <Text className="text-base font-semibold text-h2-300">
                  {m.h2_index ? Math.round(Number(m.h2_index)) : '—'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Card>
    </Screen>
  );
}
