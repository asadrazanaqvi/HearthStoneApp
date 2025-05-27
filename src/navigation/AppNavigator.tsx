// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { CardSetScreen } from '../screens/CardSetScreen';
import { CardDetailScreen } from '../screens/CardDetailScreen';
import { ThemeToggle } from '../components/molecules/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

export type RootStackParamList = {
  Home: undefined;
  CardSet: { setName: string };
  CardDetail: { cardId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRight: () => <ThemeToggle />,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Hearthstone Cards' }}
      />
      <Stack.Screen
        name="CardSet"
        component={CardSetScreen}
        options={({ route }) => ({ title: route.params.setName })}
      />
      <Stack.Screen
        name="CardDetail"
        component={CardDetailScreen}
        options={({ route }) => ({ title: route.params.cardId })}
      />
    </Stack.Navigator>
  );
};