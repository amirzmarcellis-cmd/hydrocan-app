// Hydrocan Health design tokens — graphite + ice palette,
// editorial type system (Wondra serif display + Inter + JetBrains Mono).

export const palette = {
  // Graphite scale — surfaces (dark-first)
  graphite0: '#050608',
  graphite1: '#0A0C10',
  graphite2: '#11141A',
  graphite3: '#181C24',
  graphite4: '#232833',
  graphite5: '#2E3543',

  // Text scale
  text1: '#F2F5F9',
  text2: '#B8C0CC',
  text3: '#6E7888',
  text4: '#424B5A',

  // Ice accent palette
  ice: '#B8E0F5',
  iceBright: '#7CC9EE',
  iceDeep: '#4DA8D6',
  iceGlow: 'rgba(124,201,238,0.18)',

  // Alt accents (tweaks panel)
  arctic: '#B8E0F5',
  glacier: '#4DA8D6',
  mineral: '#9BE3D2',
  sunrise: '#E5C97A',
  crimson: '#E58E7A',

  // Semantic
  good: '#7CC9EE',
  warm: '#E58E7A',
  caution: '#E5C97A',
} as const;

export const fonts = {
  display: 'Wondra',
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemibold: 'Inter_600SemiBold',
  sansBold: 'Inter_700Bold',
  sansBlack: 'Inter_900Black',
  mono: 'JetBrainsMono_400Regular',
  monoMedium: 'JetBrainsMono_500Medium',
} as const;

// Letter-spacing values (in em — multiply by font size in pixels for RN)
export const letter = {
  display: -0.04, // tight serif
  displaySoft: -0.02,
  body: 0,
  mono14: 0.14,
  mono16: 0.16,
  mono18: 0.18,
  mono20: 0.2,
  mono22: 0.22,
  mono24: 0.24,
  mono28: 0.28,
  mono32: 0.32,
} as const;

export const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 14,
  xl: 22,
  pill: 999,
} as const;

export const space = {
  hairline: 1,
  '0_5': 2,
  '1': 4,
  '1_5': 6,
  '2': 8,
  '2_5': 10,
  '3': 12,
  '3_5': 14,
  '4': 16,
  '5': 18,
  '6': 22,
  '7': 28,
  '8': 32,
  '10': 40,
  '12': 48,
} as const;

// Tweak-panel accent options — exposed so settings can swap accent colour
export const ACCENTS = [
  { k: 'ice', v: palette.iceBright, l: 'Ice' },
  { k: 'arctic', v: palette.arctic, l: 'Arctic' },
  { k: 'glacier', v: palette.glacier, l: 'Glacier' },
  { k: 'mineral', v: palette.mineral, l: 'Mineral' },
  { k: 'sunrise', v: palette.sunrise, l: 'Sunrise' },
  { k: 'crimson', v: palette.crimson, l: 'Crimson' },
] as const;

export type Accent = (typeof ACCENTS)[number]['v'];

// Photo URLs — used during prototype phase, replace with native assets in prod.
export const PHOTO = {
  trail: 'https://images.unsplash.com/photo-1486218119243-13883505764c?w=1600&q=85&auto=format&fit=crop',
  dawn: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=1600&q=85&auto=format&fit=crop',
  studio: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=85&auto=format&fit=crop',
  canPure: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=1200&q=85&auto=format&fit=crop',
  canElectro: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85&auto=format&fit=crop',
  portrait: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80&auto=format&fit=crop',
  waterMacro: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1600&q=85&auto=format&fit=crop',
  bubbles: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1600&q=85&auto=format&fit=crop',
} as const;
