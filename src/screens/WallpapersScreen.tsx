import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Card } from '../components/Card';
import { FadeIn } from '../components/FadeIn';
import { InfoNotice } from '../components/InfoNotice';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { SegmentedControl } from '../components/SegmentedControl';
import { WallpaperCard } from '../components/WallpaperCard';
import { getWallpaper, WALLPAPERS } from '../constants/wallpapers';
import { notify } from '../services/feedback';
import { applyGradientWallpaper, applyPhotoWallpaper, pickPhoto } from '../services/wallpaper';
import { useTheme } from '../theme/ThemeProvider';
import { typography } from '../theme/typography';
import { WallpaperTarget } from '../types';

type Selection = { kind: 'gradient'; id: string } | { kind: 'photo' };

export function WallpapersScreen() {
  const { palette } = useTheme();
  const [target, setTarget] = useState<WallpaperTarget>('both');
  const [selection, setSelection] = useState<Selection>({ kind: 'gradient', id: WALLPAPERS[0].id });
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onPick = async () => {
    const res = await pickPhoto();
    if (res.error) notify(res.error);
    if (res.uri) {
      setPhotoUri(res.uri);
      setSelection({ kind: 'photo' });
    }
  };

  const onApply = async () => {
    setBusy(true);
    const res =
      selection.kind === 'photo' && photoUri
        ? await applyPhotoWallpaper(photoUri, target)
        : await applyGradientWallpaper(
            getWallpaper(selection.kind === 'gradient' ? selection.id : WALLPAPERS[0].id),
            target,
          );
    setBusy(false);
    notify(res.message);
  };

  return (
    <Screen title="Wallpapers" subtitle="Applied with Android's WallpaperManager. No storage permission needed.">
      <FadeIn>
        <Card style={{ gap: 12 }}>
          <SectionHeader title="Apply to" />
          <SegmentedControl<WallpaperTarget>
            value={target}
            onChange={setTarget}
            options={[
              { value: 'home', label: 'Home', icon: 'home-outline' },
              { value: 'lock', label: 'Lock', icon: 'lock-closed-outline' },
              { value: 'both', label: 'Both', icon: 'layers-outline' },
            ]}
          />
        </Card>
      </FadeIn>

      <FadeIn delay={80} style={{ gap: 12 }}>
        <SectionHeader title="Gallery" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' }}>
          {photoUri && (
            <WallpaperCard
              name="Your photo"
              imageUri={photoUri}
              selected={selection.kind === 'photo'}
              onPress={() => setSelection({ kind: 'photo' })}
            />
          )}
          {WALLPAPERS.map((w) => (
            <WallpaperCard
              key={w.id}
              name={w.name}
              colors={w.colors}
              angle={w.angle}
              selected={selection.kind === 'gradient' && selection.id === w.id}
              onPress={() => setSelection({ kind: 'gradient', id: w.id })}
            />
          ))}
        </View>
      </FadeIn>

      <View style={{ gap: 10 }}>
        <PrimaryButton icon="checkmark-circle" label="Set as wallpaper" loading={busy} onPress={onApply} />
        <PrimaryButton variant="soft" icon="images" label="Choose a photo" onPress={onPick} />
      </View>

      <InfoNotice
        message="Gradients are rendered at your screen resolution. Photos are center-cropped to fit. Some launchers may re-crop the lock screen."
      />
      <Text style={[typography.caption, { color: palette.textSecondary, textAlign: 'center' }]}>
        Wallpaper changes use only the normal SET_WALLPAPER permission.
      </Text>
    </Screen>
  );
}
