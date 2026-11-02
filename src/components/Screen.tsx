import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { typography } from '../theme/typography';

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Screen({ title, subtitle, children }: Props) {
  const { palette } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }} edges={['top']}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 32, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 4 }}>
          <Text style={[typography.display, { color: palette.text }]}>{title}</Text>
          {subtitle ? (
            <Text style={[typography.body, { color: palette.textSecondary }]}>{subtitle}</Text>
          ) : null}
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
