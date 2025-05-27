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
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Card not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        {card.img && (
          <Image 
            source={{ uri: card.img }} 
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <Text variant="title" style={styles.cardName}>{card.name}</Text>
        <Text style={styles.cardType}>{card.type} - {card.cardSet}</Text>
        {card.playerClass && (
          <Text style={styles.cardClass}>Class: {card.playerClass}</Text>
        )}
        {card.text && (
          <Text style={styles.cardText}>{card.text}</Text>
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