// HydroCan design tokens
// Dark-first palette built around hydrogen blues + cellular-zone colours.

export const palette = {
  // Hydrogen / water
  h2_300: '#90E0EF',
  h2_400: '#48CAE4',
  h2_500: '#00B4D8',
  h2_600: '#0096C7',
  h2_700: '#0077B6',
  h2_800: '#023E8A',
  h2_900: '#03045E',
  // Performance accents
  lift: '#7CFFB2',
  peak: '#B8FFE5',
  // Cellular performance zones
  depleted: '#FF6B6B',
  building: '#FFB84D',
  optimised: '#7CFFB2',
  peakState: '#B8FFE5',
  // Surfaces (dark-first)
  bg: '#05080F',
  surface: '#0B1220',
  surface2: '#121A2B',
  border: '#1E2A44',
  text: '#F5F8FF',
  textDim: '#8A97B5',
} as const;

export const radius = { sm: 8, md: 14, lg: 20, xl: 28, pill: 999 } as const;

export const space = (n: number): number => n * 4;

export type PaletteKey = keyof typeof palette;
export type Zone = 'depleted' | 'building' | 'optimised' | 'peak';

export const zoneColors: Record<Zone, string> = {
  depleted: palette.depleted,
  building: palette.building,
  optimised: palette.optimised,
  peak: palette.peakState,
};

export const zoneLabels: Record<Zone, string> = {
  depleted: 'Depleted',
  building: 'Building',
  optimised: 'Optimised',
  peak: 'Peak',
};

export function getZoneFromScore(score: number): Zone {
  if (score < 25) return 'depleted';
  if (score < 55) return 'building';
  if (score < 80) return 'optimised';
  return 'peak';
}
