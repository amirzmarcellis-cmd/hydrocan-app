import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '@/components/Screen';
import { Display } from '@/components/Display';
import { palette, fonts } from '@/theme/tokens';
import { useOnboarding } from '@/stores/onboarding';
import { useSettings } from '@/stores/settings';
import { OBHeader } from './OBHeader';
import { Button } from '@/components/Button';
import type { RootStackParamList } from '@/navigation/types';

const SEX = ['Male', 'Female', 'Other'] as const;

export function OnboardingNameScreen() {
  const ob = useOnboarding();
  const accent = useSettings((s) => s.accent);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const setField = (k: keyof typeof ob, v: string) => ob.set({ [k]: v });

  return (
    <Screen>
      <OBHeader step={0} />
      <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 28, paddingBottom: 22 }}>
        <Display size={30} style={{ marginBottom: 30 }}>
          A few details so we can read your numbers correctly.
        </Display>

        <Field label="NAME">
          <Input value={ob.name} onChangeText={(v) => setField('name', v)} placeholder="Marcus Kane" />
        </Field>
        <Field label="DATE OF BIRTH">
          <Input value={ob.dob} onChangeText={(v) => setField('dob', v)} placeholder="14 / 03 / 1991" />
        </Field>
        <Field label="SEX (FOR HRV/RHR NORMS)">
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {SEX.map((s) => {
              const active = ob.sex === s;
              return (
                <Pressable
                  key={s}
                  onPress={() => ob.set({ sex: s })}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    backgroundColor: active ? accent : 'transparent',
                    borderColor: active ? accent : 'rgba(255,255,255,0.15)',
                    borderWidth: 1,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 9.5,
                      letterSpacing: 9.5 * 0.18,
                      color: active ? palette.graphite0 : 'rgba(255,255,255,0.7)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {s}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Field>
        <View style={{ flex: 1 }} />
        <Button
          label="Continue"
          rightArrow
          block
          accent={accent}
          onPress={() => nav.navigate('OnboardingCustomer')}
        />
      </View>
    </Screen>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text
        style={{
          fontFamily: fonts.mono,
          fontSize: 9,
          letterSpacing: 9 * 0.22,
          color: 'rgba(255,255,255,0.55)',
          marginBottom: 8,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
      {children}
    </View>
  );
}

function Input(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      placeholderTextColor="rgba(255,255,255,0.3)"
      {...props}
      style={[
        {
          width: '100%',
          backgroundColor: 'transparent',
          borderBottomColor: 'rgba(255,255,255,0.2)',
          borderBottomWidth: 1,
          paddingVertical: 10,
          fontFamily: fonts.display,
          fontSize: 22,
          color: palette.text1,
        },
        props.style,
      ]}
    />
  );
}
