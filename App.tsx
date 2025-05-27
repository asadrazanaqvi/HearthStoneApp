import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { CardProvider } from './src/contexts/CardContext';
import { AppNavigator } from './src/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

const ThemedApp = () => {
  const { theme } = useTheme();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <CardProvider>
          <AppNavigator />
        </CardProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

