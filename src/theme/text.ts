// Reusable RN text style presets — use these on any <Text>.

import { TextStyle } from 'react-native';
import { palette, fonts } from './tokens';

const m = (size: number, ls = 0.22, color = palette.text2): TextStyle => ({
  fontFamily: fonts.mono,
  fontSize: size,
  letterSpacing: size * ls,
  color,
  textTransform: 'uppercase',
});

export const T = {
  // Display — Wondra serif
  displayHuge: { fontFamily: fonts.display, fontSize: 132, lineHeight: 132 * 0.85, letterSpacing: -132 * 0.04, color: palette.text1 } as TextStyle,
  displayXL: { fontFamily: fonts.display, fontSize: 84, lineHeight: 84 * 0.9, letterSpacing: -84 * 0.04, color: palette.text1 } as TextStyle,
  displayLg: { fontFamily: fonts.display, fontSize: 44, lineHeight: 44 * 0.95, letterSpacing: -44 * 0.03, color: palette.text1 } as TextStyle,
  displayMd: { fontFamily: fonts.display, fontSize: 30, lineHeight: 30 * 1.05, letterSpacing: -30 * 0.025, color: palette.text1 } as TextStyle,
  displaySm: { fontFamily: fonts.display, fontSize: 22, lineHeight: 22 * 1.15, letterSpacing: -22 * 0.02, color: palette.text1 } as TextStyle,
  displayXs: { fontFamily: fonts.display, fontSize: 16, lineHeight: 16 * 1.3, letterSpacing: -16 * 0.01, color: palette.text1 } as TextStyle,

  // Body — Inter
  body: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 13 * 1.45, color: palette.text2 } as TextStyle,
  bodySm: { fontFamily: fonts.sans, fontSize: 11, lineHeight: 11 * 1.45, color: palette.text3 } as TextStyle,
  bodyXs: { fontFamily: fonts.sans, fontSize: 10, lineHeight: 10 * 1.45, color: palette.text3 } as TextStyle,
  bodyLg: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 14 * 1.5, color: palette.text2 } as TextStyle,

  // Mono eyebrow — JetBrains Mono, uppercase, wide letter-spacing
  eyebrow: m(9),
  eyebrowSm: m(8.5),
  eyebrowXs: m(8),
  eyebrowLg: m(10),
  eyebrowIce: { ...m(9), color: palette.iceBright },
  eyebrowMuted: { ...m(9), color: palette.text3 },

  // Editorial caption
  edition: { fontFamily: fonts.mono, fontSize: 8.5, letterSpacing: 8.5 * 0.22, color: palette.text2, textTransform: 'uppercase' } as TextStyle,
} as const;
