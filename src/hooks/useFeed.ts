import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface FeedPost {
  id: string;
  type: string;
  payload: any;
  created_at: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
}

export function useFeed() {
  return useQuery<FeedPost[]>({
    queryKey: ['feed'],
    queryFn: async () => {
      const { data: posts, error } = await supabase
        .from('posts')
        .select('id, type, payload, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(40);
      if (error) throw error;
      const list = posts ?? [];
      const ids = Array.from(new Set(list.map((p) => p.user_id)));
      if (!ids.length) return [];
      const { data: profiles, error: pErr } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url')
        .in('id', ids);
      if (pErr) throw pErr;
      const byId = new Map((profiles ?? []).map((p) => [p.id, p]));
      return list.map<FeedPost>((p) => ({
        ...p,
        display_name: byId.get(p.user_id)?.display_name ?? null,
        avatar_url: byId.get(p.user_id)?.avatar_url ?? null,
      }));
    },
  });
}

export function useChallenges() {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('starts_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      return data ?? [];
    },
  });
}
