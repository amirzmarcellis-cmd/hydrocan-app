import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

const FEATURES = [
  { icon: '🧬', title: 'Personalised H₂ Index™', body: 'Tuned to your wearable + intake data.' },
  { icon: '🤖', title: 'Unlimited AI Coach', body: 'Ask anything, citations included.' },
  { icon: '📈', title: 'Lifetime trend history', body: 'Every day, every metric, all yours.' },
  { icon: '✨', title: 'Weekly Wrapped', body: 'Story-style recap every Sunday.' },
  { icon: '👯', title: 'Squads & Challenges', body: 'Join the global HydroCan community.' },
];

const PLANS = [
  { id: 'monthly', label: 'Monthly', price: '$9.99', sub: '/ month', save: null },
  { id: 'annual', label: 'Annual', price: '$59.99', sub: '/ year', save: '50% off' },
];

interface Props {
  onClose: () => void;
}

export function PaywallScreen({ onClose }: Props) {
  const [plan, setPlan] = useState<'monthly' | 'annual'>('annual');

  const purchase = () => {
    Alert.alert(
      'HydroCan+',
      'Connect RevenueCat or Stripe to enable purchases. This is the design preview.',
    );
  };

  return (
    <Screen scrollable className="px-5">
      <LinearGradient
        colors={['rgba(3,4,94,0.6)', 'rgba(5,8,15,1)']}
        className="absolute inset-x-0 top-0 h-72"
      />
      <View className="mt-4 flex-row justify-end">
        <Pressable onPress={onClose} className="h-9 w-9 items-center justify-center rounded-pill bg-surface">
          <Text className="text-text">×</Text>
        </Pressable>
      </View>

      <View className="mt-6 items-center">
        <View className="mb-4 h-16 w-16 items-center justify-center rounded-pill bg-h2-500/20">
          <Text className="text-3xl">⚡</Text>
        </View>
        <Text className="mb-2 text-3xl font-bold text-text">HydroCan+</Text>
        <Text className="text-center text-base text-text-dim">
          The full Hydrogen Effect, unlocked.
        </Text>
      </View>

      <Card elevated className="mt-8">
        {FEATURES.map((f, i) => (
          <View
            key={f.title}
            className={`flex-row items-start gap-3 ${i > 0 ? 'mt-4' : ''}`}
          >
            <Text className="text-2xl">{f.icon}</Text>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-text">{f.title}</Text>
              <Text className="text-xs text-text-dim">{f.body}</Text>
            </View>
          </View>
        ))}
      </Card>

      <View className="mt-6 gap-3">
        {PLANS.map((p) => {
          const active = plan === p.id;
          return (
            <Pressable
              key={p.id}
              onPress={() => setPlan(p.id as any)}
              className={`flex-row items-center justify-between rounded-lg border p-4 ${
                active ? 'border-h2-500 bg-h2-500/10' : 'border-border bg-surface'
              }`}
            >
              <View>
                <Text className="text-base font-semibold text-text">{p.label}</Text>
                {p.save ? <Text className="text-xs text-lift">{p.save}</Text> : null}
              </View>
              <View className="flex-row items-baseline">
                <Text className="text-xl font-bold text-text">{p.price}</Text>
                <Text className="text-sm text-text-dim">{p.sub}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <Button label="Start free 7-day trial" onPress={purchase} size="lg" className="mt-6" />
      <Text className="mt-4 text-center text-xs text-text-dim">
        Cancel anytime. Renews at full price after trial.
      </Text>
    </Screen>
  );
}
