import { View, Text, Alert } from 'react-native';
import { useState } from 'react';
import { Screen } from '@/components/Screen';
import { PinPad } from '@/components/PinPad';
import { Button } from '@/components/Button';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';

interface Props {
  onDone: () => void;
}

export function SetupPinScreen({ onDone }: Props) {
  const [step, setStep] = useState<'create' | 'confirm'>('create');
  const [first, setFirst] = useState('');
  const [pin, setPin] = useState('');
  const [saving, setSaving] = useState(false);
  const setPinUnlocked = useAuthStore((s) => s.setPinUnlocked);

  const reset = () => {
    setFirst('');
    setPin('');
    setStep('create');
  };

  const handleComplete = async (entered: string) => {
    if (step === 'create') {
      setFirst(entered);
      setPin('');
      setStep('confirm');
      return;
    }
    if (entered !== first) {
      Alert.alert('PINs do not match', 'Please try again.');
      reset();
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.rpc('set_pin', { pin_code: entered });
      if (error) throw error;
      setPinUnlocked(true);
      onDone();
    } catch (e: any) {
      Alert.alert('Could not set PIN', e.message ?? String(e));
      reset();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen className="px-6">
      <View className="mt-12 items-center">
        <Text className="mb-2 text-2xl font-bold text-text">
          {step === 'create' ? 'Create a PIN' : 'Confirm your PIN'}
        </Text>
        <Text className="mb-10 text-center text-sm text-text-dim">
          {step === 'create'
            ? 'A 6-digit PIN protects your daily metrics.'
            : 'Enter the same PIN once more.'}
        </Text>
        <PinPad pin={pin} setPin={setPin} length={6} onComplete={handleComplete} />
        {saving ? <Text className="mt-6 text-text-dim">Saving…</Text> : null}
        {step === 'confirm' ? (
          <Button label="Start over" onPress={reset} variant="ghost" className="mt-6" />
        ) : null}
      </View>
    </Screen>
  );
}
