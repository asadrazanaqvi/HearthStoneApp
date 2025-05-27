import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';

type CustomColors = typeof MD3LightTheme.colors & {
  text: string;
  error: string;
  secondary: string;
  backgroundSecondary: string;
};

export interface AppTheme extends MD3Theme {
  colors: CustomColors;
}

export const lightTheme: AppTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#007AFF',
    secondary: '#5AC8FA',
    background: '#F5F5F5',
    backgroundSecondary: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#1C1C1E',
    error: '#FF3B30',
  },
};

export const darkTheme: AppTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#0A84FF',
    secondary: '#5AC8FA',
    background: '#1C1C1E',
    backgroundSecondary: '#2C2C2E',
    surface: '#2C2C2E',
    text: '#F5F5F5',
    error: '#FF453A',
  },
};

export type ThemeType = 'light' | 'dark';
