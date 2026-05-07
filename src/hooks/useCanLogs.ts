import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';

export function useTodayCanLogs() {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['canLogs', 'today', userId],
    enabled: !!userId,
    queryFn: async () => {
      const dayStart = new Date();
      dayStart.setHours(0, 0, 0, 0);
      const { data, error } = await supabase
        .from('can_logs')
        .select('*')
        .eq('user_id', userId!)
        .gte('consumed_at', dayStart.toISOString())
        .order('consumed_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

interface LogCanInput {
  quantity?: number;
  context?: string[];
  feel_score?: number | null;
}

export function useLogCan() {
  const userId = useAuthStore((s) => s.user?.id);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: LogCanInput) => {
      if (!userId) throw new Error('Not signed in');
      const { error } = await supabase.from('can_logs').insert({
        user_id: userId,
        consumed_at: new Date().toISOString(),
        quantity: input.quantity ?? 1,
        context: input.context ?? [],
        feel_score: input.feel_score ?? null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['canLogs'] });
      qc.invalidateQueries({ queryKey: ['streak'] });
      qc.invalidateQueries({ queryKey: ['metrics'] });
    },
  });
}
