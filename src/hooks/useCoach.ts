import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';

async function getOrCreateThread(userId: string): Promise<string> {
  const { data } = await supabase
    .from('coach_threads')
    .select('id')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1);
  if (data && data.length && data[0]) return data[0].id;
  const { data: created, error } = await supabase
    .from('coach_threads')
    .insert({ user_id: userId })
    .select('id')
    .single();
  if (error) throw error;
  return created.id;
}

export function useCoachMessages() {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ['coach', 'messages', userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return [];
      const threadId = await getOrCreateThread(userId);
      const { data, error } = await supabase
        .from('coach_messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return { threadId, messages: data ?? [] };
    },
  });
}

export function useSendCoachMessage() {
  const userId = useAuthStore((s) => s.user?.id);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (content: string) => {
      if (!userId) throw new Error('Not signed in');
      const threadId = await getOrCreateThread(userId);
      const { error } = await supabase.from('coach_messages').insert({
        thread_id: threadId,
        role: 'user',
        content,
      });
      if (error) throw error;
      // In production, an Edge Function would respond. For UI demo we echo.
      await supabase.from('coach_messages').insert({
        thread_id: threadId,
        role: 'assistant',
        content:
          "Got it — I'll factor that into your next reading. Track your H₂ Index over the next 3 days to see the effect.",
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['coach'] }),
  });
}
