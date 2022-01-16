import { render, screen } from '@testing-library/react';
import MockTheme from "./tests/MockTheme"
import App from './App';

test('renders slash', () => {
  render(<MockTheme><App /></MockTheme>);
  const linkElement = screen.getAllByText(/Slash/i);
  expect(linkElement[0]).toBeInTheDocument();
});
