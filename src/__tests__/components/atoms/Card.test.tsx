import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Card} from '../../../components/atoms/Card';
import {useTheme} from '../../../contexts/ThemeContext';

// Mock useTheme to provide consistent theme colors
jest.mock('../../../contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        surface: 'white',
        backgroundSecondary: 'gray',
      },
    },
  }),
}));

describe('Card', () => {
  it('renders children correctly', () => {
    const {getByTestId} = render(
      <Card testID="card-test">
        <></>
        <></>
      </Card>,
    );
    expect(getByTestId('card-test')).toBeTruthy();
  });

  it('applies custom style', () => {
    const style = {padding: 10};
    const {getByTestId} = render(<Card testID="card-test" style={style} />);
    const card = getByTestId('card-test');
    expect(card.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(style)]),
    );
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <Card testID="card-test" onPress={onPressMock} />,
    );
    const pressable = getByTestId('card-test-pressable');
    fireEvent.press(pressable);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('has accessibilityLabel set on Pressable when testID provided', () => {
    const {getByLabelText} = render(<Card testID="card-test" />);
    expect(getByLabelText('card-test-card')).toBeTruthy();
  });
});
