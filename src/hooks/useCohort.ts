// Anonymised global leaderboard (publicly readable).

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useCohortLeaderboard(limit = 50) {
  return useQuery({
    queryKey: ['cohort_leaderboard', limit],
    queryFn: async () => {
      // Most recent week
      const { data: weekRow } = await supabase
        .from('cohort_aggregates')
        .select('week_start')
        .order('week_start', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!weekRow) return [];
      const { data, error } = await supabase
        .from('cohort_aggregates')
        .select('*')
        .eq('week_start', weekRow.week_start)
        .order('pct', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data ?? [];
    },
  });
}
