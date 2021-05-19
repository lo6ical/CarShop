import { render, screen } from '@testing-library/react';
import App from './App';

test('App.js renders', () => {
  const { getByText } = render(<App />);
  const element = getByText(/CarList/i);
  expect(element).toBeInTheDocument();
});

test('New Car button opens modal form', () => {
  const { getByText } = render(<Carlist />);
  const button = getByText(/NEW CAR/i);
  fireEvent.click(button);
  const element = getByText(/Add Car/i)
  expect(element).toBeInTheDocument();
});
