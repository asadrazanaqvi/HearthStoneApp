import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { useTheme } from '../../../contexts/ThemeContext';

jest.mock('../../../contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        surface: 'white',
        text: 'black',
        backgroundSecondary: 'gray',
        primary: 'blue',
      },
    },
  }),
}));

jest.useFakeTimers();

describe('SearchBar', () => {
  it('renders correctly with placeholder and styles', () => {
    const { getByTestId } = render(<SearchBar onSearch={() => {}} />);
    const input = getByTestId('search-bar');
    expect(input.props.placeholder).toBe('Search card types...');
    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: 'white', color: 'black', borderColor: 'gray' }),
      ])
    );
  });

  it('calls onSearch with debounced input', () => {
    const onSearchMock = jest.fn();
    const { getByTestId } = render(<SearchBar onSearch={onSearchMock} />);
    const input = getByTestId('search-bar');

    fireEvent.changeText(input, 'mage');

    // advance timers by debounce delay 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(onSearchMock).toHaveBeenCalledWith('mage');
  });

  it('cancels debounce on unmount', () => {
    const onSearchMock = jest.fn();
    const { unmount } = render(<SearchBar onSearch={onSearchMock} />);
    unmount();

    // No errors should be thrown during unmount cleanup
  });
});
