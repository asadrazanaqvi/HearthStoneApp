import React from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface Props {
  style?: ViewStyle;
  children?: React.ReactNode;
  onPress?: () => void;
}

export const Card: React.FC<Props> = ({ style, children, onPress }) => {
  const { theme } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <View style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.backgroundSecondary,
        },
        style
      ]}>
        {children}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
  },
});