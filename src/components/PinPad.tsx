import { View, Text, Pressable, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';

interface PinPadProps {
  pin: string;
  setPin: (next: string) => void;
  length?: number;
  onComplete?: (pin: string) => void;
}

const KEYS: (string | null)[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', null, '0', '⌫'];

export function PinPad({ pin, setPin, length = 6, onComplete }: PinPadProps) {
  useEffect(() => {
    if (pin.length === length) onComplete?.(pin);
  }, [pin, length, onComplete]);

  const press = (k: string | null) => {
    if (k === null) return;
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync().catch(() => {});
    }
    if (k === '⌫') setPin(pin.slice(0, -1));
    else if (pin.length < length) setPin(pin + k);
  };

  return (
    <View className="items-center">
      <View className="mb-10 flex-row gap-3">
        {Array.from({ length }).map((_, i) => (
          <View
            key={i}
            className={`h-4 w-4 rounded-full ${i < pin.length ? 'bg-h2-500' : 'bg-surface2'}`}
          />
        ))}
      </View>
      <View className="flex-row flex-wrap justify-center" style={{ width: 280 }}>
        {KEYS.map((k, i) => (
          <Pressable
            key={i}
            onPress={() => press(k)}
            disabled={k === null}
            className={`m-2 h-20 w-20 items-center justify-center rounded-pill ${
              k === null ? '' : 'bg-surface active:bg-surface2'
            }`}
          >
            <Text className="text-2xl font-semibold text-text">{k ?? ''}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
