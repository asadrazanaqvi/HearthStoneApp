import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';

export const ThemeToggle: React.FC = () => {
  const { theme, themeType, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text>Dark Mode</Text>
      <Switch
        testID="theme-toggle"
        value={themeType === 'dark'}
        onValueChange={toggleTheme}
        thumbColor={theme.colors.primary}
        trackColor={{
          false: theme.colors.backgroundSecondary,
          true: theme.colors.primary,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 16,
  },
});