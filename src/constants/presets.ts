import { ThemePreset } from '../types';

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'midnight-black',
    name: 'Midnight Black',
    tagline: 'Deep black, high contrast',
    icon: 'moon',
    primary: { light: '#2F5BFF', dark: '#7C9CFF' },
    defaultMode: 'dark',
    dark: { background: '#000000', surface: '#121216' },
    light: { background: '#F2F3F7', surface: '#FFFFFF' },
    wallpaperId: 'midnight',
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    tagline: 'Calm, natural and fresh',
    icon: 'leaf',
    primary: { light: '#128A4F', dark: '#3DDC84' },
    defaultMode: 'dark',
    dark: { background: '#07140D', surface: '#10261A' },
    light: { background: '#EDF6F0', surface: '#FFFFFF' },
    wallpaperId: 'forest',
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    tagline: 'Cool depth, crisp accents',
    icon: 'water',
    primary: { light: '#0A7AD1', dark: '#2EA8FF' },
    defaultMode: 'dark',
    dark: { background: '#06121F', surface: '#0E2338' },
    light: { background: '#EAF4FB', surface: '#FFFFFF' },
    wallpaperId: 'ocean',
  },
  {
    id: 'purple-night',
    name: 'Purple Night',
    tagline: 'Rich violet after dark',
    icon: 'sparkles',
    primary: { light: '#7A3CE0', dark: '#B388FF' },
    defaultMode: 'dark',
    dark: { background: '#0E0A1A', surface: '#1A1431' },
    light: { background: '#F3EEFB', surface: '#FFFFFF' },
    wallpaperId: 'purple',
  },
  {
    id: 'minimal-white',
    name: 'Minimal White',
    tagline: 'Clean, quiet and bright',
    icon: 'sunny',
    primary: { light: '#1F2937', dark: '#E5E7EB' },
    defaultMode: 'light',
    dark: { background: '#0D0D0F', surface: '#18181B' },
    light: { background: '#F7F7F8', surface: '#FFFFFF' },
    wallpaperId: 'minimal',
  },
];

export const getPreset = (id: string): ThemePreset =>
  THEME_PRESETS.find((p) => p.id === id) ?? THEME_PRESETS[0];

export const ACCENT_COLORS: string[] = [
  '#7C9CFF', '#2EA8FF', '#22D3EE', '#3DDC84',
  '#FFC83D', '#FF7A45', '#FF5C8A', '#B388FF',
];
