import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';

export function useConnectedSources() {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['connected_sources', userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase.from('connected_sources').select('*').eq('user_id', userId!);
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useToggleConnectedSource() {
  const userId = useAuthStore((s) => s.user?.id);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ source, on }: { source: string; on: boolean }) => {
      if (!userId) throw new Error('Not signed in');
      if (on) {
        const { error } = await supabase
          .from('connected_sources')
          .upsert({ user_id: userId, source, connected_at: new Date().toISOString() });
        if (error) throw error;
      } else {
        const { error } = await supabase.from('connected_sources').delete().eq('user_id', userId).eq('source', source);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['connected_sources', userId] }),
  });
}
