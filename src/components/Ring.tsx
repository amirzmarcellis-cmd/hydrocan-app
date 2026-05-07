import { View, Text } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { palette, getZoneFromScore, zoneColors, zoneLabels } from '@/design/tokens';

interface RingProps {
  score: number; // 0–100
  size?: number;
  thickness?: number;
  caption?: string;
}

export function Ring({ score, size = 240, thickness = 18, caption }: RingProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (clamped / 100) * circumference;
  const zone = getZoneFromScore(clamped);
  const accent = zoneColors[zone];

  return (
    <View className="items-center justify-center" style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={palette.h2_300} stopOpacity={1} />
            <Stop offset="1" stopColor={accent} stopOpacity={1} />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={palette.surface2}
          strokeWidth={thickness}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ringGrad)"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeDashoffset={circumference / 4}
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-xs uppercase tracking-widest text-text-dim">H₂ Index</Text>
        <Text className="text-6xl font-bold text-text">{Math.round(clamped)}</Text>
        <Text className="mt-1 text-sm font-medium" style={{ color: accent }}>
          {zoneLabels[zone]}
        </Text>
        {caption ? <Text className="mt-2 text-xs text-text-dim">{caption}</Text> : null}
      </View>
    </View>
  );
}
