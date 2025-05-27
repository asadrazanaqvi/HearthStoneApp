import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Text } from '../components/atoms/Text';
import { Card } from '../components/atoms/Card';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useCards } from '../contexts/CardContext';

type Props = NativeStackScreenProps<RootStackParamList, 'CardSet'>;

export const CardSetScreen: React.FC<Props> = ({ route, navigation }) => { // Added navigation here
  const { setName } = route.params;
  const { allCards } = useCards();
  const { theme } = useTheme();

  const cardsInSet = allCards.filter(card => card.cardSet === setName);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="title" style={styles.title}>{setName}</Text>
      <FlatList
        data={cardsInSet}
        keyExtractor={(card) => card.cardId}
        renderItem={({ item: card }) => (
          <Card 
            style={styles.card}
            onPress={() => navigation.navigate('CardDetail', { cardId: card.cardId })}
          >
            <Text variant="subtitle">{card.name}</Text>
            <Text>{card.type}</Text>
            {card.text && <Text style={styles.cardText}>{card.text}</Text>}
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