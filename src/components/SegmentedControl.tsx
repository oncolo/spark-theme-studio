import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconName } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { radius, typography } from '../theme/typography';
import { PressableScale } from './PressableScale';

interface Option<T extends string> {
  value: T;
  label: string;
  icon?: IconName;
}

interface Props<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: Props<T>) {
  const { palette } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: palette.surfaceAlt,
        borderRadius: radius.pill,
        padding: 4,
        gap: 4,
      }}
    >
      {options.map((o) => {
        const active = o.value === value;
        const color = active ? palette.onPrimary : palette.textSecondary;
        return (
          <PressableScale
            key={o.value}
            onPress={() => onChange(o.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              paddingVertical: 10,
              borderRadius: radius.pill,
              backgroundColor: active ? palette.primary : 'transparent',
            }}
          >
            {o.icon ? <Ionicons name={o.icon} size={16} color={color} /> : null}
            <Text style={[typography.caption, { color, fontWeight: '700' }]}>{o.label}</Text>
          </PressableScale>
        );
      })}
    </View>
  );
}
