// Today — editorial spine. Macro background photo, masthead rule,
// hero H₂ Effect %, daily finding card, optional morning ritual,
// 4 H₂-lens metric tiles, timing nudge, hydration, sources footer.

import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Display } from '@/components/Display';
import { Eyebrow } from '@/components/Eyebrow';
import { Body } from '@/components/Body';
import { MetricTile } from '@/components/MetricTile';
import { palette, fonts, PHOTO } from '@/theme/tokens';
import { I } from '@/icons';
import { USER } from '@/data/mockUser';
import { todaySummary, h2EffectScore, h2Effect, dailyFinding, timingNudge } from '@/lib/recovery';
import { useSettings } from '@/stores/settings';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export function TodayScreen() {
  const accent = useSettings((s) => s.accent);
  const timeOfDay = useSettings((s) => s.timeOfDay);
  const nav = useNavigation<any>();

  const [checkedIn, setCheckedIn] = useState(false);
  const [energy, setEnergy] = useState(0);

  const t = todaySummary(USER);
  const score = h2EffectScore(USER);
  const finding = dailyFinding(USER);
  const isEve = timeOfDay === 'evening';
  const nudge = timingNudge(USER, isEve ? 19 : 9);
  const bgUri = isEve ? PHOTO.bubbles : PHOTO.waterMacro;
  const edition = isEve ? 'EVENING EDITION' : 'MORNING EDITION';
  const time = isEve ? '19:42' : '07:14';

  const effects = {
    hrv: h2Effect(USER, 'hrv'),
    rhr: h2Effect(USER, 'rhr'),
    slp: h2Effect(USER, 'sleepEff'),
    resp: h2Effect(USER, 'respRate'),
  };

  const ready = score.ready;
  const heroPct = ready ? Math.round(score.pct ?? 0) : 0;
  const heroSign = ready && heroPct >= 0 ? '+' : '';
  const ciLabel = ready ? `CI · ${(score.ci ?? '').toUpperCase()} · n=${score.nOn}` : `BASELINE · DAY ${USER.dayN} OF 14`;

  const Bell = I.bell;
  const User = I.user;
  const Plus = I.plus;
  const Scan = I.scan;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: palette.graphite0 }}>
      <StatusBar style="light" />
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 540, overflow: 'hidden' }}>
        <Image source={{ uri: bgUri }} style={{ width: '100%', height: '100%', opacity: 0.4 }} contentFit="cover" />
        <LinearGradient
          colors={['rgba(5,6,8,0.55)', 'rgba(5,6,8,0.2)', 'rgba(5,6,8,0.78)', '#050608']}
          locations={[0, 0.28, 0.78, 1]}
          style={{ position: 'absolute', inset: 0 }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Masthead */}
        <View style={{ paddingHorizontal: 22, paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 9 * 0.22, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
            HYDROCAN <Text style={{ color: accent }}>·</Text> STUDY
          </Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <Pressable onPress={() => nav.navigate('Reminders')} style={{ padding: 6 }}>
              <Bell size={15} stroke="rgba(255,255,255,0.7)" />
            </Pressable>
            <Pressable onPress={() => nav.navigate('Tabs', { screen: 'Profile' })} style={{ padding: 6 }}>
              <User size={15} stroke="rgba(255,255,255,0.7)" />
            </Pressable>
          </View>
        </View>

        {/* Edition rule */}
        <View
          style={{
            marginHorizontal: 22,
            marginTop: 10,
            borderTopColor: 'rgba(255,255,255,0.18)',
            borderBottomColor: 'rgba(255,255,255,0.18)',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingVertical: 7,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Eyebrow size={8.5} color="rgba(255,255,255,0.75)">
            {edition}
          </Eyebrow>
          <Eyebrow size={8.5} color="rgba(255,255,255,0.5)">
            EXP · DAY {String(USER.dayN).padStart(3, '0')}
          </Eyebrow>
          <Eyebrow size={8.5} color={accent}>
            {time}
          </Eyebrow>
        </View>

        {/* HERO */}
        <View style={{ paddingHorizontal: 22, paddingTop: 30, paddingBottom: 8, alignItems: 'center' }}>
          <Eyebrow size={9} letterSpacing={0.32} color="rgba(255,255,255,0.6)">
            YOUR H₂ EFFECT
          </Eyebrow>
          {ready ? (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', marginTop: 14 }}>
                <Text style={{ fontFamily: fonts.display, fontSize: 36, marginTop: 22, color: 'rgba(255,255,255,0.7)', letterSpacing: -36 * 0.02 }}>
                  {heroSign}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 144,
                    lineHeight: 144 * 0.85,
                    letterSpacing: -144 * 0.04,
                    color: palette.text1,
                  }}
                >
                  {Math.abs(heroPct)}
                </Text>
                <Text style={{ marginLeft: 4, marginTop: 22, fontFamily: fonts.display, fontSize: 36, color: 'rgba(255,255,255,0.7)', letterSpacing: -36 * 0.02 }}>
                  %
                </Text>
              </View>
              <View style={{ width: 80, height: 1, backgroundColor: 'rgba(255,255,255,0.25)', marginVertical: 10 }} />
              <Display size={14} color="rgba(255,255,255,0.92)" style={{ maxWidth: 280, textAlign: 'center', lineHeight: 14 * 1.4 }}>
                Your body responds <Text style={{ color: accent }}>{heroPct >= 0 ? 'better' : 'differently'}</Text> on H₂ days, on average across recovery signals.
              </Display>
              <Text style={{ marginTop: 10, fontFamily: fonts.mono, fontSize: 9, letterSpacing: 9 * 0.22, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                {ciLabel} · {score.nOn} ON / {score.nOff} OFF
              </Text>
            </>
          ) : (
            <>
              <Text style={{ fontFamily: fonts.display, fontSize: 96, lineHeight: 96 * 0.9, letterSpacing: -96 * 0.03, color: palette.text1, marginTop: 14 }}>
                n = {score.nOn}
              </Text>
              <View style={{ width: 80, height: 1, backgroundColor: 'rgba(255,255,255,0.25)', marginVertical: 12 }} />
              <Display size={14} color="rgba(255,255,255,0.85)" style={{ maxWidth: 280, textAlign: 'center', lineHeight: 14 * 1.4 }}>
                Building your baseline. Your H₂ Effect appears once you have 5 logged days.
              </Display>
            </>
          )}
          <Pressable
            onPress={() => nav.navigate('Tabs', { screen: 'Coach' })}
            style={{
              marginTop: 14,
              backgroundColor: 'rgba(10,12,16,0.6)',
              borderColor: 'rgba(255,255,255,0.18)',
              borderWidth: 1,
              paddingVertical: 8,
              paddingHorizontal: 14,
            }}
          >
            <Eyebrow size={9.5} color="rgba(255,255,255,0.85)">
              HOW IS THIS CALCULATED? →
            </Eyebrow>
          </Pressable>
        </View>

        {/* DAILY FINDING */}
        <View style={{ paddingHorizontal: 22, paddingTop: 18 }}>
          <View style={{ padding: 16, backgroundColor: 'rgba(184,224,245,0.05)', borderColor: `${accent}55`, borderWidth: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Eyebrow size={8.5} letterSpacing={0.24} color={accent}>
                {finding.eyebrow}
              </Eyebrow>
              <View style={{ borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1, paddingHorizontal: 6, paddingVertical: 2 }}>
                <Eyebrow size={8} letterSpacing={0.18} color="rgba(255,255,255,0.6)">
                  {finding.tag}
                </Eyebrow>
              </View>
            </View>
            <Display size={22} lineHeight={22 * 1.15} letterSpacing={-0.01}>
              {finding.headline}
            </Display>
            <Body size={12} color="rgba(255,255,255,0.75)" style={{ marginTop: 10 }}>
              {finding.body}
            </Body>
          </View>
        </View>

        {/* MORNING RITUAL */}
        {!isEve && !checkedIn && (
          <View style={{ paddingHorizontal: 22, paddingTop: 14 }}>
            <View
              style={{
                padding: 16,
                backgroundColor: 'rgba(10,12,16,0.6)',
                borderColor: 'rgba(255,255,255,0.12)',
                borderWidth: 1,
              }}
            >
              <Eyebrow size={8.5} letterSpacing={0.24} color="rgba(255,255,255,0.55)">
                ¶ MORNING NOTE · 1 TAP
              </Eyebrow>
              <Display size={16} style={{ marginTop: 8, marginBottom: 14 }}>
                How does your body feel today?
              </Display>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {[1, 2, 3, 4, 5].map((n) => {
                  const active = energy === n;
                  return (
                    <Pressable
                      key={n}
                      onPress={() => {
                        setEnergy(n);
                        setCheckedIn(true);
                      }}
                      style={{
                        flex: 1,
                        paddingVertical: 10,
                        backgroundColor: active ? accent : 'transparent',
                        borderColor: active ? accent : 'rgba(255,255,255,0.18)',
                        borderWidth: 1,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontFamily: fonts.display, fontSize: 16, color: active ? palette.graphite0 : palette.text1 }}>{n}</Text>
                    </Pressable>
                  );
                })}
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                <Eyebrow size={8} letterSpacing={0.16} color="rgba(255,255,255,0.4)">
                  DEPLETED
                </Eyebrow>
                <Eyebrow size={8} letterSpacing={0.16} color="rgba(255,255,255,0.4)">
                  RESTED
                </Eyebrow>
              </View>
              <Eyebrow size={8.5} letterSpacing={0.18} color="rgba(255,255,255,0.5)" style={{ marginTop: 10 }}>
                FEEDS YOUR EXPERIMENT — WE CORRELATE THIS WITH H₂ DAYS.
              </Eyebrow>
            </View>
          </View>
        )}

        {/* SIGNALS */}
        <View
          style={{
            paddingHorizontal: 22,
            paddingTop: 18,
            paddingBottom: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Eyebrow size={9} color="rgba(255,255,255,0.6)">
            ¶ SIGNALS · ON H₂ vs OFF
          </Eyebrow>
          <Pressable onPress={() => nav.navigate('Trends')}>
            <Eyebrow size={9} color={accent}>
              FULL STUDY →
            </Eyebrow>
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: 22, paddingBottom: 14 }}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <MetricTile label="HRV" unit="ms" effect={effects.hrv} accent={accent} />
            <MetricTile label="RESTING HR" unit="bpm" effect={effects.rhr} invert accent={accent} />
          </View>
          <View style={{ flexDirection: 'row', gap: 6, marginTop: 6 }}>
            <MetricTile label="SLEEP EFF." unit="%" effect={effects.slp} accent={accent} />
            <MetricTile label="RESP. RATE" unit="br/min" effect={effects.resp} invert accent={accent} />
          </View>
        </View>

        {/* TIMING NUDGE */}
        {nudge && (
          <View style={{ paddingHorizontal: 22, paddingBottom: 14 }}>
            <View style={{ paddingVertical: 10, paddingHorizontal: 14, borderLeftColor: accent, borderLeftWidth: 2, backgroundColor: 'rgba(184,224,245,0.05)' }}>
              <Eyebrow size={8.5} letterSpacing={0.22} color={accent} style={{ marginBottom: 4 }}>
                ¶ TIMING
              </Eyebrow>
              <Display size={13} lineHeight={13 * 1.4} color="rgba(255,255,255,0.85)">
                {nudge.copy}
              </Display>
            </View>
          </View>
        )}

        {/* HYDRATION + LOG */}
        <View style={{ paddingHorizontal: 22, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Eyebrow size={9} color="rgba(255,255,255,0.6)">
            ¶ TODAY · LOG
          </Eyebrow>
          <Eyebrow size={9} letterSpacing={0.18} color="rgba(255,255,255,0.5)">
            {t.hydration.cans}/{t.hydration.goal} CANS · DAY {USER.dayN}
          </Eyebrow>
        </View>
        <View style={{ paddingHorizontal: 22, paddingBottom: 22 }}>
          <View style={{ flexDirection: 'row', gap: 6, marginBottom: 10 }}>
            {Array.from({ length: t.hydration.goal }).map((_, i) => {
              const filled = i < t.hydration.cans;
              return (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    height: 36,
                    backgroundColor: filled ? accent : 'transparent',
                    borderColor: filled ? accent : 'rgba(255,255,255,0.18)',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Eyebrow size={10} letterSpacing={0.16} color={filled ? palette.graphite0 : 'rgba(255,255,255,0.4)'}>
                    {String(i + 1).padStart(2, '0')}
                  </Eyebrow>
                </View>
              );
            })}
          </View>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <Pressable
              onPress={() => nav.navigate('Tabs', { screen: 'Log' })}
              style={{
                flex: 1,
                backgroundColor: accent,
                paddingVertical: 13,
                paddingHorizontal: 14,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: fonts.display, fontSize: 14, color: palette.graphite0 }}>Log a can</Text>
              <Plus size={14} stroke={palette.graphite0} />
            </Pressable>
            <Pressable
              onPress={() => nav.navigate('Scan')}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,0.18)',
                borderWidth: 1,
                paddingVertical: 13,
                paddingHorizontal: 14,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: fonts.display, fontSize: 14, color: palette.text1 }}>Scan can</Text>
              <Scan size={14} stroke={palette.text1} />
            </Pressable>
          </View>
        </View>

        {/* SOURCES FOOTER */}
        <View style={{ paddingHorizontal: 22, paddingTop: 14, paddingBottom: 22, borderTopColor: 'rgba(255,255,255,0.08)', borderTopWidth: 1 }}>
          <Eyebrow size={8.5} color="rgba(255,255,255,0.4)" style={{ marginBottom: 8 }}>
            SIGNALS PIPED FROM
          </Eyebrow>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
            {['WHOOP', 'APPLE HEALTH'].map((s) => (
              <View key={s} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: accent }} />
                <Eyebrow size={9} letterSpacing={0.16} color="rgba(255,255,255,0.65)">
                  {s}
                </Eyebrow>
              </View>
            ))}
            <Pressable onPress={() => nav.navigate('Connect')}>
              <Eyebrow size={9} letterSpacing={0.16} color={accent}>
                + ADD SOURCE
              </Eyebrow>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
