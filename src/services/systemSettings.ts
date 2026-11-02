import native from '../../modules/system-customizer';
import { ActionResult, SettingShortcut, SettingStatus } from '../types';

export function resolveStatus(s: SettingShortcut): SettingStatus {
  if (!native) return 'unavailable';
  if (native.canOpen(s.action)) return s.exact ? 'direct' : 'nearest';
  if (s.fallbackAction && native.canOpen(s.fallbackAction)) return 'nearest';
  return 'unavailable';
}

export function openShortcut(s: SettingShortcut): ActionResult {
  if (!native) {
    return { ok: false, message: 'Native module missing. Run the development build, not Expo Go.' };
  }
  if (native.openSettings(s.action)) {
    return { ok: true, message: s.exact ? `Opened ${s.title}.` : (s.note ?? 'Opened the nearest screen.') };
  }
  if (s.fallbackAction && native.openSettings(s.fallbackAction)) {
    return { ok: true, message: `${s.title} is not available here. Opened Display settings instead.` };
  }
  return { ok: false, message: `${s.title} is not available on this device.` };
}
