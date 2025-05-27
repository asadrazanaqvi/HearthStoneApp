import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeToggle } from '../../../components/molecules/ThemeToggle';
import * as ThemeContext from '../../../contexts/ThemeContext';

describe('ThemeToggle', () => {
  const toggleThemeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows switch ON when theme is dark', () => {
    jest.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      themeType: 'dark',
      toggleTheme: toggleThemeMock,
      theme: {
        colors: {
          primary: 'blue',
          backgroundSecondary: 'gray',
        },
      },
    });

    const { getByTestId } = render(<ThemeToggle />);
    const switchToggle = getByTestId('theme-toggle');

    expect(switchToggle.props.value).toBe(true);
  });

  it('shows switch OFF when theme is light', () => {
    jest.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      themeType: 'light',
      toggleTheme: toggleThemeMock,
      theme: {
        colors: {
          primary: 'blue',
          backgroundSecondary: 'gray',
        },
      },
    });

    const { getByTestId } = render(<ThemeToggle />);
    const switchToggle = getByTestId('theme-toggle');

    expect(switchToggle.props.value).toBe(false);
  });

  it('calls toggleTheme when switch is toggled', () => {
    jest.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      themeType: 'light',
      toggleTheme: toggleThemeMock,
      theme: {
        colors: {
          primary: 'blue',
          backgroundSecondary: 'gray',
        },
      },
    });

    const { getByTestId } = render(<ThemeToggle />);
    fireEvent(getByTestId('theme-toggle'), 'valueChange', true);

    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
