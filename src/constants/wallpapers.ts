import { WallpaperItem } from '../types';

export const WALLPAPERS: WallpaperItem[] = [
  { id: 'midnight', name: 'Midnight', colors: ['#000000', '#0B0B14', '#1C1C32'], angle: 160 },
  { id: 'forest', name: 'Forest', colors: ['#04110A', '#0B3D26', '#1F7A4D'], angle: 160 },
  { id: 'ocean', name: 'Ocean', colors: ['#03111F', '#0B4F8A', '#2EA8FF'], angle: 160 },
  { id: 'purple', name: 'Purple Night', colors: ['#0B0618', '#3B1A78', '#B388FF'], angle: 160 },
  { id: 'minimal', name: 'Minimal', colors: ['#FFFFFF', '#F1F2F4', '#D5D9E0'], angle: 170 },
  { id: 'ember', name: 'Ember', colors: ['#1A0A0A', '#8A2D1F', '#FF7A45'], angle: 150 },
  { id: 'aurora', name: 'Aurora', colors: ['#021B1A', '#0F766E', '#7DD3FC'], angle: 135 },
];

export const getWallpaper = (id: string): WallpaperItem =>
  WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0];

/** Same maths as the native renderer so the preview matches the result. */
export function angleToPoints(angle: number) {
  const rad = (angle * Math.PI) / 180;
  let dx = Math.sin(rad);
  let dy = -Math.cos(rad);
  const m = Math.max(Math.abs(dx), Math.abs(dy));
  dx /= m;
  dy /= m;
  return {
    start: { x: 0.5 - dx / 2, y: 0.5 - dy / 2 },
    end: { x: 0.5 + dx / 2, y: 0.5 + dy / 2 },
  };
}
