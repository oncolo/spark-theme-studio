import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { DashboardScreen } from '../screens/DashboardScreen';
import { SystemScreen } from '../screens/SystemScreen';
import { ThemesScreen } from '../screens/ThemesScreen';
import { WallpapersScreen } from '../screens/WallpapersScreen';
import { useTheme } from '../theme/ThemeProvider';
import { IconName } from '../types';

type TabParams = { Home: undefined; Themes: undefined; Wallpapers: undefined; System: undefined };
const Tab = createBottomTabNavigator<TabParams>();

const ICONS: Record<keyof TabParams, { on: IconName; off: IconName }> = {
  Home: { on: 'grid', off: 'grid-outline' },
  Themes: { on: 'color-palette', off: 'color-palette-outline' },
  Wallpapers: { on: 'image', off: 'image-outline' },
  System: { on: 'settings', off: 'settings-outline' },
};

export function RootNavigator() {
  const { palette, isDark } = useTheme();
  const navTheme: Theme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      primary: palette.primary,
      background: palette.background,
      card: palette.surface,
      text: palette.text,
      border: palette.border,
      notification: palette.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          sceneStyle: { backgroundColor: palette.background },
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: palette.textSecondary,
          tabBarStyle: { backgroundColor: palette.surface, borderTopColor: palette.border, height: 64, paddingTop: 6 },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600', paddingBottom: 6 },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? ICONS[route.name].on : ICONS[route.name].off} size={22} color={color} />
          ),
        })}
      >
        <Tab.Screen name="Home" component={DashboardScreen} />
        <Tab.Screen name="Themes" component={ThemesScreen} />
        <Tab.Screen name="Wallpapers" component={WallpapersScreen} />
        <Tab.Screen name="System" component={SystemScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
