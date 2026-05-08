// Coach thread (per-voice) + send message. Coach replies are stubbed locally
// — wire a Supabase Edge Function calling Claude when ready.

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';
import { useSettings } from '@/stores/settings';
import type { CoachVoice } from '@/lib/recovery';

async function getOrCreateThread(userId: string, voice: CoachVoice): Promise<string> {
  const { data: existing } = await supabase
    .from('coach_threads')
    .select('id')
    .eq('user_id', userId)
    .eq('voice', voice)
    .order('created_at', { ascending: false })
    .limit(1);
  if (existing && existing.length && existing[0]) return existing[0].id;
  const { data, error } = await supabase
    .from('coach_threads')
    .insert({ user_id: userId, voice })
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

export function useCoachThread() {
  const userId = useAuthStore((s) => s.user?.id);
  const voice = useSettings((s) => s.coachVoice);
  return useQuery({
    queryKey: ['coach_thread', userId, voice],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return null;
      const threadId = await getOrCreateThread(userId, voice);
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
  const voice = useSettings((s) => s.coachVoice);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ threadId, content, reply }: { threadId: string; content: string; reply: string }) => {
      if (!userId) throw new Error('Not signed in');
      const { error: e1 } = await supabase
        .from('coach_messages')
        .insert({ thread_id: threadId, user_id: userId, role: 'user', content });
      if (e1) throw e1;
      const { error: e2 } = await supabase
        .from('coach_messages')
        .insert({ thread_id: threadId, user_id: userId, role: 'coach', content: reply });
      if (e2) throw e2;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['coach_thread', userId, voice] }),
  });
}
