import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SettingShortcut, SettingStatus } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { radius, typography } from '../theme/typography';
import { PressableScale } from './PressableScale';

const BADGE: Record<SettingStatus, string> = {
  direct: 'Direct',
  nearest: 'Nearest screen',
  unavailable: 'Unavailable',
};

interface Props {
  shortcut: SettingShortcut;
  status: SettingStatus;
  onPress: () => void;
}

export function SettingRow({ shortcut, status, onPress }: Props) {
  const { palette } = useTheme();
  const unavailable = status === 'unavailable';
  const badgeColor = unavailable ? palette.danger : status === 'direct' ? palette.success : palette.textSecondary;
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${shortcut.title}. ${BADGE[status]}`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        padding: 14,
        borderRadius: radius.lg,
        backgroundColor: palette.surface,
        borderWidth: 1,
        borderColor: palette.border,
        opacity: unavailable ? 0.6 : 1,
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: palette.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name={shortcut.icon} size={22} color={palette.primary} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[typography.heading, { color: palette.text }]}>{shortcut.title}</Text>
        <Text style={[typography.caption, { color: palette.textSecondary }]}>{shortcut.subtitle}</Text>
        <Text style={[typography.caption, { color: badgeColor, fontWeight: '700' }]}>{BADGE[status]}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={palette.textSecondary} />
    </PressableScale>
  );
}
