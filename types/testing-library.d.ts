import { RenderAPI } from '@testing-library/react-native';

declare module '@testing-library/react-native' {
  interface RenderAPI {
    getByTestID: (testID: string) => HTMLElement;
    queryByTestID: (testID: string) => HTMLElement | null;
    findByTestID: (testID: string) => Promise<HTMLElement>;
    getAllByTestID: (testID: string) => HTMLElement[];
    queryAllByTestID: (testID: string) => HTMLElement[];
    findAllByTestID: (testID: string) => Promise<HTMLElement[]>;
  }
}