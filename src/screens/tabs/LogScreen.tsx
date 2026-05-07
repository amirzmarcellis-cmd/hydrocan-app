import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Tag } from '@/components/Tag';
import { useLogCan, useTodayCanLogs } from '@/hooks/useCanLogs';

const CONTEXTS = [
  { key: 'morning', label: '☀️ Morning' },
  { key: 'pre_workout', label: '🏋️ Pre-workout' },
  { key: 'post_workout', label: '💪 Post-workout' },
  { key: 'with_meal', label: '🍽 With meal' },
  { key: 'evening', label: '🌙 Evening' },
  { key: 'travel', label: '✈️ Travel' },
];

const FEEL_LABELS: Record<number, string> = {
  1: 'Drained',
  2: 'Low',
  3: 'Neutral',
  4: 'Good',
  5: 'Peak',
};

export function LogScreen() {
  const [quantity, setQuantity] = useState(1);
  const [contextSel, setContextSel] = useState<string[]>([]);
  const [feel, setFeel] = useState<number | null>(null);
  const log = useLogCan();
  const cans = useTodayCanLogs();

  const toggleContext = (k: string) =>
    setContextSel((prev) => (prev.includes(k) ? prev.filter((p) => p !== k) : [...prev, k]));

  const submit = async () => {
    try {
      await log.mutateAsync({ quantity, context: contextSel, feel_score: feel });
      setQuantity(1);
      setContextSel([]);
      setFeel(null);
      Alert.alert('Logged', '+1 to your streak. Keep going.');
    } catch (e: any) {
      Alert.alert('Could not log', e.message ?? String(e));
    }
  };

  return (
    <Screen scrollable className="px-5">
      <Text className="mb-1 mt-2 text-2xl font-bold text-text">Log a HydroCan</Text>
      <Text className="mb-6 text-sm text-text-dim">Track every can to power your H₂ Index.</Text>

      <Card elevated>
        <Text className="mb-3 text-sm font-semibold text-text">Quantity</Text>
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-12 w-12 items-center justify-center rounded-pill bg-surface2"
          >
            <Text className="text-2xl text-text">−</Text>
          </Pressable>
          <Text className="text-5xl font-bold text-h2-300">{quantity}</Text>
          <Pressable
            onPress={() => setQuantity(Math.min(20, quantity + 1))}
            className="h-12 w-12 items-center justify-center rounded-pill bg-surface2"
          >
            <Text className="text-2xl text-text">+</Text>
          </Pressable>
        </View>
      </Card>

      <Card className="mt-4">
        <Text className="mb-3 text-sm font-semibold text-text">Context</Text>
        <View className="flex-row flex-wrap gap-2">
          {CONTEXTS.map((c) => (
            <Pressable key={c.key} onPress={() => toggleContext(c.key)}>
              <Tag label={c.label} active={contextSel.includes(c.key)} />
            </Pressable>
          ))}
        </View>
      </Card>

      <Card className="mt-4">
        <Text className="mb-3 text-sm font-semibold text-text">How do you feel?</Text>
        <View className="flex-row justify-between">
          {[1, 2, 3, 4, 5].map((n) => (
            <Pressable
              key={n}
              onPress={() => setFeel(n)}
              className={`h-14 w-14 items-center justify-center rounded-pill ${
                feel === n ? 'bg-h2-500' : 'bg-surface2'
              }`}
            >
              <Text className={feel === n ? 'text-bg font-bold' : 'text-text'}>{n}</Text>
            </Pressable>
          ))}
        </View>
        {feel ? (
          <Text className="mt-3 text-center text-sm text-text-dim">{FEEL_LABELS[feel]}</Text>
        ) : null}
      </Card>

      <Button
        label="Save log"
        onPress={submit}
        loading={log.isPending}
        size="lg"
        className="mt-6"
      />

      <Text className="mb-2 mt-8 text-sm font-semibold text-text">Today's logs</Text>
      {(cans.data ?? []).length === 0 ? (
        <Text className="text-text-dim">No cans logged yet today.</Text>
      ) : (
        (cans.data ?? []).map((c) => (
          <View
            key={c.id}
            className="mb-2 flex-row items-center justify-between rounded-md border border-border bg-surface p-3"
          >
            <Text className="text-sm text-text">
              {new Date(c.consumed_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Text className="text-sm text-text-dim">×{c.quantity}</Text>
            <Text className="text-sm text-h2-300">{c.feel_score ? `Feel ${c.feel_score}` : ''}</Text>
          </View>
        ))
      )}
    </Screen>
  );
}
