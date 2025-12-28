import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the header and product catalog', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    );
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Simple Product Shop')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Smart Watch')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button', { name: /add .* to cart/i });
    expect(buttons).toHaveLength(6);
  });
});