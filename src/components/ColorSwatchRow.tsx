import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { readableOn } from '../theme/colors';
import { useTheme } from '../theme/ThemeProvider';
import { PressableScale } from './PressableScale';

interface Props {
  colors: string[];
  value: string | null;
  onChange: (color: string) => void;
}

export function ColorSwatchRow({ colors, value, onChange }: Props) {
  const { palette } = useTheme();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      {colors.map((c) => {
        const active = c.toLowerCase() === value?.toLowerCase();
        return (
          <PressableScale
            key={c}
            onPress={() => onChange(c)}
            accessibilityRole="button"
            accessibilityLabel={`Accent color ${c}`}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: c,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 3,
              borderColor: active ? palette.text : 'transparent',
            }}
          >
            {active ? <Ionicons name="checkmark" size={20} color={readableOn(c)} /> : null}
          </PressableScale>
        );
      })}
    </View>
  );
}
