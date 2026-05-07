// Hydrocan icon set — outlined SVG, ports the prototype's primitives.jsx I = {...}.

import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

interface Props {
  size?: number;
  sw?: number;
  stroke?: string;
  fill?: string;
}

const make = (children: React.ReactNode) =>
  function Icon({ size = 20, sw = 1.5, stroke = 'currentColor', fill = 'none' }: Props) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </Svg>
    );
  };

export const I = {
  home: make(<Path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z" />),
  spark: make(<Path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />),
  chart: make(<Path d="M3 20h18M7 16V9M12 16V5M17 16v-7" />),
  scan: make(
    <G>
      <Rect x="3" y="3" width="7" height="7" />
      <Rect x="14" y="3" width="7" height="7" />
      <Rect x="3" y="14" width="7" height="7" />
      <Path d="M14 14h3v3h-3zM18 18h3v3h-3z" />
    </G>,
  ),
  user: make(
    <G>
      <Circle cx="12" cy="8" r="4" />
      <Path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </G>,
  ),
  drop: make(<Path d="M12 3s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z" />),
  bolt: make(<Path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />),
  plus: make(<Path d="M12 5v14M5 12h14" />),
  back: make(<Path d="M19 12H5M11 6l-6 6 6 6" />),
  arrow: make(<Path d="M5 12h14M13 6l6 6-6 6" />),
  bell: make(<Path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9zM10 21a2 2 0 0 0 4 0" />),
  bag: make(<Path d="M5 8h14l-1 12H6L5 8zM9 8a3 3 0 0 1 6 0" />),
  send: make(<Path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />),
  mic: make(
    <G>
      <Rect x="9" y="3" width="6" height="12" rx="3" />
      <Path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </G>,
  ),
  more: make(
    <G>
      <Circle cx="5" cy="12" r="1" fill="currentColor" />
      <Circle cx="12" cy="12" r="1" fill="currentColor" />
      <Circle cx="19" cy="12" r="1" fill="currentColor" />
    </G>,
  ),
  search: make(
    <G>
      <Circle cx="11" cy="11" r="7" />
      <Path d="m20 20-3.5-3.5" />
    </G>,
  ),
  close: make(<Path d="M6 6l12 12M18 6 6 18" />),
  flame: make(<Path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-5s3-3 3-3zM7 14a5 5 0 0 0 10 0c0 4-2 8-5 8s-5-4-5-8z" />),
  filter: make(<Path d="M3 5h18M6 12h12M10 19h4" />),
  watch: make(
    <G>
      <Rect x="6" y="6" width="12" height="12" rx="3" />
      <Path d="M9 6V3h6v3M9 18v3h6v-3" />
    </G>,
  ),
  truck: make(<Path d="M3 7h11v10H3zM14 10h4l3 3v4h-7M6 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />),
  check: make(<Path d="M5 12l4 4 10-10" />),
};

export type IconKey = keyof typeof I;
