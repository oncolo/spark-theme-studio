import native from '../../modules/system-customizer';
import { DeviceCapabilities } from '../types';

export const isNativeAvailable = native !== null;

export function getDeviceCapabilities(): DeviceCapabilities | null {
  try {
    return native ? native.getCapabilities() : null;
  } catch {
    return null;
  }
}
