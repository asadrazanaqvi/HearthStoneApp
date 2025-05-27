import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import {HomeScreen} from '../../screens/HomeScreen';
import {CardProvider} from '../../contexts/CardContext';
import {ThemeProvider} from '../../contexts/ThemeContext';
import {getAllCards} from '../../services/api';

// Mock the API
jest.mock('../../services/api');
const mockGetAllCards = getAllCards as jest.MockedFunction<typeof getAllCards>;

// Mock navigation
const mockNavigate = jest.fn();
const navigation = {
  navigate: mockNavigate,
} as any;

const mockCards = [
  {cardId: '1', name: 'Fireball', cardSet: 'Basic', type: 'Spell'},
  {cardId: '2', name: 'Frostbolt', cardSet: 'Basic', type: 'Spell'},
  {cardId: '3', name: 'Arcane Intellect', cardSet: 'Basic', type: 'Spell'},
  {cardId: '4', name: 'Dragon', cardSet: 'Classic', type: 'Minion'},
  {cardId: '5', name: 'Mage', cardSet: 'Classic', type: 'Minion'},
];

describe('HomeScreen', () => {
  beforeEach(() => {
    mockGetAllCards.mockClear();
    mockNavigate.mockClear();
  });

  const renderScreen = () => {
    render(
      <ThemeProvider>
        <CardProvider>
          <HomeScreen navigation={navigation} />
        </CardProvider>
      </ThemeProvider>,
    );
  };

  it('calls fetchAllCards on mount', async () => {
    mockGetAllCards.mockResolvedValueOnce({Basic: mockCards});
    renderScreen();

    await waitFor(() => {
      expect(screen.getByTestId('home-container')).toBeTruthy();
    });

    expect(mockGetAllCards).toHaveBeenCalledTimes(1);
  });

  it('renders loading state', async () => {
    mockGetAllCards.mockImplementationOnce(() => new Promise(() => {})); // Never resolves
    renderScreen();

    expect(screen.getByTestId('loading-container')).toBeTruthy();
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error state', async () => {
    const errorMessage = 'Network Error';
    mockGetAllCards.mockRejectedValueOnce(new Error(errorMessage));
    renderScreen();

    await waitFor(() => {
      expect(screen.getByTestId('error-container')).toBeTruthy();
      expect(screen.getByTestId('error-message').props.children).toContain(
        errorMessage,
      );
    });
  });

  it('renders card sets and cards successfully', async () => {
    mockGetAllCards.mockResolvedValueOnce({
      Basic: mockCards,
      Classic: mockCards,
    });
    renderScreen();

    await waitFor(() => {
      expect(screen.getByTestId('home-container')).toBeTruthy();
      expect(screen.getByTestId('card-sets-list')).toBeTruthy();
      expect(screen.getByTestId('card-set-Basic')).toBeTruthy();
      expect(screen.getByTestId('card-set-Classic')).toBeTruthy();
      expect(screen.getByTestId('set-title-Basic').props.children).toContain(
        'Basic',
      );
      expect(screen.getByTestId('set-title-Classic').props.children).toContain(
        'Classic',
      );
      expect(screen.getByTestId('card-1')).toBeTruthy();
      expect(screen.getByTestId('card-name-1').props.children).toContain(
        'Fireball',
      );
      expect(screen.getByTestId('card-type-1').props.children).toContain(
        'Spell',
      );
    });
  });

  it('filters card sets based on search query', async () => {
    mockGetAllCards.mockResolvedValueOnce({
      Basic: mockCards,
      Classic: mockCards,
    });
    renderScreen();

    await waitFor(() => {
      expect(screen.getByTestId('card-set-Basic')).toBeTruthy();
      expect(screen.getByTestId('card-set-Classic')).toBeTruthy();
    });

    fireEvent.changeText(screen.getByTestId('search-bar'), 'Fireball');

    await waitFor(() => {
      expect(screen.getByTestId('card-set-Basic')).toBeTruthy();
      expect(screen.queryByTestId('card-set-Classic')).toBeNull();
    });
  });

  it('navigates to CardDetail when a card is pressed', async () => {
    mockGetAllCards.mockResolvedValueOnce({Basic: mockCards});
    renderScreen();

    await waitFor(() => {
      fireEvent.press(screen.getByTestId('card-1'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('CardDetail', {cardId: '1'});
  });

  it('navigates to CardSet when "View more" is pressed', async () => {
    const mockCards = [
      {cardId: '1', name: 'Fireball', cardSet: 'Basic', type: 'Spell'},
      {cardId: '2', name: 'Frostbolt', cardSet: 'Basic', type: 'Spell'},
      {cardId: '3', name: 'Arcane Intellect', cardSet: 'Basic', type: 'Spell'},
      {cardId: '4', name: 'Polymorph', cardSet: 'Basic', type: 'Spell'}, // <-- now > 3 cards
    ];

    mockGetAllCards.mockResolvedValueOnce({Basic: mockCards});
    renderScreen();

    const viewMoreButton = await screen.findByTestId('view-more-Basic');
    fireEvent.press(viewMoreButton);

    expect(mockNavigate).toHaveBeenCalledWith('CardSet', {setName: 'Basic'});
  });
});
