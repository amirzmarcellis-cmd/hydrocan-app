import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthState {
  session: Session | null;
  user: User | null;
  initialized: boolean;
  // Onboarding state held locally for the prototype until persisted to Supabase.
  onboarded: boolean;
  setOnboarded: (v: boolean) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  initialized: false,
  onboarded: false,
  setOnboarded: (v) => set({ onboarded: v }),
  signOut: async () => {
    await supabase.auth.signOut().catch(() => {});
    set({ session: null, user: null, onboarded: false });
  },
  initialize: async () => {
    if (get().initialized) return;
    const { data } = await supabase.auth.getSession();
    set({ session: data.session, user: data.session?.user ?? null, initialized: true });
    supabase.auth.onAuthStateChange((_e, session) => {
      set({ session, user: session?.user ?? null });
    });
  },
}));
