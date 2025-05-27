import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import { useCards } from '../contexts/CardContext';
import { Text } from '../components/atoms/Text';
import { Card } from '../components/atoms/Card';
import { useTheme } from '../contexts/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CardsByType'>;

export const CardsByTypeScreen: React.FC<Props> = ({ route }) => {
  const { cardsByType, loading, error, fetchCardsByType } = useCards();
  const { theme } = useTheme();
  const { type } = route.params;

  useEffect(() => {
    fetchCardsByType(type);
  }, [type, fetchCardsByType]);

  if (loading) {
    return (
      <View testID="cards-by-type-loading-container" style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator testID="loading-indicator" size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View testID="cards-by-type-error-container" style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text testID="error-message" style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View testID="cards-by-type-container" style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        testID="cards-by-type-list"
        data={cardsByType}
        keyExtractor={(item) => item.cardId}
        renderItem={({ item }) => (
          <Card testID={`card-${item.cardId}`}>
            {item.img && (
              <Image 
                testID={`card-image-${item.cardId}`}
                source={{ uri: item.img }} 
                style={styles.image}
                resizeMode="contain"
                accessibilityLabel={`Image of ${item.name}`}
              />
            )}
            <Text testID={`card-name-${item.cardId}`} variant="subtitle">{item.name}</Text>
            <Text testID={`card-set-${item.cardId}`}>{item.cardSet}</Text>
            {item.text && <Text testID={`card-text-${item.cardId}`} style={styles.cardText}>{item.text}</Text>}
          </Card>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  cardText: {
    marginTop: 8,
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});