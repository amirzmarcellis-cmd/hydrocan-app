import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { Tag } from '@/components/Tag';
import { useUpdateProfile } from '@/hooks/useProfile';

const GOALS = [
  { key: 'recovery', label: 'Recovery', emoji: '🛌', desc: 'Better sleep, faster bounce-back' },
  { key: 'performance', label: 'Performance', emoji: '⚡', desc: 'Train harder, finish stronger' },
  { key: 'longevity', label: 'Longevity', emoji: '🧬', desc: 'Reduce cellular oxidative load' },
  { key: 'metabolic', label: 'Metabolic', emoji: '🔥', desc: 'Energy + glucose control' },
  { key: 'wellness', label: 'Wellness', emoji: '🌿', desc: 'Feel better, day to day' },
];

const SLIDES = [
  {
    title: 'Welcome to HydroCan',
    body: 'The first companion app for tracking the cellular impact of molecular hydrogen.',
    emoji: '💧',
  },
  {
    title: 'Your H₂ Index™',
    body: 'A daily score from 0–100 derived from HRV, sleep, and your HydroCan intake.',
    emoji: '📊',
  },
  {
    title: 'Build a streak',
    body: 'Hydrogen works best with consistency. We help you stay on track.',
    emoji: '🔥',
  },
];

interface Props {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0); // 0..2 = slides, 3 = goal, 4 = target
  const [goal, setGoal] = useState<string | null>(null);
  const [target, setTarget] = useState(3);
  const update = useUpdateProfile();

  const next = () => setStep((s) => s + 1);

  const finish = async () => {
    try {
      await update.mutateAsync({
        goal: goal as any,
        daily_can_target: target,
        onboarding_completed_at: new Date().toISOString(),
      });
      onComplete();
    } catch (e: any) {
      Alert.alert('Could not save', e.message ?? String(e));
    }
  };

  if (step <= 2) {
    const slide = SLIDES[step]!;
    return (
      <Screen className="px-6">
        <View className="flex-1 items-center justify-center">
          <Text className="mb-6 text-7xl">{slide.emoji}</Text>
          <Text className="mb-3 text-center text-3xl font-bold text-text">{slide.title}</Text>
          <Text className="mb-10 max-w-xs text-center text-base text-text-dim">{slide.body}</Text>
        </View>
        <View className="mb-6 flex-row justify-center gap-2">
          {SLIDES.map((_, i) => (
            <View
              key={i}
              className={`h-2 rounded-pill ${i === step ? 'w-8 bg-h2-500' : 'w-2 bg-surface2'}`}
            />
          ))}
        </View>
        <Button label={step === 2 ? 'Get started' : 'Next'} onPress={next} size="lg" />
      </Screen>
    );
  }

  if (step === 3) {
    return (
      <Screen scrollable className="px-6">
        <Text className="mb-2 mt-8 text-2xl font-bold text-text">What's your goal?</Text>
        <Text className="mb-8 text-base text-text-dim">
          We'll personalise your insights and reminders.
        </Text>
        <View className="gap-3">
          {GOALS.map((g) => {
            const active = goal === g.key;
            return (
              <Pressable
                key={g.key}
                onPress={() => setGoal(g.key)}
                className={`flex-row items-center gap-4 rounded-lg border p-4 ${
                  active ? 'border-h2-500 bg-h2-500/10' : 'border-border bg-surface'
                }`}
              >
                <Text className="text-3xl">{g.emoji}</Text>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-text">{g.label}</Text>
                  <Text className="text-sm text-text-dim">{g.desc}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
        <Button
          label="Continue"
          onPress={next}
          size="lg"
          disabled={!goal}
          className="mt-8"
        />
      </Screen>
    );
  }

  // step 4 — daily target
  return (
    <Screen className="px-6">
      <View className="flex-1">
        <Text className="mb-2 mt-8 text-2xl font-bold text-text">Daily HydroCan target</Text>
        <Text className="mb-10 text-base text-text-dim">
          Most users see meaningful effects at 2–4 cans/day.
        </Text>
        <View className="items-center justify-center py-10">
          <View className="flex-row items-baseline">
            <Text className="text-7xl font-bold text-h2-300">{target}</Text>
            <Text className="ml-2 text-xl text-text-dim">/ day</Text>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          <View className="flex-row gap-2 px-1">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Pressable key={n} onPress={() => setTarget(n)}>
                <Tag label={`${n} can${n > 1 ? 's' : ''}`} active={target === n} />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
      <Button label="Finish setup" onPress={finish} size="lg" loading={update.isPending} />
    </Screen>
  );
}
