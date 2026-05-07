import { View } from 'react-native';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
}

export function Card({ children, className = '', elevated = false }: CardProps) {
  return (
    <View
      className={`rounded-lg border border-border p-4 ${
        elevated ? 'bg-surface2' : 'bg-surface'
      } ${className}`}
    >
      {children}
    </View>
  );
}
