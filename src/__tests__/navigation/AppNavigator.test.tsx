import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '../../navigation/AppNavigator';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { CardProvider } from '../../contexts/CardContext';

describe('AppNavigator', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <ThemeProvider>
          <CardProvider>
            <AppNavigator />
          </CardProvider>
        </ThemeProvider>
      </NavigationContainer>
    );
  });

  it('has correct initial route', () => {
    const { getByText } = render(
      <NavigationContainer>
        <ThemeProvider>
          <CardProvider>
            <AppNavigator />
          </CardProvider>
        </ThemeProvider>
      </NavigationContainer>
    );

    // Assuming HomeScreen renders a title or some text
    expect(getByText(/Home/i)).toBeTruthy();
  });
});