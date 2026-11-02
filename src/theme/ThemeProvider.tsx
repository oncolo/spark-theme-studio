import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { getPreset } from '../constants/presets';
import { loadPrefs, savePrefs, DEFAULT_PREFS } from '../services/storage';
import { Palette, ResolvedMode, StoredPrefs, ThemeMode, ThemePreset } from '../types';
import { buildPalette } from './palette';

interface ThemeContextValue {
  ready: boolean;
  palette: Palette;
  preset: ThemePreset;
  mode: ThemeMode;
  resolvedMode: ResolvedMode;
  isDark: boolean;
  customAccent: string | null;
  setPreset: (id: string) => void;
  setMode: (mode: ThemeMode) => void;
  setCustomAccent: (color: string | null) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [prefs, setPrefs] = useState<StoredPrefs>(DEFAULT_PREFS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadPrefs()
      .then(setPrefs)
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) savePrefs(prefs);
  }, [prefs, ready]);

  const setPreset = useCallback((id: string) => {
    const preset = getPreset(id);
    setPrefs({ presetId: preset.id, mode: preset.defaultMode, customAccent: null });
  }, []);
  const setMode = useCallback((mode: ThemeMode) => setPrefs((p) => ({ ...p, mode })), []);
  const setCustomAccent = useCallback(
    (customAccent: string | null) => setPrefs((p) => ({ ...p, customAccent })),
    [],
  );

  const value = useMemo<ThemeContextValue>(() => {
    const preset = getPreset(prefs.presetId);
    const resolvedMode: ResolvedMode =
      prefs.mode === 'system' ? (system === 'dark' ? 'dark' : 'light') : prefs.mode;
    return {
      ready,
      preset,
      mode: prefs.mode,
      resolvedMode,
      isDark: resolvedMode === 'dark',
      customAccent: prefs.customAccent,
      palette: buildPalette(preset, resolvedMode, prefs.customAccent),
      setPreset,
      setMode,
      setCustomAccent,
    };
  }, [prefs, system, ready, setPreset, setMode, setCustomAccent]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
