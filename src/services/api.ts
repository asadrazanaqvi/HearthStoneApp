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
   timeout: 0, //because taking more time 
 headers: {
    'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
    'X-RapidAPI-Key': Platform.OS === 'ios' ? '0585a7e6b1msh56da407e15a306dp13f6d1jsnf1b5d15aa785' : '0585a7e6b1msh56da407e15a306dp13f6d1jsnf1b5d15aa785'
  }
});

export const getAllCards = async (): Promise<ApiResponse> => {
  const response = await instance.get('/cards');
  return response.data;
};

export const getCardsByType = async (type: string): Promise<ApiResponse> => {
  const response = await instance.get(`/cards/types/${type}`);
  return response.data;
};