import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { FadeIn } from '../components/FadeIn';
import { InfoNotice } from '../components/InfoNotice';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { SegmentedControl } from '../components/SegmentedControl';
import { ThemePreview } from '../components/ThemePreview';
import { getDeviceCapabilities, isNativeAvailable } from '../services/device';
import { useTheme } from '../theme/ThemeProvider';
import { typography } from '../theme/typography';
import { ThemeMode } from '../types';

const CAN = [
  'Apply gradient or photo wallpapers to home and lock screens',
  'Theme this app, including its status and navigation bars',
  'Follow the system dark mode inside this app',
  'Open system Display, Sound, Accessibility and launcher screens',
];
const CANNOT = [
  'Change the HiOS system theme, icon packs or fonts',
  'Switch system-wide dark mode or the system accent color',
  'Restyle other apps or the system status bar',
];

export function DashboardScreen() {
  const { palette, preset, mode, setMode } = useTheme();
  const caps = useMemo(() => getDeviceCapabilities(), []);
  const expected = caps ? caps.sdkInt === 29 : true;

  const row = (text: string, ok: boolean, i: number) => (
    <View key={i} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
      <Ionicons
        name={ok ? 'checkmark-circle' : 'close-circle'}
        size={18}
        color={ok ? palette.success : palette.danger}
        style={{ marginTop: 1 }}
      />
      <Text style={[typography.body, { color: palette.text, flex: 1 }]}>{text}</Text>
    </View>
  );

  return (
    <Screen title="Spark Theme Studio" subtitle="Personalize your TECNO within what Android 10 allows.">
      <FadeIn>
        <Card style={{ gap: 14 }}>
          <SectionHeader title={`Active theme · ${preset.name}`} />
          <ThemePreview palette={palette} />
          <SegmentedControl<ThemeMode>
            value={mode}
            onChange={setMode}
            options={[
              { value: 'system', label: 'System', icon: 'phone-portrait-outline' },
              { value: 'light', label: 'Light', icon: 'sunny-outline' },
              { value: 'dark', label: 'Dark', icon: 'moon-outline' },
            ]}
          />
        </Card>
      </FadeIn>

      {!isNativeAvailable && (
        <InfoNotice
          tone="warning"
          title="Native module not loaded"
          message="Wallpaper and settings shortcuts need the development build or APK. Expo Go cannot load them."
        />
      )}

      <FadeIn delay={80}>
        <Card style={{ gap: 10 }}>
          <SectionHeader title="This device" />
          {caps ? (
            <>
              <Text style={[typography.heading, { color: palette.text }]}>
                {caps.manufacturer} {caps.model}
              </Text>
              <Text style={[typography.body, { color: palette.textSecondary }]}>
                Android {caps.androidVersion} (API {caps.sdkInt})
              </Text>
              {row(`Wallpaper API supported: ${caps.wallpaperSupported ? 'yes' : 'no'}`, caps.wallpaperSupported, 1)}
              {row(`Apps may set wallpaper: ${caps.wallpaperSetAllowed ? 'yes' : 'no'}`, caps.wallpaperSetAllowed, 2)}
            </>
          ) : (
            <Text style={[typography.body, { color: palette.textSecondary }]}>Device details unavailable.</Text>
          )}
          {!expected && (
            <InfoNotice
              tone="warning"
              message="This app targets Android 10 (API 29). Behavior on other versions may differ."
            />
          )}
        </Card>
      </FadeIn>

      <FadeIn delay={160}>
        <Card style={{ gap: 12 }}>
          <SectionHeader title="What this app can do" />
          {CAN.map((t, i) => row(t, true, i))}
        </Card>
      </FadeIn>

      <FadeIn delay={240}>
        <Card style={{ gap: 12 }}>
          <SectionHeader title="What needs root or OEM access" />
          {CANNOT.map((t, i) => row(t, false, i))}
          <Text style={[typography.caption, { color: palette.textSecondary }]}>
            Changing the app theme never changes the HiOS system theme. Use the System tab to reach the
            system's own settings.
          </Text>
        </Card>
      </FadeIn>
    </Screen>
  );
}
