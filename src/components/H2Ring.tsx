// Tick-marked ring with gradient stroke + Wondra display numeral.

import { View, Text } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Line, Stop } from 'react-native-svg';
import { palette, fonts } from '@/theme/tokens';

interface Props {
  score?: number;
  size?: number;
  accent?: string;
  caption?: string;
  eyebrow?: string;
}

export function H2Ring({
  score = 78,
  size = 220,
  accent = palette.iceBright,
  caption = 'TOP 14%',
  eyebrow = 'H₂ RESPONSE',
}: Props) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (c * Math.max(0, Math.min(100, score))) / 100;
  const ticks = Array.from({ length: 80 }).map((_, i) => {
    const a = (i / 80) * Math.PI * 2;
    const long = i % 10 === 0;
    const innerR = r + stroke / 2 + 5;
    const outerR = innerR + (long ? 9 : 5);
    const x1 = size / 2 + Math.cos(a) * innerR;
    const y1 = size / 2 + Math.sin(a) * innerR;
    const x2 = size / 2 + Math.cos(a) * outerR;
    const y2 = size / 2 + Math.sin(a) * outerR;
    return (
      <Line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={long ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.07)'}
        strokeWidth={1}
      />
    );
  });
  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Defs>
          <LinearGradient id="h2grad" x1="0" x2="1" y1="0" y2="1">
            <Stop offset="0" stopColor={accent} stopOpacity={1} />
            <Stop offset="1" stopColor={accent} stopOpacity={0.5} />
          </LinearGradient>
        </Defs>
        {ticks}
        <Circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#h2grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          fill="none"
        />
      </Svg>
      <View
        style={{
          position: 'absolute',
          inset: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 9 * 0.22, color: accent, marginBottom: 6, textTransform: 'uppercase' }}>
          {eyebrow}
        </Text>
        <Text style={{ fontFamily: fonts.display, fontSize: 86, lineHeight: 86 * 0.85, letterSpacing: -86 * 0.04, color: palette.text1 }}>{score}</Text>
        <Text style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 9 * 0.22, color: palette.text3, marginTop: 4, textTransform: 'uppercase' }}>
          {caption}
        </Text>
      </View>
    </View>
  );
}
