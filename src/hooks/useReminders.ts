import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';
import type { Tables } from '@/lib/database.types';

export type Reminder = Tables<'reminders'>;

export function useReminders() {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['reminders', userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', userId!)
        .order('time_local', { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useToggleReminder() {
  const userId = useAuthStore((s) => s.user?.id);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, enabled }: { id: string; enabled: boolean }) => {
      const { error } = await supabase.from('reminders').update({ enabled }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reminders', userId] }),
  });
}
