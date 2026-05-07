// Minimal sparkline — last-point dot, optional split rule, stroke-only path.

import Svg, { Circle, Line, Path } from 'react-native-svg';

interface Props {
  data: number[];
  width?: number;
  height?: number;
  accent?: string;
  stroke?: number;
  splitAt?: number | null;
}

export function Sparkline({ data, width = 120, height = 34, accent = '#B8E0F5', stroke = 1.4, splitAt = null }: Props) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const step = width / Math.max(1, data.length - 1);
  const pts = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / span) * (height - 4) - 2;
    return [x, y] as const;
  });
  const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const lastIdx = data.length - 1;
  const lastX = lastIdx * step;
  const lastY = height - (((data[lastIdx] ?? 0) - min) / span) * (height - 4) - 2;
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {splitAt != null && (
        <Line x1={splitAt * step} y1={0} x2={splitAt * step} y2={height} stroke={accent} strokeWidth={0.8} strokeDasharray="2 2" opacity={0.5} />
      )}
      <Path d={path} fill="none" stroke={accent} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
      <Circle cx={lastX} cy={lastY} r={2.2} fill={accent} />
    </Svg>
  );
}
