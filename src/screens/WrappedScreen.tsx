import { View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { useMetricsHistory } from '@/hooks/useMetrics';

interface Slide {
  emoji: string;
  title: string;
  body: string;
  bg: [string, string];
}

interface Props {
  onClose: () => void;
}

export function WrappedScreen({ onClose }: Props) {
  const metrics = useMetricsHistory(7);
  const [idx, setIdx] = useState(0);

  const data = metrics.data ?? [];
  const totalCans = data.reduce((sum, d) => sum + (d.cans_logged ?? 0), 0);
  const avgIdx =
    data.reduce((sum, d) => sum + Number(d.h2_index ?? 0), 0) / Math.max(1, data.length);
  const peak = data.reduce((max, d) => Math.max(max, Number(d.h2_index ?? 0)), 0);

  const slides: Slide[] = [
    {
      emoji: '✨',
      title: 'Your week in HydroCan',
      body: 'Tap to see how the past 7 days played out.',
      bg: ['#03045E', '#0096C7'],
    },
    {
      emoji: '🥫',
      title: `${totalCans} cans logged`,
      body: 'Each one fuelling your cellular performance.',
      bg: ['#0077B6', '#00B4D8'],
    },
    {
      emoji: '📊',
      title: `${avgIdx.toFixed(0)} avg H₂ Index`,
      body:
        avgIdx >= 70
          ? 'Optimised territory. Truly impressive.'
          : avgIdx >= 40
          ? 'Building momentum. Keep stacking.'
          : 'Room to grow next week.',
      bg: ['#0096C7', '#48CAE4'],
    },
    {
      emoji: '🚀',
      title: `${peak.toFixed(0)} peak day`,
      body: 'Your best score this week.',
      bg: ['#00B4D8', '#7CFFB2'],
    },
    {
      emoji: '🎯',
      title: 'Ready for next week?',
      body: 'Set a fresh target and keep the streak alive.',
      bg: ['#023E8A', '#03045E'],
    },
  ];

  useEffect(() => {
    const t = setTimeout(() => {
      if (idx < slides.length - 1) setIdx(idx + 1);
    }, 4000);
    return () => clearTimeout(t);
  }, [idx, slides.length]);

  const slide = slides[idx]!;

  return (
    <Screen edges={[]}>
      <LinearGradient colors={slide.bg} className="absolute inset-0" />
      <View className="mx-5 mt-2 flex-row gap-1">
        {slides.map((_, i) => (
          <View key={i} className="h-1 flex-1 overflow-hidden rounded-pill bg-white/20">
            <View
              className={`h-full bg-white ${
                i < idx ? 'w-full' : i === idx ? 'w-1/2' : 'w-0'
              }`}
            />
          </View>
        ))}
      </View>

      <Pressable className="flex-1 items-center justify-center px-8" onPress={() => setIdx(Math.min(slides.length - 1, idx + 1))}>
        <Text className="mb-6 text-8xl">{slide.emoji}</Text>
        <Text className="mb-4 text-center text-4xl font-bold text-white">{slide.title}</Text>
        <Text className="text-center text-base text-white/80">{slide.body}</Text>
      </Pressable>

      <View className="mb-10 px-5">
        {idx === slides.length - 1 ? (
          <Button label="Close" onPress={onClose} variant="secondary" size="lg" />
        ) : (
          <Pressable onPress={onClose} className="self-center">
            <Text className="text-sm text-white/60">Skip</Text>
          </Pressable>
        )}
      </View>
    </Screen>
  );
}
