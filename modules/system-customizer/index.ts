import { requireNativeModule } from 'expo';

export type WallpaperTarget = 'home' | 'lock' | 'both';

export interface DeviceCapabilities {
  sdkInt: number;
  androidVersion: string;
  manufacturer: string;
  brand: string;
  model: string;
  wallpaperSupported: boolean;
  wallpaperSetAllowed: boolean;
}

export interface SystemCustomizerNative {
  getCapabilities(): DeviceCapabilities;
  canOpen(action: string): boolean;
  openSettings(action: string): boolean;
  setWallpaperFromUri(uri: string, target: WallpaperTarget): Promise<void>;
  setGradientWallpaper(colors: string[], angle: number, target: WallpaperTarget): Promise<void>;
}

// null when running somewhere the native module is not compiled in (e.g. Expo Go).
let native: SystemCustomizerNative | null = null;
try {
  native = requireNativeModule<SystemCustomizerNative>('SystemCustomizer');
} catch {
  native = null;
}

export default native;
