import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { getAllCards, getCardsByType, Card } from '../services/api';

interface CardContextData {
  allCards: Card[];
  cardsByType: Card[];
  uniqueTypes: string[];
  loading: boolean;
  error: string | null;
  fetchAllCards: () => Promise<void>;
  fetchCardsByType: (type: string) => Promise<void>;
}

interface CardProviderProps {
  children: ReactNode;
}

const CardContext = createContext<CardContextData>({} as CardContextData);

export const CardProvider: React.FC<CardProviderProps> = ({ children }) => {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [cardsByType, setCardsByType] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cardsData = await getAllCards();
      
      // Flatten the object of arrays into a single array
      const flattenedCards = Object.values(cardsData).flat();
      setAllCards(flattenedCards);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cards');
      setAllCards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCardsByType = useCallback(async (type: string) => {
    try {
      setLoading(true);
      setError(null);
      const cardsData = await getCardsByType(type);
      
      // Flatten the object of arrays into a single array
      const flattenedCards = Object.values(cardsData).flat();
      setCardsByType(flattenedCards);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to fetch cards of type ${type}`);
      setCardsByType([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const uniqueTypes = useMemo(() => {
    return [...new Set(allCards.map(card => card.type))];
  }, [allCards]);

  return (
    <CardContext.Provider
      value={{
        allCards,
        cardsByType,
        uniqueTypes,
        loading,
        error,
        fetchAllCards,
        fetchCardsByType
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardProvider');
  }
  return context;
};