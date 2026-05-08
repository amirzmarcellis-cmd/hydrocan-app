// Pulls last N days of wearable signals for a user. Used by Today + Trends.

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';

export function useSignalsHistory(days = 30) {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['signals_daily', userId, days],
    enabled: !!userId,
    queryFn: async () => {
      const since = new Date();
      since.setDate(since.getDate() - days);
      const { data, error } = await supabase
        .from('signals_daily')
        .select('*')
        .eq('user_id', userId!)
        .gte('date', since.toISOString().slice(0, 10))
        .order('date', { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useTodayRecovery() {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['recovery_today', userId],
    enabled: !!userId,
    queryFn: async () => {
      const today = new Date().toISOString().slice(0, 10);
      const { data, error } = await supabase
        .from('recovery_scores')
        .select('*')
        .eq('user_id', userId!)
        .eq('date', today)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function useTodayH2Effect() {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['h2_effect_today', userId],
    enabled: !!userId,
    queryFn: async () => {
      const today = new Date().toISOString().slice(0, 10);
      const { data, error } = await supabase
        .from('h2_effect_daily')
        .select('*')
        .eq('user_id', userId!)
        .eq('date', today)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function useTodayFinding() {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['finding_today', userId],
    enabled: !!userId,
    queryFn: async () => {
      const today = new Date().toISOString().slice(0, 10);
      const { data, error } = await supabase
        .from('findings_daily')
        .select('*')
        .eq('user_id', userId!)
        .eq('date', today)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}
