import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type { WallpaperTarget, DeviceCapabilities } from '../../modules/system-customizer';

export type IconName = ComponentProps<typeof Ionicons>['name'];
export type ThemeMode = 'system' | 'light' | 'dark';
export type ResolvedMode = 'light' | 'dark';

export interface Palette {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primarySoft: string;
  onPrimary: string;
  success: string;
  danger: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  tagline: string;
  icon: IconName;
  primary: { light: string; dark: string };
  defaultMode: ResolvedMode;
  dark: { background: string; surface: string };
  light: { background: string; surface: string };
  wallpaperId: string;
}

export interface WallpaperItem {
  id: string;
  name: string;
  colors: string[];
  /** CSS-like angle: 0 = to top, 180 = to bottom. */
  angle: number;
}

export interface StoredPrefs {
  presetId: string;
  mode: ThemeMode;
  customAccent: string | null;
}

export type SettingStatus = 'direct' | 'nearest' | 'unavailable';

export interface SettingShortcut {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
  action: string;
  fallbackAction?: string;
  /** true = this intent opens exactly the screen named in the title. */
  exact: boolean;
  note?: string;
}

export interface ActionResult {
  ok: boolean;
  message: string;
}
