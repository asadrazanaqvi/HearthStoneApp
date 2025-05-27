import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import debounce from 'lodash.debounce';
import { useTheme } from '../../contexts/ThemeContext';

interface Props {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { theme } = useTheme();

  const debouncedSearch = debounce(onSearch, 300);

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            borderColor: theme.colors.backgroundSecondary,
          },
        ]}
        placeholder="Search card types..."
        placeholderTextColor={theme.colors.primary}
        value={query}
        onChangeText={setQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});