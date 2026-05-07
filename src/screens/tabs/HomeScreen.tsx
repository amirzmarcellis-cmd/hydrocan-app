import { View, Text, RefreshControl, ScrollView, Pressable } from 'react-native';
import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Ring } from '@/components/Ring';
import { CanProgress } from '@/components/CanProgress';
import { Button } from '@/components/Button';
import { useTodayMetrics, useHealthHistory } from '@/hooks/useMetrics';
import { useTodayCanLogs } from '@/hooks/useCanLogs';
import { useStreak } from '@/hooks/useStreak';
import { useProfile } from '@/hooks/useProfile';

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const profile = useProfile();
  const today = useTodayMetrics();
  const cans = useTodayCanLogs();
  const streak = useStreak();
  const health = useHealthHistory(1);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      profile.refetch(),
      today.refetch(),
      cans.refetch(),
      streak.refetch(),
      health.refetch(),
    ]);
    setRefreshing(false);
  }, [profile, today, cans, streak, health]);

  const score = today.data?.h2_index ?? 0;
  const cansLogged = (cans.data ?? []).reduce((sum, c) => sum + c.quantity, 0);
  const dailyTarget = profile.data?.daily_can_target ?? 3;
  const recovery = health.data?.[0]?.recovery_score ?? 0;
  const sleepMin = health.data?.[0]?.sleep_minutes ?? 0;
  const sleepHr = (sleepMin / 60).toFixed(1);

  const greeting =
    new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl tintColor="#48CAE4" refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerClassName="pb-10 px-5"
      >
        <View className="mt-2 mb-6">
          <Text className="text-sm text-text-dim">{greeting}</Text>
          <Text className="mt-1 text-2xl font-bold text-text">
            {profile.data?.display_name ?? 'Welcome'}
          </Text>
        </View>

        <Card elevated className="items-center py-6">
          <Ring score={Number(score)} size={240} thickness={18} />
          <Text className="mt-4 text-sm text-text-dim">
            {streak.data?.current_streak ?? 0}-day streak · {streak.data?.longest_streak ?? 0} best
          </Text>
        </Card>

        <View className="mt-4">
          <CanProgress cansLogged={cansLogged} target={dailyTarget} />
        </View>

        <View className="mt-4 flex-row gap-3">
          <Button
            label="Log a HydroCan"
            onPress={() => navigation.navigate('Tabs', { screen: 'Log' })}
            className="flex-1"
            size="lg"
          />
        </View>

        <View className="mt-6 flex-row gap-3">
          <Card className="flex-1">
            <Text className="text-xs uppercase tracking-wider text-text-dim">Recovery</Text>
            <Text className="mt-2 text-2xl font-bold text-text">
              {recovery ? Math.round(Number(recovery)) : '—'}
            </Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-xs uppercase tracking-wider text-text-dim">Sleep</Text>
            <Text className="mt-2 text-2xl font-bold text-text">
              {sleepMin ? `${sleepHr}h` : '—'}
            </Text>
          </Card>
        </View>

        <Card elevated className="mt-6">
          <Text className="mb-2 text-xs uppercase tracking-wider text-h2-300">Today's Insight</Text>
          <Text className="text-base text-text">
            {Number(score) >= 70
              ? 'Your H₂ Index is in the optimised zone. Keep your hydration consistent.'
              : Number(score) >= 40
              ? 'Building zone — log another can in the afternoon to lift recovery.'
              : 'Start the day with a HydroCan to build cellular momentum.'}
          </Text>
        </Card>

        <View className="mt-6 flex-row gap-3">
          <Pressable
            onPress={() => navigation.navigate('Wrapped')}
            className="flex-1 rounded-lg border border-border bg-surface p-4"
          >
            <Text className="text-2xl">✨</Text>
            <Text className="mt-2 text-sm font-semibold text-text">Weekly Wrapped</Text>
            <Text className="mt-1 text-xs text-text-dim">Your week in 5 slides</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Paywall')}
            className="flex-1 rounded-lg border border-h2-500 bg-h2-500/10 p-4"
          >
            <Text className="text-2xl">⚡</Text>
            <Text className="mt-2 text-sm font-semibold text-h2-300">HydroCan+</Text>
            <Text className="mt-1 text-xs text-text-dim">Unlock the full effect</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
