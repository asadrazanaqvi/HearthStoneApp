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
}

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-RapidAPI-Key': Platform.OS === 'ios' ? 'YOUR_IOS_API_KEY' : 'YOUR_ANDROID_API_KEY',
    'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
  }
});

export const getAllCards = async (): Promise<Card[]> => {
  try {
    const response = await instance.get('/cards');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cards');
  }
};

export const getCardsByType = async (type: string): Promise<Card[]> => {
  try {
    const response = await instance.get(`/cards/types/${type}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch cards of type ${type}`);
  }
};