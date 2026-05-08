// Today's can list + log mutation.

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';
import type { Tables } from '@/lib/database.types';

export type CanLog = Tables<'cans_logged'>;

export function useTodayCans() {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['cans_today', userId],
    enabled: !!userId,
    queryFn: async () => {
      const dayStart = new Date();
      dayStart.setHours(0, 0, 0, 0);
      const { data, error } = await supabase
        .from('cans_logged')
        .select('*')
        .eq('user_id', userId!)
        .gte('consumed_at', dayStart.toISOString())
        .order('consumed_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export interface LogCanInput {
  can_id: 'pure' | 'electro' | 'citrus' | 'recover';
  ml?: number;
  source?: 'manual' | 'scan' | 'voice' | 'reminder' | 'nfc';
  feel_score?: number | null;
  context?: string[];
}

export function useLogCan() {
  const userId = useAuthStore((s) => s.user?.id);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: LogCanInput) => {
      if (!userId) throw new Error('Not signed in');
      const { error } = await supabase.from('cans_logged').insert({
        user_id: userId,
        can_id: input.can_id,
        ml: input.ml ?? 330,
        source: input.source ?? 'manual',
        feel_score: input.feel_score ?? null,
        context: input.context ?? [],
        consumed_at: new Date().toISOString(),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cans_today'] });
      qc.invalidateQueries({ queryKey: ['recovery_today'] });
      qc.invalidateQueries({ queryKey: ['h2_effect_today'] });
    },
  });
}
