import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Text } from '../components/atoms/Text';
import { Card } from '../components/atoms/Card';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useCards } from '../contexts/CardContext';

type Props = NativeStackScreenProps<RootStackParamList, 'CardSet'>;

export const CardSetScreen: React.FC<Props> = ({ route, navigation }) => {
  const { setName } = route.params;
  const { allCards } = useCards();
  const { theme } = useTheme();

  const cardsInSet = allCards.filter(card => card.cardSet === setName);

  return (
    <View testID="card-set-container" style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text testID="card-set-title" variant="title" style={styles.title}>{setName}</Text>
      <FlatList
        testID="card-set-list"
        data={cardsInSet}
        keyExtractor={(card) => card.cardId}
        renderItem={({ item: card }) => (
          <Card 
            testID={`card-${card.cardId}`}
            style={styles.card}
            onPress={() => navigation.navigate('CardDetail', { cardId: card.cardId })}
          >
            <Text testID={`card-name-${card.cardId}`} variant="subtitle">{card.name}</Text>
            <Text testID={`card-type-${card.cardId}`}>{card.type}</Text>
            {card.text && <Text testID={`card-text-${card.cardId}`} style={styles.cardText}>{card.text}</Text>}
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
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 8,
    padding: 12,
  },
  cardText: {
    marginTop: 8,
    fontStyle: 'italic',
  },
});