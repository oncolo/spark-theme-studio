import { TextStyle } from 'react-native';

export const typography = {
  display: { fontSize: 30, fontWeight: '800', letterSpacing: -0.6, lineHeight: 36 },
  title: { fontSize: 20, fontWeight: '700', letterSpacing: -0.2 },
  heading: { fontSize: 16, fontWeight: '700' },
  body: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  label: { fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  caption: { fontSize: 12, fontWeight: '500' },
} satisfies Record<string, TextStyle>;

export const radius = { sm: 10, md: 16, lg: 22, pill: 999 };
