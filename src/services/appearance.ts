import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { Palette } from '../types';

/** Colors this app's own navigation bar. It cannot change the system-wide bar. */
export async function applyNavigationBar(palette: Palette, isDark: boolean): Promise<void> {
  if (Platform.OS !== 'android') return;
  try {
    await NavigationBar.setBackgroundColorAsync(palette.surface);
    await NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
  } catch (e) {
    console.warn('Navigation bar styling not supported here', e);
  }
}
