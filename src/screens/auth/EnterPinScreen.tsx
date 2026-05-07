import { View, Text, Alert } from 'react-native';
import { useState } from 'react';
import { Screen } from '@/components/Screen';
import { PinPad } from '@/components/PinPad';
import { Button } from '@/components/Button';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';

export function EnterPinScreen() {
  const [pin, setPin] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const setPinUnlocked = useAuthStore((s) => s.setPinUnlocked);
  const signOut = useAuthStore((s) => s.signOut);

  const verify = async (entered: string) => {
    setVerifying(true);
    try {
      const { data, error } = await supabase.rpc('verify_pin', { pin_code: entered });
      if (error) throw error;
      if (data === true) {
        setPinUnlocked(true);
      } else {
        setAttempts((a) => a + 1);
        Alert.alert('Incorrect PIN', `${5 - attempts - 1} attempts remaining`);
        setPin('');
      }
    } catch (e: any) {
      Alert.alert('Could not verify', e.message ?? String(e));
      setPin('');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Screen className="px-6">
      <View className="mt-12 items-center">
        <Text className="mb-2 text-2xl font-bold text-text">Welcome back</Text>
        <Text className="mb-10 text-center text-sm text-text-dim">
          Enter your 6-digit PIN to unlock
        </Text>
        <PinPad pin={pin} setPin={setPin} length={6} onComplete={verify} />
        {verifying ? <Text className="mt-6 text-text-dim">Verifying…</Text> : null}
        <Button label="Sign out instead" onPress={signOut} variant="ghost" className="mt-8" />
      </View>
    </Screen>
  );
}
