import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { CardProvider, useCards } from '../../contexts/CardContext';
import { getAllCards, getCardsByType } from '../../services/api';

// Mock the API functions
jest.mock('../../services/api');

const mockGetAllCards = getAllCards as jest.MockedFunction<typeof getAllCards>;
const mockGetCardsByType = getCardsByType as jest.MockedFunction<typeof getCardsByType>;

const mockCards = [
  { cardId: '1', name: 'Fireball', cardSet: 'Basic', type: 'Spell' },
  { cardId: '2', name: 'Dragon', cardSet: 'Classic', type: 'Minion' },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CardProvider>{children}</CardProvider>
);

describe('CardContext', () => {
  beforeEach(() => {
    mockGetAllCards.mockClear();
    mockGetCardsByType.mockClear();
  });

  it('provides initial context values', () => {
    const { result } = renderHook(() => useCards(), { wrapper });

    expect(result.current.allCards).toEqual([]);
    expect(result.current.cardsByType).toEqual([]);
    expect(result.current.uniqueTypes).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.fetchAllCards).toBe('function');
    expect(typeof result.current.fetchCardsByType).toBe('function');
  });

  it('fetches all cards successfully', async () => {
    mockGetAllCards.mockResolvedValueOnce({ Basic: mockCards });

    const { result, waitFor } = renderHook(() => useCards(), { wrapper });

    await act(async () => {
      result.current.fetchAllCards();
      await waitFor();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.allCards).toEqual(mockCards);
    expect(result.current.uniqueTypes).toEqual(['Spell', 'Minion']);
  });

  it('handles error when fetching all cards', async () => {
    const errorMessage = 'Network Error';
    mockGetAllCards.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitFor } = renderHook(() => useCards(), { wrapper });

    await act(async () => {
      result.current.fetchAllCards();
      await waitFor();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.allCards).toEqual([]);
  });

  it('fetches cards by type successfully', async () => {
    mockGetCardsByType.mockResolvedValueOnce({ Spell: [mockCards[0]] });

    const { result, waitFor } = renderHook(() => useCards(), { wrapper });

    await act(async () => {
      result.current.fetchCardsByType('Spell');
      await waitFor();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.cardsByType).toEqual([mockCards[0]]);
  });

  it('handles error when fetching cards by type', async () => {
    const errorMessage = 'Network Error';
    mockGetCardsByType.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitFor } = renderHook(() => useCards(), { wrapper });

    await act(async () => {
      result.current.fetchCardsByType('Spell');
      await waitFor();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(`Failed to fetch cards of type Spell`);
    expect(result.current.cardsByType).toEqual([]);
  });

  it('throws error when useCards is used outside CardProvider', () => {
    const { result } = renderHook(() => useCards());

    expect(result.error).toEqual(
      new Error('useCards must be used within a CardProvider')
    );
  });

  it('computes uniqueTypes correctly', async () => {
    mockGetAllCards.mockResolvedValueOnce({ Basic: mockCards });

    const { result, waitFor } = renderHook(() => useCards(), { wrapper });

    await act(async () => {
      result.current.fetchAllCards();
      await waitFor();
    });

    expect(result.current.uniqueTypes).toEqual(['Spell', 'Minion']);
  });
});