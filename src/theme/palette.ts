import { Palette, ResolvedMode, ThemePreset } from '../types';
import { mix, readableOn, withAlpha } from './colors';

export function buildPalette(
  preset: ThemePreset,
  mode: ResolvedMode,
  accentOverride: string | null,
): Palette {
  const dark = mode === 'dark';
  const base = dark ? preset.dark : preset.light;
  const primary = accentOverride ?? (dark ? preset.primary.dark : preset.primary.light);
  const text = dark ? '#F5F7FA' : '#10131A';
  return {
    background: base.background,
    surface: base.surface,
    surfaceAlt: mix(base.surface, text, 0.07),
    text,
    textSecondary: dark ? '#9AA3B2' : '#5B6475',
    border: mix(base.surface, text, 0.12),
    primary,
    primarySoft: withAlpha(primary, dark ? 0.2 : 0.14),
    onPrimary: readableOn(primary),
    success: '#2FBF71',
    danger: '#E5484D',
  };
}
