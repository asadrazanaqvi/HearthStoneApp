import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';

describe('ThemeContext', () => {
  it('should use light theme by default', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.themeType).toBe('light');
  });

  it('should toggle theme between light and dark', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.themeType).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.themeType).toBe('light');
  });
});