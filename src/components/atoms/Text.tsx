import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface Props extends TextProps {
  variant?: 'title' | 'subtitle' | 'body';
  bold?: boolean;
  testID?: string;
}

export const Text: React.FC<Props> = ({ 
  variant = 'body', 
  bold = false,
  style,
  testID,
  ...props 
}) => {
  const { theme } = useTheme();
  
  const textStyle = {
    color: theme.colors.text,
    fontSize: variant === 'title' ? 24 : variant === 'subtitle' ? 18 : 14,
    fontWeight: bold ? 'bold' : 'normal',
  };

  return <RNText testID={testID} style={[textStyle, style]} {...props} />;
};

