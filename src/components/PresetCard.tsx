import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ResolvedMode, ThemePreset } from '../types';
import { buildPalette } from '../theme/palette';
import { useTheme } from '../theme/ThemeProvider';
import { radius, typography } from '../theme/typography';
import { PressableScale } from './PressableScale';

interface Props {
  preset: ThemePreset;
  mode: ResolvedMode;
  active: boolean;
  onPress: () => void;
}

export function PresetCard({ preset, mode, active, onPress }: Props) {
  const { palette } = useTheme();
  const p = buildPalette(preset, mode, null);
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${preset.name} preset${active ? ', selected' : ''}`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        padding: 14,
        borderRadius: radius.lg,
        backgroundColor: palette.surface,
        borderWidth: 2,
        borderColor: active ? palette.primary : palette.border,
      }}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: radius.md,
          backgroundColor: p.background,
          borderWidth: 1,
          borderColor: p.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name={preset.icon} size={24} color={p.primary} />
      </View>
      <View style={{ flex: 1, gap: 6 }}>
        <Text style={[typography.heading, { color: palette.text }]}>{preset.name}</Text>
        <Text style={[typography.caption, { color: palette.textSecondary }]}>{preset.tagline}</Text>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {[p.background, p.surface, p.primary].map((c, i) => (
            <View key={i} style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: c, borderWidth: 1, borderColor: palette.border }} />
          ))}
        </View>
      </View>
      {active ? <Ionicons name="checkmark-circle" size={24} color={palette.primary} /> : null}
    </PressableScale>
  );
}
