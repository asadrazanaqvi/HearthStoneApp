import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getAllCards, getCardsByType, Card, ApiResponse } from '../../services/api'; // adjust path

describe('hearthstoneApi', () => {
  const mock = new MockAdapter(axios);
  const baseUrl = 'https://omgvamp-hearthstone-v1.p.rapidapi.com';

  afterEach(() => {
    mock.reset();
  });

  it('fetches all cards successfully', async () => {
    // Mock response data
    const mockData: ApiResponse = {
      'Basic': [
        {
          cardId: 'card1',
          name: 'Card One',
          cardSet: 'Basic',
          type: 'Minion',
        },
      ],
    };

    mock.onGet(`${baseUrl}/cards`).reply(200, mockData);

    const response = await getAllCards();
    expect(response).toEqual(mockData);
  },80000);//have to add this api is taking so much time to respond

  it('fetches cards by type successfully', async () => {
    const cardType = 'Spell';
    const mockData: ApiResponse = {
      'Classic': [
        {
          cardId: 'card2',
          name: 'Fireball',
          cardSet: 'Classic',
          type: 'Spell',
        },
      ],
    };

    mock.onGet(`${baseUrl}/cards/types/${cardType}`).reply(200, mockData);

    const response = await getCardsByType(cardType);
    expect(response).toEqual(mockData);
  });

  it('handles network error on getAllCards', async () => {
    mock.onGet(`${baseUrl}/cards`).networkError();

    await expect(getAllCards()).rejects.toThrow();
  });

  it('handles network error on getCardsByType', async () => {
    const cardType = 'Spell';
    mock.onGet(`${baseUrl}/cards/types/${cardType}`).networkError();

    await expect(getCardsByType(cardType)).rejects.toThrow();
  });
});
