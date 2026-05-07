import { View, Text } from 'react-native';

interface TagProps {
  label: string;
  active?: boolean;
  className?: string;
}

export function Tag({ label, active = false, className = '' }: TagProps) {
  return (
    <View
      className={`self-start rounded-pill px-3 py-1 ${
        active ? 'bg-h2-500/20 border border-h2-500' : 'bg-surface2 border border-border'
      } ${className}`}
    >
      <Text className={`text-xs ${active ? 'text-h2-300' : 'text-text-dim'}`}>{label}</Text>
    </View>
  );
}
