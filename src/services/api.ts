import axios from 'axios';
import { Platform } from 'react-native';

const API_BASE_URL = 'https://omgvamp-hearthstone-v1.p.rapidapi.com';

export interface Card {
  cardId: string;
  name: string;
  cardSet: string;
  type: string;
  text?: string;
  playerClass?: string;
  img?: string;
  faction?: string;
  dbfId?: number;
  locale?: string;
}

// The API returns an object with card sets as keys and arrays of cards as values
export interface ApiResponse {
  [key: string]: Card[];
}

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 0, // No timeout to allow long requests (consider adjusting if needed)
  headers: {
    'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
    'X-RapidAPI-Key': Platform.OS === 'ios' 
      ? '0585a7e6b1msh56da407e15a306dp13f6d1jsnf1b5d15aa785' 
      : '0585a7e6b1msh56da407e15a306dp13f6d1jsnf1b5d15aa785',
  },
});

/**
 * Fetch all cards from the API.
 * @returns Promise resolving to all cards grouped by sets.
 */
export const getAllCards = async (): Promise<ApiResponse> => {
  const response = await instance.get('/cards');
  return response.data;
};

/**
 * Fetch cards filtered by type from the API.
 * @param type Card type to filter by (e.g., "Spell", "Minion").
 * @returns Promise resolving to cards grouped by sets.
 */
export const getCardsByType = async (type: string): Promise<ApiResponse> => {
  const response = await instance.get(`/cards/types/${type}`);
  return response.data;
};
