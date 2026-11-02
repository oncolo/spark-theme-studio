import * as ImagePicker from 'expo-image-picker';
import native from '../../modules/system-customizer';
import { ActionResult, WallpaperItem, WallpaperTarget } from '../types';

const TARGET_LABEL: Record<WallpaperTarget, string> = {
  home: 'home screen',
  lock: 'lock screen',
  both: 'home and lock screens',
};

const NO_NATIVE: ActionResult = {
  ok: false,
  message: 'Native module missing. Run the development build, not Expo Go.',
};

function explain(e: unknown): string {
  const code = (e as { code?: string })?.code;
  const message = (e as Error)?.message ?? 'Unknown error';
  if (code === 'ERR_WALLPAPER_UNAVAILABLE') return 'This device does not allow apps to change the wallpaper.';
  if (code === 'ERR_IMAGE_DECODE') return 'The selected image could not be read.';
  return `Could not set wallpaper: ${message}`;
}

export async function applyGradientWallpaper(
  item: WallpaperItem,
  target: WallpaperTarget,
): Promise<ActionResult> {
  if (!native) return NO_NATIVE;
  try {
    await native.setGradientWallpaper(item.colors, item.angle, target);
    return { ok: true, message: `“${item.name}” set on ${TARGET_LABEL[target]}.` };
  } catch (e) {
    return { ok: false, message: explain(e) };
  }
}

export async function applyPhotoWallpaper(uri: string, target: WallpaperTarget): Promise<ActionResult> {
  if (!native) return NO_NATIVE;
  try {
    await native.setWallpaperFromUri(uri, target);
    return { ok: true, message: `Photo set on ${TARGET_LABEL[target]}.` };
  } catch (e) {
    return { ok: false, message: explain(e) };
  }
}

/** Uses the system photo picker; no storage permission is requested. */
export async function pickPhoto(): Promise<{ uri: string | null; error?: string }> {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: false, quality: 1 });
    if (result.canceled || !result.assets?.[0]) return { uri: null };
    return { uri: result.assets[0].uri };
  } catch (e) {
    return { uri: null, error: `Could not open the photo picker: ${(e as Error).message}` };
  }
}
