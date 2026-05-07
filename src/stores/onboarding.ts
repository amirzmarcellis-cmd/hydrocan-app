import { create } from 'zustand';

export interface OnboardingState {
  name: string;
  dob: string;
  sex: 'Male' | 'Female' | 'Other' | '';
  tier: 'starter' | 'standard' | 'pro' | 'none' | '';
  connected: string[];
  goal: number;
  manual: boolean;
  set: (patch: Partial<OnboardingState>) => void;
  reset: () => void;
}

const initial = {
  name: '',
  dob: '',
  sex: '' as const,
  tier: '' as const,
  connected: [] as string[],
  goal: 3,
  manual: false,
};

export const useOnboarding = create<OnboardingState>((set) => ({
  ...initial,
  set: (patch) => set(patch),
  reset: () => set(initial),
}));
