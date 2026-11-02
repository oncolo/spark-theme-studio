import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { radius, typography } from '../theme/typography';
import { withAlpha } from '../theme/colors';

interface Props {
  title?: string;
  message: string;
  tone?: 'info' | 'warning';
}

export function InfoNotice({ title, message, tone = 'info' }: Props) {
  const { palette } = useTheme();
  const color = tone === 'warning' ? '#F5A524' : palette.primary;
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 12,
        padding: 14,
        borderRadius: radius.md,
        backgroundColor: withAlpha(color, 0.12),
        borderWidth: 1,
        borderColor: withAlpha(color, 0.35),
      }}
    >
      <Ionicons name={tone === 'warning' ? 'warning-outline' : 'information-circle-outline'} size={22} color={color} />
      <View style={{ flex: 1, gap: 2 }}>
        {title ? <Text style={[typography.heading, { color: palette.text }]}>{title}</Text> : null}
        <Text style={[typography.body, { color: palette.textSecondary }]}>{message}</Text>
      </View>
    </View>
  );
}
