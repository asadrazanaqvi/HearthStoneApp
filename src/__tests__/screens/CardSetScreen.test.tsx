import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CardSetScreen } from '../../screens/CardSetScreen';
import { useCards } from '../../contexts/CardContext';
import { ThemeProvider } from '../../contexts/ThemeContext';

jest.mock('../../contexts/CardContext', () => ({
  useCards: jest.fn(),
}));

const mockCards = [
  {
    cardId: 'CARD1',
    name: 'Frostbolt',
    type: 'Spell',
    cardSet: 'Basic',
    text: 'Deal 3 damage to a character and Freeze it.',
  },
  {
    cardId: 'CARD2',
    name: 'Fireball',
    type: 'Spell',
    cardSet: 'Basic',
  },
  {
    cardId: 'CARD3',
    name: 'Polymorph',
    type: 'Spell',
    cardSet: 'Classic',
  },
];

const mockNavigationProps = (setName: string) => ({
  route: { params: { setName } },
  navigation: { navigate: jest.fn() },
} as any);

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('CardSetScreen', () => {
  beforeEach(() => {
    (useCards as jest.Mock).mockReturnValue({
      allCards: mockCards,
    });
  });

  it('renders the correct set title and cards', () => {
    const { getByTestId, getByText, queryByTestId } = renderWithProviders(
      <CardSetScreen {...mockNavigationProps('Basic')} />
    );

    expect(getByTestId('card-set-container')).toBeTruthy();
    expect(getByTestId('card-set-title')).toHaveTextContent('Basic');

    expect(getByTestId('card-CARD1')).toBeTruthy();
    expect(getByText('Frostbolt')).toBeTruthy();
    expect(getByTestId('card-type-CARD1')).toHaveTextContent('Spell');
    expect(getByTestId('card-text-CARD1')).toHaveTextContent('Deal 3 damage to a character and Freeze it.');

    expect(getByTestId('card-CARD2')).toBeTruthy();
    expect(getByText('Fireball')).toBeTruthy();
    expect(queryByTestId('card-text-CARD2')).toBeNull(); // Optional text
  });

  it('renders no cards if set is empty', () => {
    const { queryByTestId } = renderWithProviders(
      <CardSetScreen {...mockNavigationProps('UnknownSet')} />
    );

    expect(queryByTestId('card-CARD1')).toBeNull();
    expect(queryByTestId('card-CARD2')).toBeNull();
    expect(queryByTestId('card-CARD3')).toBeNull();
  });

  it('navigates to CardDetail on card press', () => {
    const mockNavigate = jest.fn();
    const { getByTestId } = renderWithProviders(
      <CardSetScreen {...mockNavigationProps('Basic')} navigation={{ navigate: mockNavigate }} />
    );

    fireEvent.press(getByTestId('card-CARD1'));
    expect(mockNavigate).toHaveBeenCalledWith('CardDetail', { cardId: 'CARD1' });
  });
});
