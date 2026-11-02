import React, { useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { applyNavigationBar } from './src/services/appearance';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';

function Root() {
  const { ready, palette, isDark } = useTheme();

  useEffect(() => {
    applyNavigationBar(palette, isDark);
  }, [palette, isDark]);

  if (!ready) return <View style={{ flex: 1, backgroundColor: '#000000' }} />;

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={palette.background} translucent={false} />
      <RootNavigator />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
