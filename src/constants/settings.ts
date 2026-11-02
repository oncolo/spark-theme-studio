import { SettingShortcut } from '../types';

const DISPLAY = 'android.settings.DISPLAY_SETTINGS';

export const SETTING_SHORTCUTS: SettingShortcut[] = [
  {
    id: 'display',
    title: 'Display settings',
    subtitle: 'Brightness, font size, sleep, dark theme',
    icon: 'phone-portrait-outline',
    action: DISPLAY,
    exact: true,
  },
  {
    id: 'wallpaper',
    title: 'System wallpaper picker',
    subtitle: 'Choose a wallpaper with the system picker',
    icon: 'image-outline',
    action: 'android.intent.action.SET_WALLPAPER',
    exact: true,
  },
  {
    id: 'dark',
    title: 'Dark theme',
    subtitle: 'Opens Display settings — look for the dark theme switch',
    icon: 'moon-outline',
    action: DISPLAY,
    exact: false,
    note: 'No public screen exists for dark theme only. Opened Display settings.',
  },
  {
    id: 'brightness',
    title: 'Brightness',
    subtitle: 'Opens Display settings (or use quick settings)',
    icon: 'sunny-outline',
    action: DISPLAY,
    exact: false,
    note: 'No public brightness screen exists. Opened Display settings.',
  },
  {
    id: 'night',
    title: 'Night light',
    subtitle: 'Warm screen tint for evenings',
    icon: 'bed-outline',
    action: 'android.settings.NIGHT_DISPLAY_SETTINGS',
    fallbackAction: DISPLAY,
    exact: true,
  },
  {
    id: 'font',
    title: 'Font & display size',
    subtitle: 'Opens Accessibility settings',
    icon: 'text-outline',
    action: 'android.settings.ACCESSIBILITY_SETTINGS',
    exact: false,
    note: 'Opened Accessibility settings, where text size options live.',
  },
  {
    id: 'sound',
    title: 'Sound & ringtone',
    subtitle: 'Ringtones and notification sounds',
    icon: 'musical-notes-outline',
    action: 'android.settings.SOUND_SETTINGS',
    exact: true,
  },
  {
    id: 'home',
    title: 'Default home app',
    subtitle: 'Switch launcher to change icons and layout',
    icon: 'home-outline',
    action: 'android.settings.HOME_SETTINGS',
    exact: true,
  },
];
