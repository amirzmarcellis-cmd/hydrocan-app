import { create } from 'zustand';
import { palette } from '@/theme/tokens';
import type { CoachVoice } from '@/lib/recovery';

interface SettingsState {
  accent: string;
  coachVoice: CoachVoice;
  timeOfDay: 'morning' | 'evening';
  setAccent: (a: string) => void;
  setCoachVoice: (v: CoachVoice) => void;
  setTimeOfDay: (t: 'morning' | 'evening') => void;
}

export const useSettings = create<SettingsState>((set) => ({
  accent: palette.iceBright,
  coachVoice: 'direct',
  timeOfDay: 'evening',
  setAccent: (accent) => set({ accent }),
  setCoachVoice: (coachVoice) => set({ coachVoice }),
  setTimeOfDay: (timeOfDay) => set({ timeOfDay }),
}));
