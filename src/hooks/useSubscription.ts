import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';

const TIER_TO_CANS: Record<string, number> = { starter: 12, standard: 24, pro: 48 };

export function useSubscription() {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['subscription', userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase.from('subscriptions').select('*').eq('user_id', userId!).maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function useUpsertSubscription() {
  const userId = useAuthStore((s) => s.user?.id);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (tier: 'starter' | 'standard' | 'pro') => {
      if (!userId) throw new Error('Not signed in');
      const today = new Date();
      const periodEnd = new Date(today);
      periodEnd.setMonth(periodEnd.getMonth() + 1);
      const { error } = await supabase.from('subscriptions').upsert({
        user_id: userId,
        tier,
        cans_per_month: TIER_TO_CANS[tier] ?? 24,
        status: 'active',
        current_period_start: today.toISOString().slice(0, 10),
        current_period_end: periodEnd.toISOString().slice(0, 10),
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['subscription', userId] }),
  });
}
