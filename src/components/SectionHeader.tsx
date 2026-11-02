import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { typography } from '../theme/typography';

export function SectionHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  const { palette } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={[typography.label, { color: palette.textSecondary }]}>{title}</Text>
      {right}
    </View>
  );
}
