import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconName } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { radius, typography } from '../theme/typography';
import { PressableScale } from './PressableScale';

interface Props {
  label: string;
  onPress: () => void;
  icon?: IconName;
  loading?: boolean;
  variant?: 'solid' | 'soft';
}

export function PrimaryButton({ label, onPress, icon, loading = false, variant = 'solid' }: Props) {
  const { palette } = useTheme();
  const solid = variant === 'solid';
  const fg = solid ? palette.onPrimary : palette.primary;
  return (
    <PressableScale
      onPress={onPress}
      disabled={loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: loading, busy: loading }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        borderRadius: radius.pill,
        backgroundColor: solid ? palette.primary : palette.primarySoft,
        opacity: loading ? 0.8 : 1,
      }}
    >
      {loading ? <ActivityIndicator color={fg} /> : icon ? <Ionicons name={icon} size={18} color={fg} /> : null}
      <Text style={[typography.heading, { color: fg }]}>{label}</Text>
    </PressableScale>
  );
}
