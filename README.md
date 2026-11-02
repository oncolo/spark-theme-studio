# Spark Theme Studio

Theme and wallpaper customizer for the **TECNO Spark 4 (KC8), Android 10, HiOS 6.x**.
Expo (development build) + TypeScript + one small Kotlin Expo module.

## What really works (public Android APIs, no root)
| Feature | How |
|---|---|
| Wallpaper (gradient or photo, home / lock / both) | `WallpaperManager.setBitmap(..., FLAG_SYSTEM / FLAG_LOCK)` in Kotlin, permission `SET_WALLPAPER` (normal, no prompt) |
| Photo picking | System photo picker via `expo-image-picker`, no storage permission |
| App theme (5 presets, accent, light/dark/system) | React context, persisted with AsyncStorage |
| App status bar / navigation bar colors | `expo-status-bar`, `expo-navigation-bar` (this app's window only) |
| System screens (Display, wallpaper picker, Night light, Accessibility, Sound, Home app) | `startActivity(Intent(action))` after `resolveActivity` check |

## What it does NOT do
- It does not change the HiOS system theme, icon packs, fonts, system accent or system-wide dark mode. Those need root, OEM or signature permissions.
- Dark theme and Brightness have no public dedicated intent on Android 10, so they open **Display settings**. The System tab labels each shortcut as *Direct*, *Nearest screen* or *Unavailable*, based on what the device reports.

## Permissions
Only `SET_WALLPAPER` (+ `INTERNET`, added by React Native). Storage, camera, mic, overlay and vibrate are blocked in `app.json`.

## Setup
```bash
npm install
npx expo install --fix          # aligns every package to your Expo SDK
npx tsc --noEmit                # type check
```

## Run on a device (Android 10, USB debugging on)
```bash
npx expo run:android            # builds the dev client + Kotlin module and installs it
npx expo start --dev-client
```
Expo Go cannot run this app because of the native module.

## Build an installable APK
```bash
npm i -g eas-cli
eas login
eas build:configure             # first time only
eas build -p android --profile preview      # standalone, installable APK
eas build -p android --profile development  # development-client APK
```
Download the APK from the build page and install it on the phone (allow "Install unknown apps").

## Structure
```
src/components  src/screens  src/navigation  src/theme
src/constants   src/services src/types
modules/system-customizer   (Kotlin Expo module: android/, index.ts)
```
