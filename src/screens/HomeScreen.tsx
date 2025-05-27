import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useCards } from '../contexts/CardContext';
import { Text } from '../components/atoms/Text';
import { Card } from '../components/atoms/Card';
import { SearchBar } from '../components/molecules/SearchBar';
import { useTheme } from '../contexts/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { allCards, loading, error, fetchAllCards } = useCards();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllCards();
  }, [fetchAllCards]);

  // Group cards by their cardSet
  const cardSets = React.useMemo(() => {
    const sets: { [key: string]: Card[] } = {};
    allCards.forEach(card => {
      if (!sets[card.cardSet]) {
        sets[card.cardSet] = [];
      }
      sets[card.cardSet].push(card);
    });
    return Object.entries(sets);
  }, [allCards]);

  // Filter sets based on search query
  const filteredSets = cardSets.filter(([setName, cards]) => 
    setName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cards.some(card => card.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <View testID="loading-container" style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator testID="loading-indicator" size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View testID="error-container" style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text testID="error-message" style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View testID="home-container" style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SearchBar testID="search-bar" onSearch={setSearchQuery} />
      <FlatList
        testID="card-sets-list"
        data={filteredSets}
        keyExtractor={([setName]) => setName}
        renderItem={({ item: [setName, cards] }) => (
          <Card testID={`card-set-${setName}`} style={styles.setCard}>
            <Text testID={`set-title-${setName}`} variant="title" style={styles.setTitle}>{setName}</Text>
            <FlatList
              testID={`cards-list-${setName}`}
              data={cards.slice(0, 3)} // Show first 3 cards as preview
              keyExtractor={(card) => card.cardId}
              renderItem={({ item: card }) => (
                <Card 
                  testID={`card-${card.cardId}`}
                  style={styles.cardItem}
                  onPress={() => navigation.navigate('CardDetail', { cardId: card.cardId })}
                >
                  <Text testID={`card-name-${card.cardId}`} variant="subtitle">{card.name}</Text>
                  <Text testID={`card-type-${card.cardId}`}>{card.type}</Text>
                </Card>
              )}
            />
            {cards.length > 3 && (
              <Text 
                testID={`view-more-${setName}`}
                style={styles.viewMore}
                onPress={() => navigation.navigate('CardSet', { setName })}
                accessibilityLabel={`View more cards in ${setName}`}
              >
                View {cards.length - 3} more...
              </Text>
            )}
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
  setCard: {
    marginBottom: 16,
    padding: 12,
  },
  setTitle: {
    marginBottom: 8,
  },
  cardItem: {
    marginVertical: 4,
    padding: 8,
  },
  viewMore: {
    color: '#007AFF',
    marginTop: 8,
    textAlign: 'right',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});