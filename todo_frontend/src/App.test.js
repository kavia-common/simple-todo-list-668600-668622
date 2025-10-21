import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Add Task button', () => {
  render(<App />);
  const addBtn = screen.getByRole('button', { name: /add task/i });
  expect(addBtn).toBeInTheDocument();
});
