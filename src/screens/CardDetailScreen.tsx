import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Text } from '../components/atoms/Text';
import { Card } from '../components/atoms/Card';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useCards } from '../contexts/CardContext';

type Props = NativeStackScreenProps<RootStackParamList, 'CardDetail'>;

export const CardDetailScreen: React.FC<Props> = ({ route }) => {
  const { cardId } = route.params;
  const { allCards } = useCards();
  const { theme } = useTheme();

  const card = allCards.find(c => c.cardId === cardId);

  if (!card) {
    return (
      <View testID="card-detail-not-found-container" style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text testID="not-found-message">Card not found</Text>
      </View>
    );
  }

  return (
    <ScrollView testID="card-detail-container" style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card testID={`card-detail-${card.cardId}`} style={styles.card}>
        {card.img && (
          <Image 
            testID={`card-image-${card.cardId}`}
            source={{ uri: card.img }} 
            style={styles.image}
            resizeMode="contain"
            accessibilityLabel={`Image of ${card.name}`}
          />
        )}
        <Text testID={`card-name-${card.cardId}`} variant="title" style={styles.cardName}>{card.name}</Text>
        <Text testID={`card-type-${card.cardId}`} style={styles.cardType}>{card.type} - {card.cardSet}</Text>
        {card.playerClass && (
          <Text testID={`card-class-${card.cardId}`} style={styles.cardClass}>Class: {card.playerClass}</Text>
        )}
        {card.text && (
          <Text testID={`card-text-${card.cardId}`} style={styles.cardText}>{card.text}</Text>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  cardName: {
    marginBottom: 8,
  },
  cardType: {
    marginBottom: 8,
    color: '#666',
  },
  cardClass: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  cardText: {
    marginTop: 16,
    fontStyle: 'italic',
    lineHeight: 24,
  },
});