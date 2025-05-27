import React from 'react';
import {render} from '@testing-library/react-native';
import {Text} from '../../../components/atoms/Text'; // adjust path as needed

describe('Text', () => {
  it('renders with default body variant and normal fontWeight', () => {
    const {getByTestId} = render(<Text testID="text-test">Hello</Text>);
    const text = getByTestId('text-test');
    expect(text).toHaveStyle({
      fontSize: 14,
      fontWeight: 'normal',
    });
  });

  it('renders title variant with fontSize 24', () => {
    const {getByTestId} = render(
      <Text testID="text-test" variant="title">
        Title Text
      </Text>,
    );
    const text = getByTestId('text-test');
    expect(text).toHaveStyle({
      fontSize: 24,
    });
  });

  it('renders subtitle variant with fontSize 18', () => {
    const {getByTestId} = render(
      <Text testID="text-test" variant="subtitle">
        Subtitle Text
      </Text>,
    );
    const text = getByTestId('text-test');
    expect(text).toHaveStyle({
      fontSize: 18,
    });
  });

  it('renders bold text when bold prop is true', () => {
    const {getByTestId} = render(
      <Text testID="text-test" bold>
        Bold Text
      </Text>,
    );
    const text = getByTestId('text-test');
    expect(text).toHaveStyle({
      fontWeight: 'bold',
    });
  });
});
