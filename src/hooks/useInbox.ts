import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';

export function useInbox() {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['inbox', userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inbox')
        .select('*')
        .eq('user_id', userId!)
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useMarkInboxRead() {
  const userId = useAuthStore((s) => s.user?.id);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('inbox').update({ read_at: new Date().toISOString() }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['inbox', userId] }),
  });
}
