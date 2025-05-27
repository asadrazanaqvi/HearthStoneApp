import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { CardsByTypeScreen } from '../../screens/CardsByTypeScreen';
import { useCards } from '../../contexts/CardContext';
import { ThemeProvider } from '../../contexts/ThemeContext';

jest.mock('../../contexts/CardContext', () => ({
  useCards: jest.fn(),
}));

const mockCardsByType = [
  {
    cardId: 'CARD1',
    name: 'Arcane Intellect',
    type: 'Spell',
    cardSet: 'Basic',
    img: 'https://someurl.com/img1.png',
    text: 'Draw 2 cards.',
  },
  {
    cardId: 'CARD2',
    name: 'Fireball',
    type: 'Spell',
    cardSet: 'Basic',
    img: undefined,
  },
];

const mockNavigationProps = (type: string) => ({
  route: { params: { type } },
} as any);

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('CardsByTypeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading indicator when loading', () => {
    (useCards as jest.Mock).mockReturnValue({
      cardsByType: [],
      loading: true,
      error: null,
      fetchCardsByType: jest.fn(),
    });

    const { getByTestId } = renderWithProviders(<CardsByTypeScreen {...mockNavigationProps('Spell')} />);
    expect(getByTestId('cards-by-type-loading-container')).toBeTruthy();
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('shows error message when error occurs', () => {
    (useCards as jest.Mock).mockReturnValue({
      cardsByType: [],
      loading: false,
      error: 'Failed to fetch',
      fetchCardsByType: jest.fn(),
    });

    const { getByTestId } = renderWithProviders(<CardsByTypeScreen {...mockNavigationProps('Spell')} />);
    expect(getByTestId('cards-by-type-error-container')).toBeTruthy();
    expect(getByTestId('error-message')).toHaveTextContent('Failed to fetch');
  });

  it('renders list of cards correctly', async () => {
    const fetchCardsByTypeMock = jest.fn();

    (useCards as jest.Mock).mockReturnValue({
      cardsByType: mockCardsByType,
      loading: false,
      error: null,
      fetchCardsByType: fetchCardsByTypeMock,
    });

    const { getByTestId, getByText, queryByTestId } = renderWithProviders(
      <CardsByTypeScreen {...mockNavigationProps('Spell')} />
    );

    await waitFor(() => {
      expect(getByTestId('cards-by-type-container')).toBeTruthy();
      expect(getByTestId('cards-by-type-list')).toBeTruthy();

      // CARD1 checks
      expect(getByTestId('card-CARD1')).toBeTruthy();
      expect(getByTestId('card-name-CARD1')).toHaveTextContent('Arcane Intellect');
      expect(getByTestId('card-set-CARD1')).toHaveTextContent('Basic');
      expect(getByTestId('card-text-CARD1')).toHaveTextContent('Draw 2 cards.');
      expect(getByTestId('card-image-CARD1')).toBeTruthy();

      // CARD2 checks
      expect(getByTestId('card-CARD2')).toBeTruthy();
      expect(getByTestId('card-name-CARD2')).toHaveTextContent('Fireball');
      expect(queryByTestId('card-text-CARD2')).toBeNull(); // No text
      expect(queryByTestId('card-image-CARD2')).toBeNull(); // No image
    });
  });
});
