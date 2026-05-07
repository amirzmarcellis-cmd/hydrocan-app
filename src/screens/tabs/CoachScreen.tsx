// AI Coach — daily briefing card, message thread, prompt chips, input row.

import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Display } from '@/components/Display';
import { Eyebrow } from '@/components/Eyebrow';
import { palette, fonts } from '@/theme/tokens';
import { I } from '@/icons';
import { COACH_VOICES, todaySummary } from '@/lib/recovery';
import { USER } from '@/data/mockUser';
import { useSettings } from '@/stores/settings';
import { Pill } from '@/components/Pill';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Msg { from: 'user' | 'coach'; text: string }

const PROMPTS = [
  'Why is my H₂ Score 78?',
  'Pre-run protocol',
  'Show inflammation trend',
  'Recommend a can',
];

export function CoachScreen() {
  const accent = useSettings((s) => s.accent);
  const voiceKey = useSettings((s) => s.coachVoice);
  const t = todaySummary(USER);
  const voice = COACH_VOICES[voiceKey];
  const morning = voice.morning(t, USER);
  const evening = voice.evening(t, USER);
  const insight = voice.insight(t);

  const [messages, setMessages] = useState<Msg[]>([
    { from: 'coach', text: morning },
    { from: 'user', text: `Why is my recovery score ${t.score}?` },
    { from: 'coach', text: insight },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const ref = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => ref.current?.scrollToEnd({ animated: true }), 50);
  }, [messages.length, typing]);

  const reply = (txt: string): string => {
    const t = txt.toLowerCase();
    if (t.includes('h2') || t.includes('hydrogen') || t.includes('score')) return insight;
    if (t.includes('week') || t.includes('review')) return evening;
    if (t.includes('workout') || t.includes('run')) return 'Pre: 500ml H₂ Electro 45 min out. During: 200ml every 15 min. Post: 750ml Recover within 60 min. Logged to your protocol.';
    if (t.includes('inflam')) return 'Inflammation index −22% in 7 days. Strongest drop on days you exceeded 2L. Keep stacking.';
    return 'Based on your last 14 days: drink 350ml H₂ Pure now, then a Citrus around 14:00. Your sweat rate today is 12% above baseline.';
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'coach', text: reply(text) }]);
      setTyping(false);
    }, 800);
  };

  const Spark = I.spark;
  const Mic = I.mic;
  const Send = I.send;
  const PlusI = I.plus;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: palette.graphite1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 18,
            paddingBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            borderBottomColor: palette.graphite4,
            borderBottomWidth: 1,
          }}
        >
          <View style={{ width: 42, height: 42 }}>
            <View
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 21,
                backgroundColor: `${accent}33`,
                opacity: 0.5,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 5,
                left: 5,
                right: 5,
                bottom: 5,
                borderRadius: 16,
                backgroundColor: palette.graphite3,
                borderColor: accent,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Spark size={18} stroke={accent} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Display size={20}>{voice.name}</Display>
            <Eyebrow size={8.5} style={{ marginTop: 1 }}>
              {voice.title}
            </Eyebrow>
          </View>
          <Pill label="● ONLINE" accent={accent} active />
        </View>

        {/* Briefing card */}
        <View style={{ padding: 12 }}>
          <View style={{ backgroundColor: palette.graphite3, borderColor: `${accent}55`, borderWidth: 1, borderRadius: 14, padding: 12 }}>
            <Eyebrow size={8} color={accent}>
              DAILY BRIEFING · 07:14
            </Eyebrow>
            <Text style={{ marginTop: 6, color: palette.text1, fontFamily: fonts.sans, fontSize: 13, lineHeight: 13 * 1.45 }}>
              "{evening}"
            </Text>
          </View>
        </View>

        <ScrollView ref={ref} contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 4, gap: 8 }} showsVerticalScrollIndicator={false}>
          {messages.map((m, i) => (
            <View
              key={i}
              style={{
                maxWidth: '78%',
                paddingHorizontal: 14,
                paddingVertical: 10,
                backgroundColor: m.from === 'user' ? accent : palette.graphite3,
                borderColor: m.from === 'user' ? accent : palette.graphite4,
                borderWidth: 1,
                borderRadius: 16,
                borderBottomRightRadius: m.from === 'user' ? 5 : 16,
                borderBottomLeftRadius: m.from === 'user' ? 16 : 5,
                alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Text
                style={{
                  fontFamily: m.from === 'user' ? fonts.sansMedium : fonts.sans,
                  fontSize: 13,
                  lineHeight: 13 * 1.4,
                  color: m.from === 'user' ? palette.graphite0 : palette.text1,
                }}
              >
                {m.text}
              </Text>
            </View>
          ))}
          {typing && (
            <View
              style={{
                width: 50,
                paddingHorizontal: 14,
                paddingVertical: 10,
                backgroundColor: palette.graphite3,
                borderColor: palette.graphite4,
                borderWidth: 1,
                borderRadius: 16,
                borderBottomLeftRadius: 5,
                alignSelf: 'flex-start',
                flexDirection: 'row',
                gap: 4,
              }}
            >
              {[0, 1, 2].map((i) => (
                <View key={i} style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: palette.text3 }} />
              ))}
            </View>
          )}
        </ScrollView>

        {/* Suggested prompts */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 14, gap: 5, paddingBottom: 6 }}>
          {PROMPTS.map((p, i) => (
            <Pill key={i} label={p} onPress={() => send(p)} />
          ))}
        </ScrollView>

        {/* Input row */}
        <View
          style={{
            paddingHorizontal: 14,
            paddingVertical: 8,
            paddingBottom: 12,
            flexDirection: 'row',
            gap: 7,
            alignItems: 'center',
            borderTopColor: palette.graphite4,
            borderTopWidth: 1,
          }}
        >
          <Pressable
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: palette.graphite3,
              borderColor: palette.graphite4,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlusI size={16} stroke={palette.text2} />
          </Pressable>
          <View
            style={{
              flex: 1,
              backgroundColor: palette.graphite3,
              borderRadius: 22,
              borderColor: palette.graphite4,
              borderWidth: 1,
              paddingHorizontal: 14,
              paddingVertical: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => send(input)}
              placeholder={`Ask ${voice.name}…`}
              placeholderTextColor={palette.text3}
              style={{ flex: 1, color: palette.text1, fontFamily: fonts.sans, fontSize: 13 }}
            />
            <Mic size={14} stroke={palette.text3} />
          </View>
          <Pressable
            onPress={() => send(input)}
            style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: accent, alignItems: 'center', justifyContent: 'center' }}
          >
            <Send size={14} stroke={palette.graphite0} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
