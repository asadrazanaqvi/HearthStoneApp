import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../../styles/theme';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeContext', () => {
  it('provides initial theme values', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toEqual(lightTheme);
    expect(result.current.themeType).toBe('light');
    expect(typeof result.current.toggleTheme).toBe('function');
    expect(typeof result.current.setTheme).toBe('function');
  });

  it('toggles theme from light to dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toEqual(darkTheme);
    expect(result.current.themeType).toBe('dark');
  });

  it('toggles theme from dark to light', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('dark');
      result.current.toggleTheme();
    });

    expect(result.current.theme).toEqual(lightTheme);
    expect(result.current.themeType).toBe('light');
  });

  it('sets theme to dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toEqual(darkTheme);
    expect(result.current.themeType).toBe('dark');
  });

  it('sets theme to light', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('dark');
      result.current.setTheme('light');
    });

    expect(result.current.theme).toEqual(lightTheme);
    expect(result.current.themeType).toBe('light');
  });
});