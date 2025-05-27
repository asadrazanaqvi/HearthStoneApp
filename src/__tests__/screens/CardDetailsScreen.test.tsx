import React from 'react';
import { render } from '@testing-library/react-native';
import { CardDetailScreen } from '../../screens/CardDetailScreen';
import { useCards } from '../../contexts/CardContext';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock the useCards hook
jest.mock('../../contexts/CardContext', () => ({
  useCards: jest.fn(),
}));

const mockCard = {
  cardId: 'CARD_ID_1',
  name: 'Arcane Intellect',
  type: 'Spell',
  cardSet: 'Basic',
  playerClass: 'Mage',
  text: 'Draw 2 cards',
  img: 'https://someimage.url/card1.jpg',
};

const mockCardWithoutOptionals = {
  cardId: 'CARD_ID_NO_OPTIONALS',
  name: 'NoTextCard',
  type: 'Minion',
  cardSet: 'Classic',
};

const mockNavigationProps = (cardId: string) => ({
  route: { params: { cardId } },
  navigation: { navigate: jest.fn() },
} as any);

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('CardDetailScreen', () => {
  beforeEach(() => {
    (useCards as jest.Mock).mockReturnValue({
      allCards: [mockCard, mockCardWithoutOptionals],
    });
  });

  it('renders card details correctly when card exists', () => {
    const { getByTestId } = renderWithProviders(
      <CardDetailScreen {...mockNavigationProps('CARD_ID_1')} />
    );

    expect(getByTestId('card-detail-CARD_ID_1')).toBeTruthy();
    expect(getByTestId('card-name-CARD_ID_1')).toHaveTextContent('Arcane Intellect');
    expect(getByTestId('card-type-CARD_ID_1')).toHaveTextContent('Spell - Basic');
    expect(getByTestId('card-class-CARD_ID_1')).toHaveTextContent('Class: Mage');
    expect(getByTestId('card-text-CARD_ID_1')).toHaveTextContent('Draw 2 cards');
    expect(getByTestId('card-image-CARD_ID_1')).toBeTruthy();
  });

  it('shows "Card not found" when cardId is invalid', () => {
    const { getByTestId } = renderWithProviders(
      <CardDetailScreen {...mockNavigationProps('INVALID_ID')} />
    );

    expect(getByTestId('card-detail-not-found-container')).toBeTruthy();
    expect(getByTestId('not-found-message')).toHaveTextContent('Card not found');
  });

  it('renders without crashing when optional fields are missing', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(
      <CardDetailScreen {...mockNavigationProps('CARD_ID_NO_OPTIONALS')} />
    );

    expect(getByTestId('card-detail-CARD_ID_NO_OPTIONALS')).toBeTruthy();
    expect(getByTestId('card-name-CARD_ID_NO_OPTIONALS')).toHaveTextContent('NoTextCard');
    expect(queryByTestId('card-class-CARD_ID_NO_OPTIONALS')).toBeNull();
    expect(queryByTestId('card-text-CARD_ID_NO_OPTIONALS')).toBeNull();
    expect(queryByTestId('card-image-CARD_ID_NO_OPTIONALS')).toBeNull();
  });
});
