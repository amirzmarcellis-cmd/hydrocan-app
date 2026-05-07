import { View, Text, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { supabase } from '@/lib/supabase';

export function SignInScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendMagicLink = async () => {
    if (!email.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: 'hydrocan://auth/callback' },
      });
      if (error) throw error;
      setSent(true);
    } catch (e: any) {
      Alert.alert('Could not send link', e.message ?? String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen className="px-6">
      <LinearGradient
        colors={['#03045E', '#05080F']}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View className="flex-1 items-center justify-center">
        <View className="mb-12 items-center">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-pill bg-h2-500/20">
            <Text className="text-4xl">💧</Text>
          </View>
          <Text className="mb-2 text-3xl font-bold text-text">HydroCan</Text>
          <Text className="text-center text-base text-text-dim">
            Hydrogen Effect — track your H₂ Index™
          </Text>
        </View>

        {sent ? (
          <View className="w-full rounded-lg border border-h2-500 bg-h2-500/10 p-5">
            <Text className="mb-1 text-base font-semibold text-h2-300">Check your email</Text>
            <Text className="text-sm text-text-dim">
              We sent a magic link to {email}. Tap it to sign in.
            </Text>
          </View>
        ) : (
          <>
            <View className="mb-4 w-full">
              <Text className="mb-2 text-sm text-text-dim">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#8A97B5"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                className="h-14 rounded-lg border border-border bg-surface px-4 text-base text-text"
              />
            </View>
            <Button
              label="Send magic link"
              onPress={sendMagicLink}
              loading={loading}
              size="lg"
              className="w-full"
            />
            <Text className="mt-6 text-center text-xs text-text-dim">
              By continuing you agree to our Terms & Privacy Policy
            </Text>
          </>
        )}
      </View>
    </Screen>
  );
}
