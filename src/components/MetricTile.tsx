// Through-the-H₂-lens metric tile (used on Today). Shows on/off averages
// + delta for a single signal.

import { View, Text, Pressable } from 'react-native';
import { palette, fonts } from '@/theme/tokens';
import type { H2Effect } from '@/lib/recovery';

interface Props {
  label: string;
  unit: string;
  effect: H2Effect;
  invert?: boolean;
  accent?: string;
  onPress?: () => void;
}

export function MetricTile({ label, unit, effect, invert = false, accent = palette.iceBright, onPress }: Props) {
  if (!effect.ready) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          padding: 12,
          minHeight: 96,
          backgroundColor: 'rgba(10,12,16,0.5)',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          opacity: pressed ? 0.85 : 1,
          flex: 1,
          justifyContent: 'space-between',
        })}
      >
        <Text style={{ fontFamily: fonts.mono, fontSize: 8.5, letterSpacing: 8.5 * 0.22, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>{label}</Text>
        <Text style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 9 * 0.18, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
          BUILDING{'\n'}n={effect.n}/5
        </Text>
      </Pressable>
    );
  }
  const good = invert ? (effect.delta ?? 0) < 0 : (effect.delta ?? 0) > 0;
  const col = good ? accent : palette.warm;
  const sign = (effect.delta ?? 0) > 0 ? '+' : '';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        padding: 12,
        minHeight: 110,
        flex: 1,
        backgroundColor: 'rgba(10,12,16,0.55)',
        borderColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Text style={{ fontFamily: fonts.mono, fontSize: 8.5, letterSpacing: 8.5 * 0.22, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase' }}>{label}</Text>
        <Text style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: 8 * 0.16, color: 'rgba(255,255,255,0.4)' }}>n={effect.nOn}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 26, lineHeight: 26, color: col, letterSpacing: -26 * 0.02 }}>
          {sign}
          {effect.delta}
        </Text>
        <Text style={{ fontFamily: fonts.mono, fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: 9 * 0.1, textTransform: 'uppercase' }}>{unit}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <Text style={{ fontFamily: fonts.mono, fontSize: 8.5, letterSpacing: 8.5 * 0.14, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>OFF · {effect.offMean}</Text>
        <Text style={{ fontFamily: fonts.mono, fontSize: 8.5, letterSpacing: 8.5 * 0.14, color: accent, textTransform: 'uppercase' }}>ON · {effect.onMean}</Text>
      </View>
    </Pressable>
  );
}
