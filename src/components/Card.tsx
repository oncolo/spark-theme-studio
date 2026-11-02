import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { radius } from '../theme/typography';

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const { palette } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: palette.surface,
          borderColor: palette.border,
          borderWidth: 1,
          borderRadius: radius.lg,
          padding: 16,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
