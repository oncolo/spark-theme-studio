import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoredPrefs } from '../types';

const KEY = '@spark-theme-studio/prefs/v1';

export const DEFAULT_PREFS: StoredPrefs = {
  presetId: 'midnight-black',
  mode: 'system',
  customAccent: null,
};

export async function loadPrefs(): Promise<StoredPrefs> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...(JSON.parse(raw) as Partial<StoredPrefs>) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export async function savePrefs(prefs: StoredPrefs): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(prefs));
  } catch (e) {
    console.warn('Could not save preferences', e);
  }
}
