// Morning check-in (energy + mood).

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';

export function useTodayRitual() {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['ritual_today', userId],
    enabled: !!userId,
    queryFn: async () => {
      const today = new Date().toISOString().slice(0, 10);
      const { data, error } = await supabase
        .from('ritual_logs')
        .select('*')
        .eq('user_id', userId!)
        .eq('date', today)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function useUpsertRitual() {
  const userId = useAuthStore((s) => s.user?.id);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patch: { energy?: number; mood?: number; notes?: string }) => {
      if (!userId) throw new Error('Not signed in');
      const today = new Date().toISOString().slice(0, 10);
      const { error } = await supabase.from('ritual_logs').upsert({ user_id: userId, date: today, ...patch });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['ritual_today'] }),
  });
}
