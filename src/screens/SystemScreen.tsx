import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FadeIn } from '../components/FadeIn';
import { InfoNotice } from '../components/InfoNotice';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { SettingRow } from '../components/SettingRow';
import { SETTING_SHORTCUTS } from '../constants/settings';
import { notify } from '../services/feedback';
import { openShortcut, resolveStatus } from '../services/systemSettings';
import { SettingShortcut, SettingStatus } from '../types';

export function SystemScreen() {
  const [status, setStatus] = useState<Record<string, SettingStatus>>({});

  useEffect(() => {
    const next: Record<string, SettingStatus> = {};
    SETTING_SHORTCUTS.forEach((s) => {
      next[s.id] = resolveStatus(s);
    });
    setStatus(next);
  }, []);

  const onOpen = (s: SettingShortcut) => notify(openShortcut(s).message);

  return (
    <Screen title="System" subtitle="Shortcuts to the system screens where real changes happen.">
      <InfoNotice
        message="Android 10 gives apps no way to change the system theme, dark mode or brightness directly. These shortcuts open the system's own screens. Labels show what this device actually supports."
      />
      <FadeIn delay={60} style={{ gap: 12 }}>
        <SectionHeader title="Shortcuts" />
        <View style={{ gap: 12 }}>
          {SETTING_SHORTCUTS.map((s) => (
            <SettingRow
              key={s.id}
              shortcut={s}
              status={status[s.id] ?? 'unavailable'}
              onPress={() => onOpen(s)}
            />
          ))}
        </View>
      </FadeIn>
      <InfoNotice
        tone="warning"
        title="HiOS themes"
        message="HiOS icon packs, fonts and system themes are managed by TECNO's own Theme app and need OEM privileges. This app does not claim to change them."
      />
    </Screen>
  );
}
