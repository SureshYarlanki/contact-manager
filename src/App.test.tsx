import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Welcome to My Contact App/i);
  expect(headingElement).toBeInTheDocument();
});
