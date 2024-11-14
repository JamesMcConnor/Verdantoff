import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Live Video Streaming with Chat header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Live Video Streaming with Chat/i);
  expect(headerElement).toBeInTheDocument();
});
