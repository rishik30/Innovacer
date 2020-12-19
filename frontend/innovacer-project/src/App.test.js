import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  render(<App />);
  const headerElement = screen.getByText(/innovacer/i);
  expect(headerElement).toBeInTheDocument();
});
