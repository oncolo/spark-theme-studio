import React from 'react';
import { Image, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { angleToPoints } from '../constants/wallpapers';
import { useTheme } from '../theme/ThemeProvider';
import { radius, typography } from '../theme/typography';
import { PressableScale } from './PressableScale';

interface Props {
  name: string;
  colors?: string[];
  angle?: number;
  imageUri?: string;
  selected: boolean;
  onPress: () => void;
}

export function WallpaperCard({ name, colors, angle = 160, imageUri, selected, onPress }: Props) {
  const { palette } = useTheme();
  const { start, end } = angleToPoints(angle);
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${name} wallpaper${selected ? ', selected' : ''}`}
      style={{
        width: '48%',
        aspectRatio: 0.62,
        borderRadius: radius.lg,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: selected ? palette.primary : palette.border,
      }}
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ flex: 1 }} resizeMode="cover" />
      ) : (
        <LinearGradient
          colors={(colors ?? ['#000', '#222']) as [string, string, ...string[]]}
          start={start}
          end={end}
          style={{ flex: 1 }}
        />
      )}
      <View
        style={{
          position: 'absolute',
          left: 8,
          right: 8,
          bottom: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(0,0,0,0.45)',
          borderRadius: radius.pill,
          paddingHorizontal: 10,
          paddingVertical: 6,
        }}
      >
        <Text style={[typography.caption, { color: '#fff', fontWeight: '700' }]}>{name}</Text>
        {selected ? <Ionicons name="checkmark-circle" size={16} color="#fff" /> : null}
      </View>
    </PressableScale>
  );
}
