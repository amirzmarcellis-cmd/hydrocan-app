import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';

export function useTodayMetrics() {
  const userId = useAuthStore((s) => s.user?.id);
  const today = new Date().toISOString().slice(0, 10);
  return useQuery({
    queryKey: ['metrics', 'today', userId, today],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hydrocan_metrics_daily')
        .select('*')
        .eq('user_id', userId!)
        .eq('date', today)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function useMetricsHistory(days = 14) {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['metrics', 'history', userId, days],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hydrocan_metrics_daily')
        .select('*')
        .eq('user_id', userId!)
        .order('date', { ascending: false })
        .limit(days);
      if (error) throw error;
      return (data ?? []).reverse();
    },
  });
}

export function useHealthHistory(days = 14) {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['health', 'history', userId, days],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('health_metrics_daily')
        .select('*')
        .eq('user_id', userId!)
        .order('date', { ascending: false })
        .limit(days);
      if (error) throw error;
      return (data ?? []).reverse();
    },
  });
}
