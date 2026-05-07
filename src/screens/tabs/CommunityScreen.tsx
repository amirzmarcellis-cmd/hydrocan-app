import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Tag } from '@/components/Tag';
import { useFeed, useChallenges } from '@/hooks/useFeed';

const TABS = ['Feed', 'Challenges', 'Squads'] as const;
type TabKey = (typeof TABS)[number];

export function CommunityScreen() {
  const [tab, setTab] = useState<TabKey>('Feed');
  const feed = useFeed();
  const challenges = useChallenges();

  return (
    <Screen scrollable className="px-5">
      <Text className="mt-2 text-2xl font-bold text-text">Community</Text>
      <Text className="mb-5 mt-1 text-sm text-text-dim">
        Share progress, join challenges, build squads.
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
        <View className="flex-row gap-2 px-1">
          {TABS.map((t) => (
            <Pressable key={t} onPress={() => setTab(t)}>
              <Tag label={t} active={tab === t} />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {tab === 'Feed' ? (
        <View>
          {(feed.data ?? []).length === 0 ? (
            <Card>
              <Text className="text-text-dim">
                Your feed is quiet. Start by sharing today's H₂ Index.
              </Text>
            </Card>
          ) : (
            (feed.data ?? []).map((post) => (
              <Card key={post.id} className="mb-3">
                <View className="flex-row items-center gap-3">
                  <View className="h-10 w-10 items-center justify-center rounded-pill bg-h2-500/30">
                    <Text className="text-h2-300">
                      {(post.display_name ?? 'A').slice(0, 1).toUpperCase()}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-text">
                      {post.display_name ?? 'Anonymous'}
                    </Text>
                    <Text className="text-xs text-text-dim">
                      {new Date(post.created_at).toLocaleDateString()} · {post.type}
                    </Text>
                  </View>
                </View>
                <Text className="mt-3 text-sm text-text">
                  {post.payload?.title ?? post.payload?.message ?? 'Shared a result'}
                </Text>
                <View className="mt-3 flex-row gap-4">
                  <Text className="text-text-dim">💧</Text>
                  <Text className="text-text-dim">⚡</Text>
                  <Text className="text-text-dim">🔥</Text>
                  <Text className="text-text-dim">💪</Text>
                </View>
              </Card>
            ))
          )}
        </View>
      ) : tab === 'Challenges' ? (
        <View>
          {(challenges.data ?? []).map((ch) => (
            <Card key={ch.id} className="mb-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-text">{ch.name}</Text>
                {ch.is_featured ? <Tag label="Featured" active /> : null}
              </View>
              {ch.description ? (
                <Text className="mt-2 text-sm text-text-dim">{ch.description}</Text>
              ) : null}
              <Text className="mt-3 text-xs text-text-dim">
                {new Date(ch.starts_at).toLocaleDateString()} →{' '}
                {new Date(ch.ends_at).toLocaleDateString()}
              </Text>
            </Card>
          ))}
          {(!challenges.data || challenges.data.length === 0) ? (
            <Card>
              <Text className="text-text-dim">No active challenges right now.</Text>
            </Card>
          ) : null}
        </View>
      ) : (
        <Card>
          <Text className="mb-2 text-base font-semibold text-text">Build your squad</Text>
          <Text className="text-sm text-text-dim">
            Invite friends, compare H₂ Index, and motivate each other.
          </Text>
        </Card>
      )}
    </Screen>
  );
}
