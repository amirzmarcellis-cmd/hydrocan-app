import { Pressable, Text, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-h2-500 active:bg-h2-600',
  secondary: 'bg-surface2 border border-border active:bg-border',
  ghost: 'bg-transparent active:bg-surface2',
};

const variantText: Record<Variant, string> = {
  primary: 'text-bg font-semibold',
  secondary: 'text-text font-semibold',
  ghost: 'text-h2-300 font-medium',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-10 px-4 rounded-md',
  md: 'h-12 px-5 rounded-lg',
  lg: 'h-14 px-6 rounded-lg',
};

const sizeText: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
}: ButtonProps) {
  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center ${variantStyles[variant]} ${sizeStyles[size]} ${
        disabled ? 'opacity-50' : ''
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#05080F' : '#F5F8FF'} />
      ) : (
        <Text className={`${variantText[variant]} ${sizeText[size]}`}>{label}</Text>
      )}
    </Pressable>
  );
}
