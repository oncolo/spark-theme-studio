import React from 'react';
import { Text, View } from 'react-native';
import { Palette } from '../types';
import { radius, typography } from '../theme/typography';

/** A miniature of this app's UI rendered with the given palette. */
export function ThemePreview({ palette, compact = false }: { palette: Palette; compact?: boolean }) {
  const bar = (w: number | `${number}%`, color: string) => (
    <View style={{ height: 5, width: w, borderRadius: 3, backgroundColor: color }} />
  );
  return (
    <View
      style={{
        borderRadius: radius.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: palette.border,
        backgroundColor: palette.background,
        aspectRatio: compact ? 1.15 : 0.9,
      }}
    >
      <View style={{ height: 10, backgroundColor: palette.background }} />
      <View style={{ flex: 1, padding: 12, gap: 10 }}>
        <Text style={[typography.heading, { color: palette.text, fontSize: compact ? 13 : 16 }]}>Preview</Text>
        <View style={{ backgroundColor: palette.surface, borderRadius: radius.md, padding: 10, gap: 6, borderWidth: 1, borderColor: palette.border }}>
          {bar('70%', palette.text)}
          {bar('45%', palette.textSecondary)}
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1, height: 26, borderRadius: radius.pill, backgroundColor: palette.primary }} />
          <View style={{ flex: 1, height: 26, borderRadius: radius.pill, backgroundColor: palette.primarySoft }} />
        </View>
        {!compact && (
          <View style={{ backgroundColor: palette.surfaceAlt, borderRadius: radius.md, padding: 10, gap: 6 }}>
            {bar('55%', palette.text)}
            {bar('80%', palette.textSecondary)}
          </View>
        )}
      </View>
      <View style={{ height: 22, backgroundColor: palette.surface, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 22 }}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: palette.textSecondary }} />
        ))}
      </View>
    </View>
  );
}
