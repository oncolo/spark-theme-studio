import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { ColorSwatchRow } from '../components/ColorSwatchRow';
import { FadeIn } from '../components/FadeIn';
import { PresetCard } from '../components/PresetCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { ThemePreview } from '../components/ThemePreview';
import { ACCENT_COLORS, THEME_PRESETS } from '../constants/presets';
import { getWallpaper } from '../constants/wallpapers';
import { notify } from '../services/feedback';
import { applyGradientWallpaper } from '../services/wallpaper';
import { useTheme } from '../theme/ThemeProvider';
import { typography } from '../theme/typography';

export function ThemesScreen() {
  const { palette, preset, resolvedMode, customAccent, setPreset, setCustomAccent } = useTheme();
  const [busy, setBusy] = useState(false);

  const applyMatchingWallpaper = () => {
    const wp = getWallpaper(preset.wallpaperId);
    Alert.alert(
      'Set matching wallpaper?',
      `“${wp.name}” will replace your current home and lock screen wallpaper.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Apply',
          onPress: async () => {
            setBusy(true);
            const res = await applyGradientWallpaper(wp, 'both');
            setBusy(false);
            notify(res.message);
          },
        },
      ],
    );
  };

  return (
    <Screen title="Themes" subtitle="Presets restyle this app. Pair them with a matching wallpaper.">
      <FadeIn>
        <View style={{ gap: 12 }}>
          {THEME_PRESETS.map((p) => (
            <PresetCard
              key={p.id}
              preset={p}
              mode={p.id === preset.id ? resolvedMode : p.defaultMode}
              active={p.id === preset.id}
              onPress={() => setPreset(p.id)}
            />
          ))}
        </View>
      </FadeIn>

      <FadeIn delay={100}>
        <Card style={{ gap: 14 }}>
          <SectionHeader title="Accent color" />
          <ColorSwatchRow colors={ACCENT_COLORS} value={customAccent} onChange={setCustomAccent} />
          <PrimaryButton
            variant="soft"
            icon="refresh"
            label="Use preset default"
            onPress={() => setCustomAccent(null)}
          />
        </Card>
      </FadeIn>

      <FadeIn delay={180}>
        <Card style={{ gap: 14 }}>
          <SectionHeader title="Live preview" />
          <ThemePreview palette={palette} />
          <Text style={[typography.caption, { color: palette.textSecondary }]}>
            Applies to this app only. HiOS keeps its own system theme.
          </Text>
          <PrimaryButton
            icon="image"
            label="Set matching wallpaper"
            loading={busy}
            onPress={applyMatchingWallpaper}
          />
        </Card>
      </FadeIn>
    </Screen>
  );
}
