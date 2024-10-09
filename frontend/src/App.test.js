import { render, screen } from '@testing-library/react';
import App from './App';
import sum from './Sum';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('test sum function',()=>{
   expect(sum(10,20)).toBe(30);
  
});
