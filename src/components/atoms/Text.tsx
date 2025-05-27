import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface Props extends TextProps {
  variant?: 'title' | 'subtitle' | 'body';
  bold?: boolean;
}

export const Text: React.FC<Props> = ({ 
  variant = 'body', 
  bold = false,
  style,
  ...props 
}) => {
  const { theme } = useTheme();
  
  const textStyle = {
    color: theme.colors.text,
    fontSize: variant === 'title' ? 24 : variant === 'subtitle' ? 18 : 14,
    fontWeight: bold ? 'bold' : 'normal',
  };

  return <RNText style={[textStyle, style]} {...props} />;
};