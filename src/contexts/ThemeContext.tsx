import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { lightTheme, darkTheme, ThemeType, AppTheme } from '../styles/theme';

interface ThemeContextValue {
  theme: AppTheme;
  themeType: ThemeType;
  toggleTheme: () => void;
  setTheme: (type: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  themeType: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

// Updated Correct typing for props
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeType, setThemeType] = useState<ThemeType>('light');

  const theme = useMemo(() => {
    return themeType === 'light' ? lightTheme : darkTheme;
  }, [themeType]);

  const toggleTheme = () => {
    setThemeType(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (type: ThemeType) => {
    setThemeType(type);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeType, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
