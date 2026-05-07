import { View, Text, TextInput, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Tag } from '@/components/Tag';
import { useCoachMessages, useSendCoachMessage } from '@/hooks/useCoach';

const PROMPTS = [
  'Why did my H₂ Index drop today?',
  'When should I drink HydroCan around training?',
  'Explain hydrogen and oxidative stress',
  'How long until I see effects?',
];

export function CoachScreen() {
  const [draft, setDraft] = useState('');
  const messagesQ = useCoachMessages();
  const send = useSendCoachMessage();
  const scrollRef = useRef<ScrollView>(null);

  const messages = (messagesQ.data && 'messages' in messagesQ.data ? messagesQ.data.messages : []) ?? [];

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  }, [messages.length]);

  const submit = async (text?: string) => {
    const content = (text ?? draft).trim();
    if (!content) return;
    setDraft('');
    await send.mutateAsync(content);
  };

  return (
    <Screen edges={['top']}>
      <View className="px-5 pb-3">
        <Text className="text-2xl font-bold text-text">AI Coach</Text>
        <Text className="mt-1 text-sm text-text-dim">
          Personalised, evidence-based answers. Sources cited.
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          ref={scrollRef}
          className="flex-1 px-5"
          contentContainerClassName="pb-4"
        >
          {messages.length === 0 ? (
            <View className="mt-4">
              <Card elevated>
                <Text className="mb-2 text-base font-semibold text-text">
                  Hi 👋 — ask me anything about hydrogen and your data.
                </Text>
                <Text className="text-sm text-text-dim">Try one of these to get started:</Text>
              </Card>
              <View className="mt-3 gap-2">
                {PROMPTS.map((p) => (
                  <Pressable key={p} onPress={() => submit(p)}>
                    <Tag label={p} />
                  </Pressable>
                ))}
              </View>
            </View>
          ) : (
            messages.map((m) => (
              <View
                key={m.id}
                className={`mb-3 max-w-[85%] rounded-lg px-4 py-3 ${
                  m.role === 'user' ? 'self-end bg-h2-500' : 'self-start bg-surface2'
                }`}
              >
                <Text className={m.role === 'user' ? 'text-bg' : 'text-text'}>{m.content}</Text>
              </View>
            ))
          )}
        </ScrollView>

        <View className="border-t border-border bg-surface px-4 py-3">
          <View className="flex-row items-center gap-2">
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Ask the coach…"
              placeholderTextColor="#8A97B5"
              multiline
              className="flex-1 rounded-lg bg-surface2 px-3 py-2 text-base text-text"
              style={{ maxHeight: 120 }}
            />
            <Pressable
              onPress={() => submit()}
              disabled={!draft.trim() || send.isPending}
              className={`h-10 w-10 items-center justify-center rounded-pill ${
                draft.trim() ? 'bg-h2-500' : 'bg-surface2'
              }`}
            >
              <Text className={draft.trim() ? 'text-bg' : 'text-text-dim'}>↑</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
